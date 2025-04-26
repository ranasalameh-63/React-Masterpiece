import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const PaymentForm = () => {
  const [status, setStatus] = useState("");
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const voucherId = searchParams.get('voucherId'); 

  const [amount, setAmount] = useState(location.state?.amount || "");

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:7000/api/user/details/${userId}`)
        .then((response) => {
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

  const handlePaypalSuccess = async (details) => {
    const paymentDetails = {
      amount,
      paymentMethod: "paypal",
      status: "completed",
      userId,
      bookingId,
      voucherId,
    };
    await sendPaymentData(paymentDetails);
    setStatus("Payment Successful!");
    console.log("Payment successfully recorded.");
  };

  const handlePaypalError = (error) => {
    console.error("PayPal Payment Error:", error);
    setStatus("Payment Failed. Please try again.");
  };

  const sendPaymentData = async (paymentDetails) => {
    try {
      const token = getCookie("token");
      await axios.post(
        "http://localhost:7000/api/payment/paypaypal",
        paymentDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment sent successfully to backend.");
    } catch (error) {
      console.error("Error sending payment data:", error);
      setStatus("Failed to process payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#FFA725" }}>Complete Your Payment</h1>
          {userData && (
            <p className="text-gray-600 mt-2">
              Hello, {userData.fullName}
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Amount to Pay:</span>
            <span className="text-xl font-bold" style={{ color: "#FFA725" }}>{amount}JD</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-center text-sm text-gray-500 mb-4">
            Choose your payment method below
          </p>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <PayPalScriptProvider
              options={{
                "client-id": "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1",
                currency: "USD",
                "enable-funding": "card",
              }}
            >
              <PayPalButtons
                style={{
                  color: "gold",
                  shape: "rect",
                  label: "pay",
                  height: 40
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) =>
                  actions.order.capture().then(handlePaypalSuccess)
                }
                onError={handlePaypalError}
              />
            </PayPalScriptProvider>
          </div>
        </div>
        
        {status && (
          <div 
            className={`mt-4 p-3 rounded-md text-center ${
              status.includes("Successful") 
                ? "bg-green-50 text-green-700" 
                : "bg-red-50 text-red-700"
            }`}
          >
            {status}
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Secure payment processed by PayPal. Your data is protected.
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex items-center">
        <div className="h-2 w-2 rounded-full bg-gray-300 mx-1"></div>
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FFA725" }}></div>
        <div className="h-2 w-2 rounded-full bg-gray-300 mx-1"></div>
      </div>
    </div>
  );
};

export default PaymentForm;
