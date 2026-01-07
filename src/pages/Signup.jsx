import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full h-[100dvh] flex flex-row-reverse">
            {/* Right Section - Signup Form */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 relative">
                <div className="max-w-[480px] w-full mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Create an account</h1>
                    <p className="text-gray-500 mb-10">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Log in
                        </Link>
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email address</label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold mb-2 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder-gray-400 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-lg hover:bg-orange-700 active:scale-[0.98] transition-all duration-200 mt-2"
                        >
                            Sign up
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-900 font-semibold">Or register with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-lg hover:bg-gray-50 transition-all active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign up with Google
                    </button>

                    <p className="mt-10 text-center text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                        By creating an account, you are agreeing to our{" "}
                        <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
                        {" "}and our{" "}
                        <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
            </div>

            {/* Left Section - Image/Color Information */}
            <div className="w-1/2 h-full bg-orange-600 hidden md:block">
                {/* Placeholder for left side content */}
            </div>
        </div>
    );
};

export default Signup;
