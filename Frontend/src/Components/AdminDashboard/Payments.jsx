import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/admin/payments");
        setPayments(response.data);
        
        // Calculate total revenue
        const total = response.data.reduce((sum, payment) => {
          return payment.status === "completed" ? sum + payment.amount : sum;
        }, 0);
        setTotalRevenue(total);
        
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payments");
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFA725]"></div>
        <span className="ml-3 text-[#FFA725] font-medium">Loading payment data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-red-500 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{error}</h3>
        <p className="text-gray-600 mt-1">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b-2 border-[#FFA725]">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Payment Transactions</h2>
          <p className="text-sm text-[#FFA725] mt-1">All financial transactions processed on the platform</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <div className="bg-[#FFF5E6] text-[#FFA725] px-4 py-2 rounded-lg">
            <span className="font-medium">Total Revenue:</span> {totalRevenue.toFixed(2)}JD
          </div>
          <p className="text-xs text-gray-500 mt-1">{payments.length} transactions</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#FFF5E6] text-[#FFA725]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <p className="text-lg">No payment transactions found</p>
          <p className="text-sm text-[#FFA725] mt-2">Transactions will appear here once payments are processed</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-[#FFF5E6]">
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">User</th>
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">Amount</th>
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">Payment Method</th>
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">Status</th>
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">Voucher Number</th>
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">Voucher Amount</th>
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">Voucher Details</th>
                <th className="py-3 px-4 border-b text-left text-[#FFA725] font-semibold">Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-[#FFF5E6] transition-colors duration-150">
                  <td className="py-3 px-4 border-b">
                    {payment.userId?.fullName || "Unknown User"}
                  </td>
                  <td className="py-3 px-4 border-b font-medium">
                    {payment.amount?.toFixed(2) || "0.00"}JD
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                      {payment.paymentMethod || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        payment.status === "pending"
                          ? "bg-yellow-500"
                          : payment.status === "completed"
                          ? "bg-green-500"
                          : payment.status === "failed"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {payment.status || "unknown"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {payment.voucherId?.voucherNumber || "No voucher"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {payment.voucherId?.amount ? `${payment.voucherId.amount.toFixed(2)}JD` : "-"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {payment.voucherId?.details || "-"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {payment.bookingId?.preferredDate 
                      ? new Date(payment.bookingId.preferredDate).toLocaleDateString() 
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-6 p-4 bg-[#FFF5E6] rounded-lg border border-[#FFA725] border-opacity-20">
            <h3 className="text-[#FFA725] font-medium mb-2">Payment Information</h3>
            <p className="text-sm text-gray-700">
              This dashboard displays all payment transactions processed on the website. Monitor revenue, track payment methods, and verify transaction statuses. Filter and search functionality coming soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentList;