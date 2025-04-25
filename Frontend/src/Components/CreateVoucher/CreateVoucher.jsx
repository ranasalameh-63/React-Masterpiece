import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateVoucher = () => {
  const [amount, setAmount] = useState('');  
  const [details, setDetails] = useState('');  
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [bookingData, setBookingData] = useState('');
  const [message, setMessage] = useState('');  
  const [voucherNumber, setVoucherNumber] = useState('');  
  const [showPopup, setShowPopup] = useState(false);
  const { bookId } = useParams(); 
  
  console.log("bookId from params:", bookId);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        if (bookId) {  
          const bookingResponse = await axios.get(`http://localhost:7000/api/booking/get/${bookId}`);
          setBookingData(bookingResponse.data);  
          console.log("Booking data:", bookingResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [bookId]); 

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleCreateInvoice = async () => {
    try {
      const token = getCookie("token");
      
      const response = await axios.post(`http://localhost:7000/api/voucher/create/${bookId}`, {
        amount,
        details,
        userId: bookingData.userId,
        expertId: bookingData.expertId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setVoucherNumber(response.data.voucherNumber);  
      console.log("hellooo", response.data.voucherNumber);
      setMessage('Voucher created successfully');
      setShowPopup(true);
    } catch (error) {
      console.error('Error creating voucher:', error);
      setMessage('An error occurred while creating the voucher');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto mt-16 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Voucher</h2>

        {loading ? (
          <div className="text-center py-4">Loading booking data...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : (
          <>
            <div className="mb-5">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount to be paid:</label>
              <input 
                type="number" 
                id="amount" 
                name="amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300 focus:border-orange-300 outline-none transition" 
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Voucher Details:</label>
              <textarea
                id="details"
                name="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300 focus:border-orange-300 outline-none transition h-32"
                placeholder="Enter details about the Voucher"
                required
              />
            </div>

            <div className="flex justify-center mt-6">
              <button 
                onClick={handleCreateInvoice} 
                className="px-6 py-3 text-white rounded-md font-medium transition-colors shadow-sm"
                style={{ backgroundColor: '#FFA725' }}
              >
                Create Voucher
              </button>
            </div>

            {message && !showPopup && (
              <div className="mt-4 text-center text-green-600">{message}</div>
            )}
          </>
        )}

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Voucher Created!</h3>
                <p className="text-gray-600 mb-4">{message}</p>
                <button
                  onClick={closePopup}
                  className="px-6 py-2 font-medium text-white rounded-md transition-colors"
                  style={{ backgroundColor: '#FFA725' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateVoucher;

