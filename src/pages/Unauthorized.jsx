import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/authProvider";

export default function Unauthorized() {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#EDFAF9] p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>

                <p className="text-gray-600 mb-6">
                    You don't have permission to access this page.
                    {user && ` Your current role is: ${user.role}`}
                </p>

                <div className="space-y-3">
                    <Link
                        to="/"
                        className="block w-full bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Go to Home
                    </Link>

                    {user ? (
                        <Link
                            to="/dashboard"
                            className="block w-full bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/signin"
                            className="block w-full bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}