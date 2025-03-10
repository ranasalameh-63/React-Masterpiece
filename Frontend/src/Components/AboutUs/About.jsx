import React from "react";
import { Link } from "react-router-dom";
import Section1 from '../Assets/about.jpeg'
const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 bg-[#FFA725] text-white overflow-hidden h-100">
        <div className="absolute inset-0 opacity-30">
          <img
            src={Section1}
            alt="DIY Home Repairs"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About Us
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-100">
            Empowering homeowners with DIY repair skills and knowledge.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://i.pinimg.com/736x/48/d4/1b/48d41bcafb44f76f238ae851b0566b1a.jpg"
                alt="Our Mission"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#FFA725] mb-4">
                Our Mission
              </h2>
              <div className="w-20 h-1 bg-[#FFA725] mb-6"></div>
              <p className="text-lg text-gray-800 leading-relaxed">
                We aim to make home repairs easy and accessible for everyone.
                Through step-by-step tutorials and expert guidance, we help you
                tackle home improvement projects confidently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#FFA725] text-center mb-12">
            Who We Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto ">
            {[
              {
                title: "Beginners",
                image:
                  "https://i.pinimg.com/736x/8f/f5/cf/8ff5cf80cd0c9630f8497de5b2ec8b94.jpg",
                description:
                  "Simple, beginner-friendly repair guides and videos.",
              },
              {
                title: "DIY Enthusiasts",
                image:
                  "https://i.pinimg.com/736x/f1/7c/19/f17c1917bf7d02475eace10117d189f0.jpg",
                description:
                  "Advanced projects and innovative ideas for your home.",
              },
              {
                title: "Budget-Conscious Homeowners",
                image:
                  "https://i.pinimg.com/736x/29/c2/d0/29c2d0fa788b2b65a63ef28d85129dcd.jpg",
                description:
                  "Low-cost home fixes and sustainable repair solutions.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:translate-y-1 hover:shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover "
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#FFA725] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-800">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-[#FFA725] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
            <p className="text-xl leading-relaxed">
              Our vision is to empower every homeowner with the skills to
              maintain, repair, and improve their homes affordably and
              confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#FFA725] text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Empowerment",
                image:
                  "https://i.pinimg.com/736x/a9/83/d0/a983d004ede4e0bf23e26537766a2b28.jpg",
                description: "We believe in helping everyone master DIY repairs.",
              },
              {
                title: "Innovation",
                image:
                  "https://i.pinimg.com/736x/e1/1c/1f/e11c1f6933bc412c111dd7889be9b1d5.jpg",
                description:
                  "We provide modern and creative solutions for home fixes.",
              },
              {
                title: "Sustainability",
                image:
                  "https://i.pinimg.com/736x/3b/2b/0a/3b2b0aa732d79aa51ce611ecce429083.jpg",
                description:
                  "We promote eco-friendly, cost-effective repair methods.",
              },
              {
                title: "Community",
                image:
                  "https://i.pinimg.com/736x/76/be/81/76be8146588e460dd1672dac60da228b.jpg",
                description:
                  "We create a supportive space for DIYers to learn and grow.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-[#FFA725] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-800">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
