// /components/PaymentForm.js
import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [status, setStatus] = useState('');
  const [userData, setUserData] = useState(null);

  const userId = useSelector((state) => state.user.userId);
  console.log("user ID:", userId);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:7000/api/user/details/${userId}`)
        .then((response) => {
          console.log("User Data:", response.data);
          setUserData(response.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      amount,
      paymentMethod,
    };

    try {
      const token = getCookie("token");
      const response = await axios.post(
        'http://localhost:7000/api/payment/pay', 
        { ...paymentData, userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus('Payment Created Successfully');
    } catch (error) {
      setStatus('Error Creating Payment');
    }
  }; // ✅ Correctly closed handleSubmit function

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            id="paymentMethod"
            className="w-full p-2 border rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">CliQ</option>
          </select>
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Submit Payment
        </button>
      </form>

      {status && <p className="mt-4 text-center text-sm text-green-600">{status}</p>}
    </div>
  );
};

export default PaymentForm;
