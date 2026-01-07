import { Eye, EyeOff, Package, Users, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) throw error;
      toast.success("Signed in successfully!");
      navigate("/");
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
    <div className="w-full h-[100dvh] flex">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 relative">
        <div className="max-w-[480px] w-full mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Sign in</h1>
          <p className="text-gray-500 mb-10">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email address
              </label>
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
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-semibold">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
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
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Sign in"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-900 font-semibold">
                Or continue with
              </span>
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
            Sign in with Google
          </button>

          <p className="mt-10 text-center text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            By signing in or creating an account, you are agreeing to our{" "}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms & Conditions
            </Link>{" "}
            and our{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Right Section - Image/Color Information */}
      <div className="hidden md:flex flex-col justify-center w-1/2 h-full bg-orange-600 text-white p-12 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        {/* Abstract Lines Top Right */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none text-white" viewBox="0 0 200 200" fill="none">
          <path d="M0 20 C 50 20, 50 100, 100 100" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M20 0 C 20 50, 100 50, 100 100" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="150" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Content Container */}
        <div className="relative z-10 max-w-lg mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Welcome to KarLink
          </h2>

          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-6 group">
              <div className="flex-shrink-0 bg-white rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 duration-300">
                <Package className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold mb-2">Mass Order Requests</h3>
                <p className="text-orange-100 text-sm leading-relaxed opacity-90">
                  Post bulk requirements effortlessly and connect with verified providers instantly.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-6 group">
              <div className="flex-shrink-0 bg-white rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 duration-300">
                <Users className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold mb-2">Verified Providers</h3>
                <p className="text-orange-100 text-sm leading-relaxed opacity-90">
                  Connect with top-rated suppliers vetted for quality and reliability.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-6 group">
              <div className="flex-shrink-0 bg-white rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 duration-300">
                <ShieldCheck className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                <p className="text-orange-100 text-sm leading-relaxed opacity-90">
                  Ensure safe and transparent dealings with our secure platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
