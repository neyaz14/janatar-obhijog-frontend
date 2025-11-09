import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast, Toaster } from "sonner";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/authProvider";

export default function ForgetPassword() {
    const { forgetPassword } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const result = await forgetPassword(data.email);
            console.log(result);
            toast.success("Password reset link sent to your email!");
            setEmailSent(true);
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Failed to send reset email. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#EDFAF9] p-4">
            <Toaster richColors />

            {/* Logo + Title */}
            <div className="mr-5 p-5 flex flex-col items-center justify-center gap-3">
                <p>
                    <img
                        src="../../../public/logoTransparent.png"
                        alt="জনতার অভিযোগ"
                        className="w-40"
                    />
                </p>
                <h1 className="text-black font-semibold text-4xl">জনতার অভিযোগ</h1>
                <p className="text-gray-800">Digital Complaint Box</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                {!emailSent ? (
                    <>
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                            Forget Password
                        </h2>
                        <p className="text-center text-gray-500 mb-6">
                            Enter your email address and we'll send you a link to reset your password
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email.message}
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
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Email Sent!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                    </div>
                )}

                <div className="mt-6 text-center text-sm">
                    <Link
                        to="/signin"
                        className="font-medium text-green-500 hover:text-green-700"
                    >
                        ← Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}