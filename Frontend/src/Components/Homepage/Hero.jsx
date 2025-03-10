import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../Assets/hero.jpeg'

function Hero() {
    return (
        <>
            <div className='w-full h-1'></div>
            <div className="relative w-full h-155 flex items-center text-white">

                {/* Background Video */}
                <img
                    src={HeroSection}
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />


                {/* Overlay with Gradient */}
                [           [   <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, transparent 100%)'
                    }}
                ></div>]]

                {/* Content - Aligned to the Left */}
                <div className="relative z-10 max-w-4xl mr-auto px-10 lg:px-20 text-left">
                    <h1 className="text-3xl md:text-4xl max-w-[500px] mb-[40px] font-bold">
                        Fix your home with confidence!
                    </h1>
                    <p className="mt-4 text-md max-w-[500px] text-white">
                        Need a home repair? Explore our DIY guides, expert advice, and trusted professionals ready to help.
                    </p>

                    {/* CTA Button */}
                    <button className="overflow-hidden mt-[30px] relative w-52 p-2 h-10 bg-[#FFA725] text-white border-none rounded-md text-md font-bold cursor-pointer relative z-10 group">
                        <Link to="/find-expert">
                            Find an Expert
                            <span className="absolute w-36 h-32 -top-8 -right-2 bg-white rotate-8 transform scale-x-0 group-hover:scale-x-200 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                            <span className="absolute w-36 h-32 -top-8 -right-2 bg-[#FFA725] rotate-8 transform scale-x-0 group-hover:scale-x-200 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                            <span className="absolute w-36 h-32 -top-8 -right-2 bg-[#D67C00] rotate-8 transform scale-x-0 group-hover:scale-x-200 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 right-18 z-10">
                                Now!
                            </span>
                        </Link>
                    </button>
                </div>

            </div>
            <div className='w-full h-2 bg-[#FFA725]'></div>
        </>
    );
}

export default Hero;
