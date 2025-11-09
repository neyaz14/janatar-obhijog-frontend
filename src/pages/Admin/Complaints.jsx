import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/authProvider";

const COMPLAINT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
  REJECTED: "rejected",
  CLOSED: "closed",
};

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const {user} = useContext(AuthContext)

  console.log(user);

  useEffect(() => {
    if (user?.email) {
      const fetchComplaints = async () => {
        try {
          const res = await axiosSecure.get(`/complaints/public`);
          console.log(res);
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

  const handleStatusChange = async (id, newStatus) => {
    console.log(id, newStatus);
    try {
      const res = await axiosSecure.put(`/complaints/${id}/resolve`, {
        status: newStatus,
      });

      if (res.data.success) {
        // toast.success("Complaint status updated");

        // Update local state
        setComplaints((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      //   toast.error("Failed to update status");
    }
  };

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
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        All Complaints (Admin)
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

              {/* Status Dropdown (Admin control) */}
              <select
                value={complaint.status}
                onChange={(e) =>
                  handleStatusChange(complaint._id, e.target.value)
                }
                className="border rounded-lg px-2 py-1 text-sm text-black"
              >
                {Object.values(COMPLAINT_STATUS).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
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
              <div className="mt-4 text-xs text-black">
                Submitted by:{" "}
                <span className="font-medium">
                  {complaint.citizen.firstName} {complaint.citizen.lastName}
                </span>{" "}
                ({complaint.citizen.email})
              </div>
            )}

            {/* Media */}
            {complaint.media && (
              <div className="mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <img
                    src={complaint.media}
                    alt="complaint-media"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                </div>
              </div>
            )}

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

export default Complaints;
