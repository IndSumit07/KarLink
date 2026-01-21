import React from "react";
import { Link } from "react-router-dom";
import { Globe, ShieldCheck, Zap, FileText, Users, BarChart, Hammer, Mail, Phone, MapPin } from "lucide-react";

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
        <div className="relative mt-12 md:mt-16 w-full max-w-6xl mx-auto h-[280px] md:h-[500px] flex justify-center">
          {/* Desktop Frame */}
          <div className="rounded-xl md:rounded-2xl bg-gray-100 p-1.5 md:p-2.5 border border-gray-200 shadow-xl relative z-10 w-[80%] md:w-[90%] max-w-[800px] h-[200px] md:h-full md:max-h-[450px] overflow-hidden">
            <div className="relative w-full h-full bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
              <img
                src="/desktop-preview.png"
                alt="Desktop Preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Mobile Frame */}
          <div className="absolute top-10 -right-2 md:top-20 md:right-20 z-20 rounded-2xl md:rounded-3xl bg-gray-100 p-1 md:p-1.5 border border-gray-200 shadow-2xl w-[90px] h-[180px] md:w-[220px] md:h-[420px]">
            <div className="w-full h-full bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden relative">
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
      <div id="features" className="bg-gray-50 py-24 px-6 md:px-12 border-t border-gray-100">
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

      {/* Services Section */}
      <div id="services" className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Services</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Comprehensive solutions tailored to streamline your business operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart RFQ System</h3>
                <p className="text-gray-600 text-sm">Create detailed Requests for Quotations and get precise bids from verified suppliers.</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vendor Connect</h3>
                <p className="text-gray-600 text-sm">Directly connect with top-rated manufacturers and skilled labor in your industry.</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                  <BarChart size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Market Analytics</h3>
                <p className="text-gray-600 text-sm">Gain insights into market trends and pricing to make informed business decisions.</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                  <Hammer size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Production Tracking</h3>
                <p className="text-gray-600 text-sm">Monitor order progress in real-time from production to delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-orange-50 py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Let's Build Something Great Together</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Have questions or need assistance? Our dedicated support team is here to help you navigate KarLink and maximize your business potential.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-semibold text-lg text-gray-900">support@karlink.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="font-semibold text-lg">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Visit Us</p>
                    <p className="font-semibold text-lg">123 Business Hub, Tech City</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 transition-all placeholder:text-gray-400" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 transition-all placeholder:text-gray-400" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 transition-all placeholder:text-gray-400" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 transition-all placeholder:text-gray-400 resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button type="button" className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition duration-300 shadow-lg shadow-orange-200 transform hover:-translate-y-1">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

