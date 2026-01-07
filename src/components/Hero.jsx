import React from "react";
import { Eye } from "lucide-react";

const Hero = () => {
  return (
    <div className="pt-20 py-10 px-10 flex flex-col w-full h-auto">
      <div className="flex flex-col gap-4 justify-center items-center mt-10">
        <h1 className="text-7xl font-bold">Post, Trade And Grow</h1>
        <p className="text-3xl text-center font-bold text-gray-600 max-w-2xl">
          Kar<span className="text-orange-600">Link</span> helps you to connect
          with others and grow your business!
        </p>
        <div>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 transition duration-300">
            Get Started
          </button>
          <button className="bg-white text-orange-600 border border-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition duration-300 ml-4">
            Learn More
          </button>
        </div>
      </div>
      <div
        className="px-10 relative"
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          className="rounded-xl bg-[#F3F4F6]"
          style={{
            width: "800px",
            height: "420px",
            border: "2px solid #D1D5DB",
          }}
        ></div>
        <div
          className="rounded-xl bg-[#F3F4F6] absolute top-16 right-32"
          style={{
            width: "250px",
            height: "400px",
            border: "2px solid #D1D5DB",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
