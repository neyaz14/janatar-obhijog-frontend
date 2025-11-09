import { useState, useEffect } from 'react';
import useAIAnalysisService from '../../../services/aiAnalysisService';
import AnalysisDashboard from './AnalysisDashboard';
import LoadingSpinner from '../../../Components/loadingSpinner';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

/**
 * Form component for analyzing a specific batch of complaints by ID
 */
const BatchAnalysisForm = () => {
    const [complaintIds, setComplaintIds] = useState('');
    const [availableComplaints, setAvailableComplaints] = useState([]);
    const [location, setLocation] = useState({
        thana: '',
        district: '',
        division: ''
    });
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysisData, setAnalysisData] = useState(null);
    const [loadingComplaints, setLoadingComplaints] = useState(false);

    const aiService = useAIAnalysisService();
    const axiosSecure = useAxiosSecure();

    // Fetch available complaints for selection
    useEffect(() => {
        const fetchComplaints = async () => {
            setLoadingComplaints(true);
            try {
                // Fetch recent complaints to populate dropdown
                const response = await axiosSecure.get('/complaints?limit=20&status=pending');
                if (response.data && response.data.data) {
                    setAvailableComplaints(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching complaints:', error);
            } finally {
                setLoadingComplaints(false);
            }
        };

        fetchComplaints();
    }, [axiosSecure]);

    // Load all divisions from bdapis.com
    useEffect(() => {
        const loadDivisions = async () => {
            try {
                const response = await axios.get('https://bdapis.com/api/v1.2/divisions');
                if (response.data && response.data.data) {
                    // Format divisions for dropdown
                    const formattedDivisions = response.data.data.map(div => ({
                        id: div._id,
                        name: div.division
                    }));
                    setDivisions(formattedDivisions);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error('Error loading divisions from API:', err);
                // Fallback to hardcoded list if API fails
                setDivisions([
                    { id: 1, name: 'Dhaka' },
                    { id: 2, name: 'Chattogram' },
                    { id: 3, name: 'Rajshahi' },
                    { id: 4, name: 'Khulna' },
                    { id: 5, name: 'Barishal' },
                    { id: 6, name: 'Sylhet' },
                    { id: 7, name: 'Rangpur' },
                    { id: 8, name: 'Mymensingh' }
                ]);
            }
        };

        loadDivisions();
    }, []);

    // Load districts data when division changes
    useEffect(() => {
        const loadDistricts = async () => {
            if (!location.division) {
                setDistricts([]);
                setUpazilas([]);
                return;
            }

            try {
                // Get districts for the selected division from bdapis.com
                const response = await axios.get(`https://bdapis.com/api/v1.2/division/${location.division}`);

                if (response.data && response.data.data) {
                    // Format districts for dropdown
                    setDistricts(response.data.data);
                    // Reset upazila selection
                    setLocation(prev => ({
                        ...prev,
                        district: '',
                        thana: ''
                    }));
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error('Error loading districts from API:', err);
                setDistricts([]);
            }
        };

        loadDistricts();
    }, [location.division]);

    // Load upazilas when district changes
    useEffect(() => {
        if (!location.district) {
            setUpazilas([]);
            return;
        }

        // Find the selected district in the districts array
        const selectedDistrict = districts.find(d => d.district === location.district);
        if (selectedDistrict && selectedDistrict.upazilla) {
            setUpazilas(selectedDistrict.upazilla);
        } else {
            setUpazilas([]);
        }
    }, [location.district, districts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'complaintIds') {
            setComplaintIds(value);
        } else if (name === 'division') {
            setLocation({
                ...location,
                division: value,
                district: '',
                thana: ''
            });
        } else if (name === 'district') {
            setLocation(prev => ({
                ...prev,
                district: value,
                thana: ''
            }));
        } else if (name === 'thana') {
            setLocation(prev => ({
                ...prev,
                thana: value
            }));
        } else {
            setLocation(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleComplaintSelect = (e) => {
        const selectedComplaintIds = Array.from(e.target.selectedOptions, option => option.value)
            .filter(id => id && id !== '#N/A' && !id.startsWith('#N/A')); // Filter out invalid IDs
        setComplaintIds(selectedComplaintIds.join(','));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setAnalysisData(null);

        try {
            // Parse comma-separated complaint IDs
            const ids = complaintIds
                .split(',')
                .map(id => id.trim())
                .filter(id => id && !id.includes('#N/A')); // Filter out invalid IDs

            if (ids.length === 0) {
                throw new Error('Please enter at least one complaint ID');
            }

            // Prepare request data
            const requestData = {
                complaintIds: ids
            };

            // Add location data if provided
            if (location.thana || location.district || location.division) {
                requestData.location = {};
                if (location.thana) {
                    requestData.location.thana = location.thana;
                }
                if (location.district) {
                    requestData.location.district = location.district;
                }
                if (location.division) {
                    requestData.location.division = location.division;
                }
            }

            // Make API call
            const response = await aiService.analyzeComplaintsBatch(requestData);

            if (response.success) {
                setAnalysisData(response.data);

                // Display mock data notice if applicable
                if (response.message && response.message.includes("sample data")) {
                    setError("Note: " + response.message);
                }
            } else {
                // Handle "no complaints found" error specially with more user-friendly message
                if (response.message && response.message.includes("No complaints found")) {
                    setError(response.message);
                } else {
                    throw new Error(response.message || 'Failed to analyze complaints');
                }
            }
        } catch (err) {
            // For user input errors, show directly
            if (err.message && (
                err.message.includes("Please enter") ||
                err.message.includes("No complaints found")
            )) {
                setError(err.message);
            } else {
                // For system/API errors, show a more generic message
                setError('Unable to complete analysis. Please try again or contact support if the problem persists.');
            }
            console.error('Batch analysis error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                    {/* Complaint Selection */}
                    <div>
                        <label htmlFor="availableComplaints" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Complaints
                        </label>
                        <select
                            id="availableComplaints"
                            multiple
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            onChange={handleComplaintSelect}
                            size="5"
                        >
                            {availableComplaints.map(complaint => (
                                complaint._id && !String(complaint._id).startsWith('#N/A') ? (
                                    <option key={complaint._id} value={complaint._id}>
                                        #{complaint._id ? complaint._id.substring(0, 8) : 'N/A'} - {complaint.title || 'Untitled'}
                                    </option>
                                ) : null
                            ))}
                            {availableComplaints.length === 0 && !loadingComplaints && (
                                <option key="no-complaints" disabled>No complaints available</option>
                            )}
                            {loadingComplaints && (
                                <option key="loading" disabled>Loading complaints...</option>
                            )}
                        </select>
                        <p className="mt-1 text-sm text-gray-500">
                            Hold Ctrl/Cmd to select multiple complaints (or enter IDs manually below)
                        </p>
                    </div>

                    {/* Complaint IDs Input */}
                    <div>
                        <label htmlFor="complaintIds" className="block text-sm font-medium text-gray-700 mb-1">
                            Complaint IDs
                        </label>
                        <textarea
                            id="complaintIds"
                            name="complaintIds"
                            rows="3"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="Enter complaint IDs separated by commas"
                            value={complaintIds}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter multiple complaint IDs separated by commas
                        </p>
                    </div>

                    {/* Location Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Division Selector */}
                        <div>
                            <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
                                Division (Optional)
                            </label>
                            <select
                                id="division"
                                name="division"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                value={location.division}
                                onChange={handleInputChange}
                            >
                                <option key="select-division" value="">Select Division</option>
                                {divisions.map(division => (
                                    <option key={division.id} value={division.name}>
                                        {division.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* District Selector */}
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                                District (Optional)
                            </label>
                            <select
                                id="district"
                                name="district"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                value={location.district}
                                onChange={handleInputChange}
                                disabled={!location.division}
                            >
                                <option key="select-district" value="">Select District</option>
                                {districts.map(district => (
                                    <option key={district.district} value={district.district}>
                                        {district.district}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Thana/Upazila Selector */}
                        <div>
                            <label htmlFor="thana" className="block text-sm font-medium text-gray-700 mb-1">
                                Thana/Upazila (Optional)
                            </label>
                            <select
                                id="thana"
                                name="thana"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                value={location.thana}
                                onChange={handleInputChange}
                                disabled={!location.district}
                            >
                                <option key="select-thana" value="">Select Thana/Upazila</option>
                                {upazilas.map((upazila, index) => (
                                    <option key={`upazila-${index}`} value={upazila}>
                                        {upazila}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Analyzing...' : 'Analyze Complaints'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Loading Indicator */}
            {loading && (
                <div className="flex justify-center my-8">
                    <LoadingSpinner />
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className={`${error.includes("Note:") ? "bg-blue-50 border-blue-400" : "bg-red-50 border-red-400"} border-l-4 p-4 mb-8`}>
                    <div className="flex">
                        <div className="flex-shrink-0">
                            {error.includes("Note:") ? (
                                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3">
                            <p className={`text-sm ${error.includes("Note:") ? "text-blue-700" : "text-red-700"}`}>
                                {error}
                            </p>
                            {error.includes("No complaints found") && (
                                <p className="text-sm text-red-500 mt-1">
                                    Try selecting different complaint IDs or a broader location area.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Analysis Results */}
            {analysisData && <AnalysisDashboard analysisData={analysisData} />}
        </div>
    );
};

export default BatchAnalysisForm;