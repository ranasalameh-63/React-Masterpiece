import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState({});
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [filter, setFilter] = useState("all"); 

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/admin/messages");
        setMessages(response.data);
        
        // Initialize replies object
        const initialReplies = {};
        response.data.forEach(msg => {
          initialReplies[msg._id] = "";
        });
        setReplies(initialReplies);
        
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contact messages");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleReplyChange = (messageId, value) => {
    setReplies(prev => ({
      ...prev,
      [messageId]: value
    }));
  };

  const handleReply = async (messageId) => {
    try {
      await axios.post("http://localhost:7000/api/admin/reply", { 
        messageId, 
        reply: replies[messageId] 
      });
      
      setMessages(prev => 
        prev.map(msg => 
          msg._id === messageId ? { ...msg, replied: true } : msg
        )
      );
      
      setReplies(prev => ({
        ...prev,
        [messageId]: ""
      }));
      
      alert("Reply sent successfully");
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply. Please try again.");
    }
  };

  const toggleExpand = (messageId) => {
    if (expandedMessage === messageId) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(messageId);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === "all") return true;
    if (filter === "read") return msg.replied;
    if (filter === "unread") return !msg.replied;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFA725]"></div>
        <span className="ml-3 text-[#FFA725] font-medium">Loading contact messages...</span>
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
        <p className="text-gray-600 mt-1">Unable to load contact form submissions</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b-2 border-[#FFA725]">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
          <p className="text-sm text-[#FFA725] mt-1">Customer inquiries from the contact form</p>
        </div>
        
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#FFF5E6] text-[#FFA725]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg">No contact messages yet</p>
          <p className="text-sm text-[#FFA725] mt-2">Messages will appear here when customers reach out</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <p className="text-lg">No {filter} messages found</p>
          <button 
            onClick={() => setFilter("all")} 
            className="mt-2 px-4 py-2 bg-[#FFA725] text-white rounded-md"
          >
            Show all messages
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 gap-4">
            {filteredMessages.map((msg) => (
              <div 
                key={msg._id} 
                className={`border rounded-lg overflow-hidden ${msg.replied ? "border-gray-200" : "border-[#FFA725]"}`}
              >
                <div 
                  className={`p-4 flex justify-between items-center cursor-pointer ${
                    msg.replied ? "bg-gray-50" : "bg-[#FFF5E6]"
                  }`}
                  onClick={() => toggleExpand(msg._id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-800">{msg.name}</h3>
                      {!msg.replied && (
                        <span className="ml-2 px-2 py-1 bg-[#FFA725] text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{msg.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {msg.replied && (
                      <span className="mr-3 text-green-500 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Replied
                      </span>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedMessage === msg._id ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {expandedMessage === msg._id && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                      <p className="text-gray-800 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Reply:</h4>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
                        rows="4"
                        placeholder="Type your response here..."
                        value={replies[msg._id]}
                        onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                      ></textarea>
                      <div className="mt-2 flex justify-end">
                        <button
                          className={`px-4 py-2 rounded-lg ${
                            replies[msg._id].trim() 
                              ? "bg-[#FFA725] text-white hover:bg-[#FF9500]" 
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={() => handleReply(msg._id)}
                          disabled={!replies[msg._id].trim()}
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-[#FFF5E6] rounded-lg border border-[#FFA725] border-opacity-20">
            <h3 className="text-[#FFA725] font-medium mb-2">Contact Management</h3>
            <p className="text-sm text-gray-700">
              This dashboard displays all customer inquiries submitted through your website's contact form. Reply to messages directly from this interface to provide timely customer support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;

  