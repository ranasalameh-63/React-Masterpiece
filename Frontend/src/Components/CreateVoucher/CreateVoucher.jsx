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
  const { bookId } = useParams(); 
  


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
  }, [ bookId]); 

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };


  const handleCreateInvoice = async () => {
    try {
        const token = getCookie("token");

      const response = await axios.post('http://localhost:7000/api/voucher/create', {
        amount,
        details,
        userId:bookingData.userId,
        expertId:bookingData.expertId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setVoucherNumber(response.data.voucherNumber);  
      setMessage('Voucher created successfully');
    } catch (error) {
      console.error('Error creating invoice:', error);
      setMessage('An error occurred while creating the voucher');
    }
  };


  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Create Invoice</h2>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount to be paid:</label>
          <input 
            type="number" 
            id="amount" 
            name="amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="w-full p-2 mt-1 border border-gray-300 rounded-md" 
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Invoice Details:</label>
          <textarea
            id="details"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            placeholder="Enter details about the invoice"
            required
          />
        </div>


        <div className="flex justify-center mt-6">
          <button 
            onClick={handleCreateInvoice} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create Invoice
          </button>
        </div>

        {message && (
          <div className="mt-4 text-center text-green-600">{message}</div>
        )}

        {voucherNumber && (
          <div className="mt-4 text-center text-blue-600">
            <p>Invoice Number: {voucherNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateVoucher;

