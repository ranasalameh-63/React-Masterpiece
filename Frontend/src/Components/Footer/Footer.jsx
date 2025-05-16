import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <section className="py-10 bg-white border-t border-gray-100 sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            
            {/* Logo & Description */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
              <h3 className="font-bold text-3xl text-[#FFA725] font-serif">BuildNest</h3>
              <p className="text-base leading-relaxed text-gray-700 mt-7">
                Your go-to platform for easy DIY home repairs. Access expert tutorials, get AI-driven repair suggestions, and connect with professionals for complex issues.
              </p>
              
              {/* Social Icons */}
              <ul className="flex items-center space-x-4 mt-9">
                <li>
                  <a href="#" className="flex items-center justify-center text-white transition-all duration-200 bg-[#FFA725] rounded-full w-9 h-9 hover:bg-[#e08f0e] focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA725]">
                    {/* Twitter */}
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center text-white transition-all duration-200 bg-[#FFA725] rounded-full w-9 h-9 hover:bg-[#e08f0e] focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA725]">
                    {/* Facebook */}
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center text-white transition-all duration-200 bg-[#FFA725] rounded-full w-9 h-9 hover:bg-[#e08f0e] focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA725]">
                    {/* Instagram */}
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.5 3A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9A4.5 4.5 0 0 0 21 16.5v-9A4.5 4.5 0 0 0 16.5 3h-9zM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm4.875-.375a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@buildnest.com" className="flex items-center justify-center text-white transition-all duration-200 bg-[#FFA725] rounded-full w-9 h-9 hover:bg-[#e08f0e] focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA725]">
                    {/* Email */}
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.75 4.5A2.25 2.25 0 0 0 1.5 6.75v10.5A2.25 2.25 0 0 0 3.75 19.5h16.5A2.25 2.25 0 0 0 22.5 17.25V6.75A2.25 2.25 0 0 0 20.25 4.5H3.75zm0 1.5h16.5c.414 0 .75.336.75.75v.44l-9 5.625-9-5.625V6.75c0-.414.336-.75.75-.75zm-.75 2.716V17.25c0 .414.336.75.75.75h16.5c.414 0 .75-.336.75-.75V8.716l-8.682 5.421a.75.75 0 0 1-.836 0L3 8.716z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <p className="text-sm font-bold tracking-widest text-[#FFA725] uppercase">Useful Links</p>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <p className="text-sm font-bold tracking-widest text-[#FFA725] uppercase">Help</p>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link to="/support" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    DIY Guides
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-base text-gray-700 transition-all duration-200 hover:text-[#FFA725] hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pro Services Section (Replacing Newsletter) */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
              <p className="text-sm font-bold tracking-widest text-[#FFA725] uppercase">Pro Services</p>
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-semibold text-lg text-gray-900">Need expert help?</h4>
                <p className="mt-3 text-base text-gray-700">
                  Some repairs require professional assistance. Connect with our network of trusted contractors for complex home projects.
                </p>
                <Link to="/hirepro" className="inline-flex items-center justify-center px-6 py-3 mt-4 font-semibold text-white transition-all duration-200 bg-[#FFA725] rounded-md hover:bg-[#e08f0e] focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA725]">
                  Find Pros Near You
                </Link>
              </div>
            </div>
          </div>
          
         
        </div>
      </section>
    </div>
  );
}
