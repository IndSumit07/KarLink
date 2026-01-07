
import { Eye, EyeOff, CheckCircle, Package, Truck, ShieldCheck, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const { signUp, googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await signUp(formData.email, formData.password, formData.fullName);
            if (error) throw error;
            toast.success("Account created! Please check your email for verification.");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await googleSignIn();
            if (error) throw error;
        } catch (error) {
            toast.error(error.message);
        }
    };

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

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                            <input
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold mb-2 block">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
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
                            disabled={loading}
                            className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-lg hover:bg-orange-700 active:scale-[0.98] transition-all duration-200 mt-2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Sign up"}
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
                        onClick={handleGoogleSignIn}
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
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 h-full bg-orange-600 text-white p-12 relative overflow-hidden">
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-96 h-96 border border-white/20 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50"></div>
                <div className="absolute top-10 right-10 w-full h-full opacity-10 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    maskImage: 'linear-gradient(to bottom left, black, transparent 70%)'
                }}></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 border border-white/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>

                {/* Main Text */}
                <div className="relative z-10 text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3 tracking-tight">Join the Network</h2>
                    <p className="text-orange-100/90 text-lg">Your Gateway to Bulk Orders & Top Providers</p>
                </div>

                {/* Profile Card Mockup */}
                <div className="relative z-10 bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm mx-auto text-gray-800 transform rotate-[-2deg] hover:rotate-0 transition-all duration-500">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">KarLink MEMBER</span>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-orange-400 to-orange-600 mb-4 relative group">
                            {/* Placeholder generic user avatar */}
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="User" className="w-full h-full rounded-full bg-white object-cover" />
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                                <CheckCircle className="w-5 h-5 text-blue-500 fill-current" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold flex items-center gap-2">
                            Rahul Sharma
                            <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide">Pro</span>
                        </h3>
                        <p className="text-sm text-gray-500 font-medium mb-6">@rahul_logistics</p>

                        {/* Stats Row */}
                        <div className="flex gap-4 w-full mb-8">
                            <div className="flex-1 bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                                <span className="block text-xs text-gray-500 font-semibold mb-1 uppercase">Active Orders</span>
                                <span className="block text-xl font-bold text-orange-700">12</span>
                            </div>
                            <div className="flex-1 bg-green-50 rounded-xl p-3 text-center border border-green-100">
                                <span className="block text-xs text-gray-500 font-semibold mb-1 uppercase">Volume</span>
                                <span className="block text-xl font-bold text-green-700">50k+</span>
                            </div>
                        </div>

                        {/* Available On */}
                        <div className="w-full mb-6">
                            <p className="text-xs text-gray-400 font-bold mb-3 uppercase text-center">Services Available</p>
                            <div className="flex justify-center gap-4 text-gray-400">
                                <Package className="w-6 h-6 text-gray-600" />
                                <Truck className="w-6 h-6 text-orange-500" />
                                <ShieldCheck className="w-6 h-6 text-green-600" />
                                <BarChart3 className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">#Logistics</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">#Wholesale</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">#FMCG</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
