import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md transition-all duration-300">
            <div className="relative flex flex-col items-center justify-center">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>

                {/* Spinner Container */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Spinning Gradient Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-600 border-r-orange-400 animate-spin" style={{ animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-1 rounded-full border-2 border-transparent border-l-orange-300 border-b-orange-200 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

                    {/* Logo (No Background) */}
                    <img
                        src="/logo.png"
                        alt="Loading..."
                        className="w-14 h-14 object-contain relative z-10 drop-shadow-lg"
                    />
                </div>

                {/* Text is optional, but adds to the 'beautiful' factor if subtle */}
                <span className="mt-4 text-orange-600 font-medium text-sm tracking-[0.2em] animate-pulse">
                    LOADING
                </span>
            </div>
        </div>
    );
};

export default Loader;
