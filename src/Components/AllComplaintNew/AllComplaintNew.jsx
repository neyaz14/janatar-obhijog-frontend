import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // adjust path if needed

const AllComplaintNew = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      const fetchComplaints = async () => {
        try {
          const res = await axiosSecure.get(`/complaints`);
          console.log(res.data.data);
          setComplaints(res.data.data);
        } catch (error) {
          console.error("Error fetching complaints:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchComplaints();
    }
  }, [user, axiosSecure]);
  console.log(complaints);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading complaints...</p>
      </div>
    );
  }

  if (!complaints.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No complaints found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Complaints
      </h2>
      <div className="flex flex-col gap-4">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-gray-200 border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-md transition duration-200"
          >
            {/* Title & Status */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {complaint.title}
              </h3>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  complaint.status === "resolved"
                    ? "bg-green-100 text-green-700"
                    : complaint.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {complaint.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3">
              {complaint.description}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {complaint.category}
              </p>
              <p>
                <span className="font-medium">Priority:</span>{" "}
                <span
                  className={`${
                    complaint.priority === "high"
                      ? "text-red-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {complaint.priority}  
                </span>
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {`${complaint.address}, ${complaint.thana}, ${complaint.district}, ${complaint.division}`}
              </p>
              <p>
                <span className="font-medium">Post Code:</span>{" "}
                {complaint.postCode}
              </p>
              <p>
                <span className="font-medium">Department:</span>{" "}
                {complaint.department}
              </p>
              <p>
                <span className="font-medium">Visibility:</span>{" "}
                {complaint.visibility}
              </p>
            </div>

            {/* Citizen Info */}
            {complaint.citizen && (
              <div className="mt-4 text-xs text-gray-500">
                Submitted by:{" "}
                <span className="font-medium">
                  {complaint.citizen.firstName} {complaint.citizen.lastName}
                </span>{" "}
                ({complaint.citizen.email})
              </div>
            )}

           
              <div className="mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                    <img
                      key={complaint.media}
                      src={complaint.media}
                      // alt={`complaint-media-${idx}`}
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                 
                </div>
              </div>
            

            {/* Date */}
            {complaint.createdAt && (
              <p className="text-xs text-gray-400 mt-2">
                Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComplaintNew;
