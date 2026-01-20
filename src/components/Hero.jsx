import React from "react";
import { Link } from "react-router-dom";
import { Globe, ShieldCheck, Zap } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="pt-20 py-10 px-4 md:px-10 flex flex-col w-full h-auto items-center">
        <div className="flex flex-col gap-4 justify-center items-center mt-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900">Post, Trade And Grow</h1>
          <p className="text-2xl md:text-3xl font-bold text-gray-600 max-w-2xl mt-2">
            Kar<span className="text-orange-600">Link</span> helps you to connect
            with others and grow your business!
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/signup" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition duration-300 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
              Get Started
            </Link>
            <button className="bg-white text-orange-600 border-2 border-orange-100 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 hover:border-orange-200 transition duration-300 text-gray-700">
              Learn More
            </button>
          </div>
        </div>

        {/* Visuals Section */}
        <div className="relative mt-16 w-full max-w-6xl mx-auto h-[400px] md:h-[500px] flex justify-center">
          {/* Desktop Frame */}
          <div
            className="rounded-2xl bg-white p-2 border border-gray-200 shadow-2xl relative z-10"
            style={{
              width: "90%",
              maxWidth: "800px",
              height: "100%",
              maxHeight: "450px",
            }}
          >
            <div className="relative w-full h-full bg-gray-50 rounded-xl overflow-hidden">
              <img
                src="/desktop-preview.png"
                alt="Desktop Preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Mobile Frame - Positioned absolutely to overlap */}
          <div
            className="hidden md:block absolute top-20 right-4 lg:right-20 z-20 rounded-3xl bg-white p-2 border border-gray-200 shadow-2xl"
            style={{
              width: "220px",
              height: "420px",
            }}
          >
            <div className="w-full h-full bg-gray-50 rounded-2xl overflow-hidden relative">
              <img
                src="/mobile-preview.png"
                alt="Mobile Preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Section: Why Choose Us */}
      <div className="bg-gray-50 py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Why Choose KarLink?</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">The most trusted platform connecting manufacturers, wholesalers, and skilled labor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Network</h3>
              <p className="text-gray-600 leading-relaxed">Connect with thousands of verified businesses and karigars across the country instantly.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Transactions</h3>
              <p className="text-gray-600 leading-relaxed">Your data and payments are protected with enterprise-grade security protocols.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast RFQ Processing</h3>
              <p className="text-gray-600 leading-relaxed">Post requirements and receive competitive bids within minutes, not days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
