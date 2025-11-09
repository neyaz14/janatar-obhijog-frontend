// src/components/SignIn.jsx
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { toast, Toaster } from "sonner";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/authProvider";

export default function SignIn() {
  const { signIn, user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = await signIn(data.email, data.password);
      console.log(result);

      // Check if login was successful and user data exists
      if (result && ((result.data && result.data.user) || result.user)) {
        const userData = result.data?.user || result.user;
        toast.success(`Welcome back, ${userData.firstName}!`);

        // Redirect to intended page after successful login
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        toast.success("Signed in successfully!");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      }

    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Failed to sign in. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-[#EDFAF9] p-4">
      <Toaster richColors />
      <div className="mr-5 p-5 flex flex-col items-center justify-center gap-3">
        <p>
          <img
            src="../../../public/logoTransparent.png"
            alt="জনতার অভিযোগ"
            className="w-40"
          />{" "}
        </p>
        <h1 className="text-black font-semibold text-4xl">জনতার অভিযোগ</h1>
        <p className="text-gray-800">Digital Complaint Box</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 text-black  block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium !text-gray-800">
                Password
              </label>
              <Link to="/forget-password" className="text-sm text-green-500 hover:text-green-700">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-black">
          <p>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-blue-500 hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}