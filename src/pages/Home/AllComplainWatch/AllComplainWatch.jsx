"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Eye, TrendingUp, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import axios from "axios";

const AllComplainWatch = () => {
  const [latestComplaints, setLatestComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestComplaints = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://janatar-obhijog-backend.vercel.app/api/v1/complaints/public",
          {
            params: {
              page: 1,
              limit: 3, // Fetch only the latest 3 complaints
              sort: "newest",
            },
          }
        );
        setLatestComplaints(response.data.data);
      } catch (error) {
        console.error("Failed to fetch latest complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "under review":
        return "bg-orange-100 text-orange-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <section className="theme-bg-secondary py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-black theme-text-primary mb-4 leading-tight">
            Latest Public Complaints
          </h2>
          <p className="text-xl theme-text-secondary leading-relaxed max-w-3xl mx-auto mb-8">
            Stay updated with the latest public complaints and track their
            progress in real-time.
          </p>
        </motion.div>

        {/* Latest Complaints */}
        <div className="grid gap-6">
          {latestComplaints.map((complaint, index) => (
            <motion.div
              key={complaint._id}
              className="theme-card rounded-xl p-6 border-l-4 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold theme-text-secondary opacity-70">
                      {complaint._id.slice(-8).toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold theme-text-primary mb-2">
                    {complaint.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm theme-text-secondary">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {complaint.address}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Section */}
              {complaint.media && complaint.media.type === "image" && (
                <div className="mt-4">
                  <img
                    src={complaint.media.url}
                    alt="Complaint Media"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="theme-card rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <Eye className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold theme-text-primary mb-4">
              View All Public Complaints
            </h3>
            <p className="theme-text-secondary mb-6 max-w-2xl mx-auto">
              Access the complete database of public complaints, search by
              location or department, and track the progress of issues being
              resolved across all government departments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/all-complain">
                <motion.button
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-5 h-5" />
                  View All Complaints
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                className="flex items-center gap-3 px-8 py-4 border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TrendingUp className="w-5 h-5" />
                View Analytics
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AllComplainWatch;