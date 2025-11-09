import { useState, useEffect } from 'react';
import LoadingSpinner from '../../../Components/loadingSpinner';
import BatchAnalysisForm from './BatchAnalysisForm';
import LocationAnalysisForm from './LocationAnalysisForm';
import useAIAnalysisService from '../../../services/aiAnalysisService';

/**
 * Main AI Analysis dashboard page that shows analysis options and results
 */
const AIAnalysis = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [analysisHistory, setAnalysisHistory] = useState([]);
    const [analysisStats, setAnalysisStats] = useState(null);
    const aiAnalysisService = useAIAnalysisService();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch dashboard data when the component loads
    useEffect(() => {
        if (activeTab === 'dashboard') {
            setLoading(true);
            // For now, we'll just simulate loading
            setTimeout(() => setLoading(false), 500);
        } else if (activeTab === 'history') {
            setLoading(true);
            aiAnalysisService.getAnalysisHistory({ page: currentPage, limit: 10 })
                .then(data => {
                    setAnalysisHistory(data.data);
                    setTotalPages(data.meta.totalPages);
                    setCurrentPage(data.meta.currentPage);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching analysis history:', error);
                    setLoading(false);
                });
        } else if (activeTab === 'statistics') {
            setLoading(true);
            aiAnalysisService.getAnalysisStats()
                .then(data => {
                    setAnalysisStats(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching analysis statistics:', error);
                    setLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, currentPage]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 lg:ml-64">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
                        <h1 className="text-3xl font-bold text-white">
                            🤖 AI Complaint Analysis
                        </h1>
                        <p className="text-indigo-100 mt-2">
                            Get intelligent insights from citizen complaints using advanced AI algorithms
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200 bg-gray-50">
                        <nav className="flex -mb-px overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'dashboard'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600 bg-white'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                📊 Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab('batch')}
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'batch'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600 bg-white'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                📋 Batch Analysis
                            </button>
                            <button
                                onClick={() => setActiveTab('location')}
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'location'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600 bg-white'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                📍 Location Analysis
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'history'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600 bg-white'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                📈 Analysis History
                            </button>
                            <button
                                onClick={() => setActiveTab('statistics')}
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'statistics'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600 bg-white'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                📊 Statistics
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'dashboard' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis Dashboard</h2>
                                <p className="text-gray-600 mb-6">
                                    Welcome to the AI Complaint Analysis dashboard. This tool provides intelligent analysis of citizen
                                    complaints to help you understand patterns, identify urgent issues, and make data-driven decisions.
                                </p>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-md p-4 text-white">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-indigo-400 bg-opacity-30">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold">Recent Analyses</h3>
                                                <p className="text-2xl font-bold">24</p>
                                                <p className="text-xs">Last 7 days</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-4 text-white">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-green-400 bg-opacity-30">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold">Top Location</h3>
                                                <p className="text-2xl font-bold">Mirpur</p>
                                                <p className="text-xs">23 analyses</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-4 text-white">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-purple-400 bg-opacity-30">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold">Top Issue</h3>
                                                <p className="text-2xl font-bold">Roads</p>
                                                <p className="text-xs">85% of analyses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Tools</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div
                                        onClick={() => setActiveTab('batch')}
                                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="p-2 rounded-md bg-indigo-100 text-indigo-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 ml-3">Batch Analysis</h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            Analyze a specific set of complaints by their IDs. Get insights about common issues,
                                            priority distribution, and department workload.
                                        </p>
                                        <span className="inline-flex items-center text-indigo-600 font-medium">
                                            Get started
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </div>

                                    <div
                                        onClick={() => setActiveTab('location')}
                                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="p-2 rounded-md bg-green-100 text-green-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 ml-3">Location Analysis</h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            Analyze all complaints from a specific geographic location. Understand area-specific
                                            issues and patterns.
                                        </p>
                                        <span className="inline-flex items-center text-green-600 font-medium">
                                            Get started
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analysis Results</h3>
                                {loading ? (
                                    <div className="flex justify-center py-10">
                                        <LoadingSpinner />
                                    </div>
                                ) : (
                                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h4 className="text-md font-medium text-gray-900">Location Analysis: Mirpur, Dhaka</h4>
                                                <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                15 Complaints
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">Top issues identified:</p>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Road Infrastructure (42%)</span>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Water Supply (28%)</span>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Electricity (15%)</span>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab('history')}
                                            className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
                                        >
                                            View full history →
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'batch' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Batch Complaint Analysis</h2>
                                <p className="text-gray-600 mb-6">
                                    Select specific complaint IDs to analyze patterns and generate insights.
                                </p>
                                <BatchAnalysisForm />
                            </div>
                        )}

                        {activeTab === 'location' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location-Based Analysis</h2>
                                <p className="text-gray-600 mb-6">
                                    Analyze all complaints from a specific geographic area to identify local issues.
                                </p>
                                <LocationAnalysisForm />
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis History</h2>
                                <p className="text-gray-600 mb-6">
                                    View your previous analysis requests and results.
                                </p>

                                {loading ? (
                                    <div className="flex justify-center py-10">
                                        <LoadingSpinner />
                                    </div>
                                ) : (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Type
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Location
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Complaints
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {analysisHistory.map((item) => (
                                                        <tr key={item.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(item.date).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.type === 'batch' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                                    }`}>
                                                                    {item.type === 'batch' ? 'Batch' : 'Location'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {item.location}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {item.complaintCount}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button className="text-indigo-600 hover:text-indigo-900">
                                                                    View
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Previous
                                                </button>
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentPage(i + 1)}
                                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === i + 1
                                                            ? 'bg-indigo-50 text-indigo-600'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {activeTab === 'statistics' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Statistics</h2>
                                <p className="text-gray-600 mb-6">
                                    Overview of AI analysis patterns and insights across all complaints.
                                </p>

                                {loading ? (
                                    <div className="flex justify-center py-10">
                                        <LoadingSpinner />
                                    </div>
                                ) : analysisStats ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            {/* Statistics Cards */}
                                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">Total Analyses</h3>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                        Last 30 Days
                                                    </span>
                                                </div>
                                                <p className="text-3xl font-bold text-gray-900">{analysisStats.totalAnalyses}</p>
                                                <p className="text-sm text-gray-500 mt-1">+{analysisStats.growth.total}% from last month</p>
                                            </div>

                                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">Batch Analysis</h3>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Last 30 Days
                                                    </span>
                                                </div>
                                                <p className="text-3xl font-bold text-gray-900">{analysisStats.batchAnalyses}</p>
                                                <p className="text-sm text-gray-500 mt-1">+{analysisStats.growth.batch}% from last month</p>
                                            </div>

                                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">Location Analysis</h3>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        Last 30 Days
                                                    </span>
                                                </div>
                                                <p className="text-3xl font-bold text-gray-900">{analysisStats.locationAnalyses}</p>
                                                <p className="text-sm text-gray-500 mt-1">+{analysisStats.growth.location}% from last month</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Top Locations */}
                                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Analyzed Locations</h3>
                                                <ul className="space-y-3">
                                                    {analysisStats.topLocations.map((location, index) => (
                                                        <li key={index} className="flex items-center justify-between">
                                                            <span className="text-gray-700">{location.name}</span>
                                                            <span className="text-gray-500">{location.count} analyses</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Common Complaints */}
                                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                                <h3 className="text-lg font-medium text-gray-900 mb-4">Common Complaint Categories</h3>
                                                <ul className="space-y-3">
                                                    {analysisStats.topIssues.map((issue, index) => (
                                                        <li key={index} className="flex items-center justify-between">
                                                            <span className="text-gray-700">{issue.name}</span>
                                                            <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                                                                <div
                                                                    className="bg-indigo-600 h-2.5 rounded-full"
                                                                    style={{ width: `${issue.percentage}%` }}
                                                                ></div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">No statistics data available.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAnalysis;