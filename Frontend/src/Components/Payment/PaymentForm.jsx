// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const PaymentForm = () => {
//   const [amount, setAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("credit_card"); 
//   const [status, setStatus] = useState("");
//   const [userData, setUserData] = useState(null);

//   const userId = useSelector((state) => state.user.userId);

//   useEffect(() => {
//     if (userId) {
//       axios
//         .get(`http://localhost:7000/api/user/details/${userId}`)
//         .then((response) => {
//           setUserData(response.data);
//         })
//         .catch((error) => console.error("Error fetching user data:", error));
//     }
//   }, [userId]);

//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);

//     if (parts.length === 2) return parts.pop().split(";").shift();
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const paymentData = {
//       amount,
//       paymentMethod,
//     };

//     try {
//       const token = getCookie("token");
//       const response = await axios.post(
//         "http://localhost:7000/api/payment/pay",
//         { ...paymentData, userId },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setStatus("Payment Created Successfully");
//     } catch (error) {
//       setStatus("Error Creating Payment");
//     }
//   };

//   const handlePaypalSuccess = (details) => {
//     const paymentDetails = {
//       amount,
//       paymentMethod: "paypal",
//       status: "completed",
//     };
//     sendPaymentData(paymentDetails);
//     setStatus("PayPal Payment Successful!");
//   };

//   const handlePaypalError = (error) => {
//     console.error("PayPal Payment Error:", error);
//     setStatus("PayPal Payment Failed!");
//   };

//   const sendPaymentData = async (paymentDetails) => {
//     try {
//       const token = getCookie("token");
//       await axios.post(
//         "http://localhost:7000/api/payment/pay",
//         paymentDetails,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error sending payment data:", error);
//       setStatus("Failed to send payment data.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       {userData && (
//         <div className="mb-4 text-center">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Welcome, {userData.fullName}
//           </h2>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
//             Amount
//           </label>
//           <input
//             type="number"
//             id="amount"
//             className="w-full p-2 border rounded"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>

//         {/* خيارات الدفع ثابتة (paypal أو credit_card) */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//           {/* هنا نعرض فقط PayPal وCredit Card في حالة معينة */}
//           <div>
//             <button
//               type="button"
//               className={`p-2 ${paymentMethod === 'paypal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//               onClick={() => setPaymentMethod('paypal')}
//             >
//               PayPal
//             </button>
//             <button
//               type="button"
//               className={`p-2 ${paymentMethod === 'credit_card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//               onClick={() => setPaymentMethod('credit_card')}
//             >
//               Credit Card
//             </button>
//           </div>
//         </div>

//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//           Submit Payment
//         </button>
//       </form>

//       {paymentMethod === "paypal" && (
//         <div className="mt-4">
//           <PayPalScriptProvider
//             options={{
//               "client-id": "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1", // استخدم معرف العميل الفعلي هنا
//               currency: "USD",
//             }}
//           >
//             <PayPalButtons
//               createOrder={(data, actions) => {
//                 return actions.order.create({
//                   purchase_units: [
//                     {
//                       amount: {
//                         value: amount,
//                       },
//                     },
//                   ],
//                 });
//               }}
//               onApprove={(data, actions) => actions.order.capture().then(handlePaypalSuccess)}
//               onError={handlePaypalError}
//             />
//           </PayPalScriptProvider>
//         </div>
//       )}

//       {status && <p className="mt-4 text-center text-sm text-gray-600">{status}</p>}
//     </div>
//   );
// };


// export default PaymentForm;

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentForm = () => {
  const [amount, setAmount] = useState();
  const [status, setStatus] = useState("");
  const [userData, setUserData] = useState(null);

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

  const   handlePaypalSuccess = (details) => {
    const paymentDetails = {
      amount,
      paymentMethod: "paypal",
      status: "completed",
      userId,
    };
    sendPaymentData(paymentDetails);
    setStatus("PayPal Payment Successful!");
    console.log("sscusssssssssssssss");
  };

  const handlePaypalError = (error) => {
    console.error("PayPal Payment Error:", error);
    setStatus("PayPal Payment Failed!");
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
      );  console.log("sscusssssssssssssss");
    } catch (error) {
      console.error("Error sending payment data:", error);
      setStatus("Failed to send payment data.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {userData && (
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, {userData.fullName}
          </h2>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <PayPalScriptProvider
            options={{
              "client-id": "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1", // استبدله بعميلك الفعلي
              currency: "USD",
            }}
          >
            <PayPalButtons
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

        {status && (
          <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
