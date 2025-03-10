import React from 'react'

function Testimoneal() {
  return (
    <>
    {/* Testimonials section */}
    <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-[#FFA725]">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-6">

          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
            <img
              src="https://i.pinimg.com/736x/a5/2c/44/a52c4459940205d17c98ab5c254689f5.jpg"
              alt="Client 1"
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-800 italic">
              "Thanks to this platform, I fixed a leaking faucet by myself! The step-by-step guide was super easy to follow."
            </p>
            <h4 className="text-lg font-semibold text-[#FFA725] mt-4">- Sarah Thompson</h4>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
            <img
              src="https://i.pinimg.com/736x/49/d3/7d/49d37d93363946e152bd1106d6d2a6ad.jpg"
              alt="Client 2"
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-800 italic">
              "I saved so much money by using the DIY tutorials here instead of hiring a professional. Highly recommended!"
            </p>
            <h4 className="text-lg font-semibold text-[#FFA725] mt-4">- David Williams</h4>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
            <img
              src="https://i.pinimg.com/736x/de/9d/e8/de9de8c86152a343ed98c6c25d45225d.jpg"
              alt="Client 3"
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-800 italic">
              "I had no idea how to repair drywall, but with the guides on this site, I did it like a pro! Great experience!"
            </p>
            <h4 className="text-lg font-semibold text-[#FFA725] mt-4">- Emily Rodriguez</h4>
          </div>

        </div>
      </section>
    </>
  )
}

export default Testimoneal
