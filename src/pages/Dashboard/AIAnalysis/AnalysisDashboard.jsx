import React from 'react';

/**
 * Displays complaint analysis metrics in a dashboard format
 * @param {Object} props
 * @param {Object} props.analysisData - The analysis data from the API
 */
const AnalysisDashboard = ({ analysisData }) => {
    // Early return if no data is available
    if (!analysisData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <p className="text-gray-500 italic text-center">No analysis data available</p>
            </div>
        );
    }

    const {
        totalComplaints,
        location,
        commonIssues,
        priorityDistribution,
        departmentDistribution,
        aiSummary,
        analysisDate,
    } = analysisData;

    return (
        <div className="space-y-6">
            {/* Analysis Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Analysis Results</h3>
                        <p className="text-sm text-gray-500">
                            {location && (
                                <span>
                                    {location.thana && `${location.thana}, `}
                                    {location.district && `${location.district}, `}
                                    {location.division && location.division}
                                </span>
                            )}
                            {" • "}
                            {new Date(analysisDate).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-indigo-100 py-2 px-4 rounded-full">
                        <span className="text-indigo-800 font-medium">{totalComplaints} Complaints Analyzed</span>
                    </div>
                </div>
            </div>

            {/* AI Summary Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Generated Summary</h3>
                <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-gray-800 mb-4">{aiSummary.overview}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Major Concerns */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Major Concerns</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {aiSummary.majorConcerns.map((concern, index) => (
                                <li key={index} className="text-gray-700">{concern}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Recommended Actions */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {aiSummary.recommendedActions.map((action, index) => (
                                <li key={index} className="text-gray-700">{action}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Urgent Issues */}
                    <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Urgent Issues</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {aiSummary.urgentIssues.map((issue, index) => (
                                <li key={index} className="text-gray-700">{issue}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Distribution Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h3>
                    <div className="space-y-3">
                        {commonIssues.map((issue, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700">{issue.category}</span>
                                    <span className="text-gray-500">{issue.count} ({issue.percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${issue.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority Distribution */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Distribution</h3>
                    <div className="space-y-3">
                        {priorityDistribution.map((priority, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700 capitalize">{priority.priority}</span>
                                    <span className="text-gray-500">{priority.count} ({priority.percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                    <div
                                        className={`h-2 rounded-full ${priority.priority === 'high'
                                                ? 'bg-red-500'
                                                : priority.priority === 'medium'
                                                    ? 'bg-yellow-500'
                                                    : 'bg-green-500'
                                            }`}
                                        style={{ width: `${priority.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department Distribution */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Department Workload</h3>
                    <div className="space-y-3">
                        {departmentDistribution.map((dept, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700">{dept.department.replace(/-/g, ' ')}</span>
                                    <span className="text-gray-500">{dept.count} ({dept.percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                    <div
                                        className="bg-purple-500 h-2 rounded-full"
                                        style={{ width: `${dept.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analysis Date and Footer */}
            <div className="text-right text-sm text-gray-500 mt-6">
                Analysis generated on {new Date(analysisDate).toLocaleString()}
            </div>
        </div>
    );
};

export default AnalysisDashboard;