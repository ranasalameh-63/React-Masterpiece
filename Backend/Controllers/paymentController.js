const paypal = require('@paypal/checkout-server-sdk');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const Payment = require('../Models/paymentModel'); 

// إعداد PayPal
const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment('YOUR_PAYPAL_CLIENT_ID', 'YOUR_PAYPAL_CLIENT_SECRET')
 
);

// دالة الدفع باستخدام PayPal
const createPaymentWithPaypal = async (amount, userId) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount.toString(),
      },
    }],
  });

  try {
    const order = await paypalClient.execute(request);
    const payment = new Payment({
      userId,
      amount,
      paymentMethod: 'paypal',
      status: 'pending',
    });
    await payment.save();

    // Return approval URL to redirect user for payment approval
    return order.result.links.find(link => link.rel === 'approve').href;
  } catch (error) {
    console.error('PayPal payment failed:', error);
    return null;
  }
};

// دالة الدفع باستخدام Visa (Stripe)
const createPaymentWithCard = async (amount, userId, token) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // تحويل المبلغ إلى سنتات
      currency: 'usd',
      payment_method: token,
      confirm: true,
    });

    const payment = new Payment({
      userId,
      amount,
      paymentMethod: 'credit_card',
      status: paymentIntent.status === 'succeeded' ? 'completed' : 'failed',
    });

    await payment.save();
    return paymentIntent.status;
  } catch (error) {
    console.error('Stripe payment failed:', error);
    return 'failed';
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { userId, amount, paymentMethod, token } = req.body;
    let paymentStatus = 'failed';
    
    if (paymentMethod === 'paypal') {
      const approvalUrl = await createPaymentWithPaypal(amount, userId);
      if (approvalUrl) {
        paymentStatus = 'pending';
        return res.status(200).json({ message: 'Payment initiated', approvalUrl });
      }
    } else if (paymentMethod === 'credit_card') {
      paymentStatus = await createPaymentWithCard(amount, userId, token);
      if (paymentStatus === 'succeeded') {
        return res.status(200).json({ message: 'Payment successful' });
      }
    }
    
    res.status(400).json({ message: 'Payment failed' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
