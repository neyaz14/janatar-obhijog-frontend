import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/authProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
                    <p className="text-gray-600">Please sign in to access your dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">
                            Welcome to your Dashboard
                        </h1>
                        <p className="text-green-100">
                            Manage your complaints and track their status
                        </p>
                    </div>

                    {/* User Info */}
                    <div className="px-6 py-4 border-b">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                                <img
                                    src={
                                        user.profileImg ||
                                        `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=059669&color=fff`
                                    }
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500">
                                    {user.designation && `${user.designation} • `}
                                    {user.department && `${user.department} • `}
                                    {user.division}, {user.district}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Stats Cards */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium text-blue-900">Total Complaints</h3>
                                <p className="text-3xl font-bold text-blue-600">0</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium text-yellow-900">Pending</h3>
                                <p className="text-3xl font-bold text-yellow-600">0</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium text-green-900">Resolved</h3>
                                <p className="text-3xl font-bold text-green-600">0</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                                    <h4 className="font-medium text-gray-900">File New Complaint</h4>
                                    <p className="text-sm text-gray-600">Submit a new complaint to the authorities</p>
                                </button>
                                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                                    <h4 className="font-medium text-gray-900">View My Complaints</h4>
                                    <p className="text-sm text-gray-600">Track the status of your submitted complaints</p>
                                </button>
                                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                                    <h4 className="font-medium text-gray-900">Update Profile</h4>
                                    <p className="text-sm text-gray-600">Edit your personal information</p>
                                </button>
                                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                                    <h4 className="font-medium text-gray-900">Help & Support</h4>
                                    <p className="text-sm text-gray-600">Get help with using the platform</p>
                                </button>

                                {/* Admin and Super Admin Only Actions */}
                                {(user.role === 'admin' || user.role === 'superAdmin') && (
                                    <Link
                                        to="/ai-analysis"
                                        className="p-4 border border-indigo-300 rounded-lg hover:bg-indigo-50 text-left bg-indigo-50"
                                    >
                                        <h4 className="font-medium text-indigo-900">AI Complaint Analysis</h4>
                                        <p className="text-sm text-indigo-800">
                                            Get intelligent insights from citizen complaints using AI tools
                                        </p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
