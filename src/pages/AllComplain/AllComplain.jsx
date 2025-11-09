"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, MapPin, Clock, Eye, ChevronDown, Calendar, Building, User, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"

export const COMPLAINT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
  REJECTED: "rejected",
  CLOSED: "closed",
};

const AllComplain = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 10
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const fetchComplaints = async (pageNumber = 1) => {
    if (pageNumber === 1) setLoading(true)
    else setLoadingMore(true)

    try {
      const response = await axios.get(
        `https://janatar-obhijog-backend.vercel.app/api/v1/complaints/public`,
        {
          params: {
            page: pageNumber,
            limit,
            search: searchTerm || undefined,
            status: statusFilter !== "All" ? statusFilter : undefined,
            department: departmentFilter !== "All" ? departmentFilter : undefined,
            sort: sortBy,
          },
        }
      );

      const data = response.data.data

      if (pageNumber === 1) {
        setComplaints(data)
      } else {
        setComplaints((prev) => [...prev, ...data])
      }

      setHasMore(response.data.meta.hasNextPage)
    } catch (error) {
      console.error("Failed to fetch complaints:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [searchTerm, statusFilter, departmentFilter, sortBy])

  const getStatusColor = (status) => {
    switch (status) {
      case COMPLAINT_STATUS.RESOLVED:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case COMPLAINT_STATUS.IN_PROGRESS:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case COMPLAINT_STATUS.PENDING:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case COMPLAINT_STATUS.REJECTED:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case COMPLAINT_STATUS.CLOSED:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20"
      case "medium":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-950/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const departments = [...new Set(complaints.map((c) => c.department))]
  const statusOptions = [
    { value: COMPLAINT_STATUS.PENDING, label: "Pending" },
    { value: COMPLAINT_STATUS.IN_PROGRESS, label: "In Progress" },
    { value: COMPLAINT_STATUS.RESOLVED, label: "Resolved" },
    { value: COMPLAINT_STATUS.REJECTED, label: "Rejected" },
    { value: COMPLAINT_STATUS.CLOSED, label: "Closed" },
  ]

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchComplaints(nextPage)
  }

  if (loading) {
    return (
      <div className="bg-background min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <button className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border text-foreground hover:bg-accent transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4">All Public Complaints</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Complete transparency in government responsiveness. Browse, search, and track the progress of all public
            complaints submitted to government departments.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-card rounded-2xl p-6 mb-8 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search complaints by title, location, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-border mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="All">All Status</option>
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Department</label>
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="All">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="priority">Priority</option>
                      <option value="upvotes">Most Upvoted</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter("All")
                        setDepartmentFilter("All")
                        setSortBy("newest")
                      }}
                      className="w-full px-4 py-2 border border-border text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold">{complaints.length}</span> complaints
          </p>
        </div>

        {/* Complaints List */}
        <div className="space-y-6">
          {complaints.map((complaint, index) => (
            <motion.div
              key={complaint._id}
              className={`bg-card rounded-2xl p-6 border-l-4 ${getPriorityColor(complaint.priority)} hover:shadow-lg transition-all duration-300 border border-border`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.005 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg text-foreground">
                          {complaint._id.slice(-8).toUpperCase()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}
                        >
                          {complaint.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            complaint.priority === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              : complaint.priority === "medium"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {complaint.priority} Priority
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{complaint.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{complaint.description}</p>
                    </div>
                  </div>

                  {/* Media Section */}
                  {complaint.media && (
                    <div className="mb-4">
                      {complaint.media.type === "image" ? (
                        <img
                          src={complaint.media.url || "/placeholder.svg"}
                          alt="Complaint Media"
                          className="w-full max-w-md h-48 object-cover rounded-lg border border-border"
                        />
                      ) : complaint.media.type === "video" ? (
                        <video controls className="w-full max-w-md h-48 rounded-lg border border-border">
                          <source src={complaint.media.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        <strong>Location:</strong> {complaint.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>
                        <strong>Department:</strong> {complaint.department}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>
                        <strong>Submitted by:</strong>{" "}
                        {complaint.isAnonymous
                          ? "Anonymous"
                          : `${complaint.citizen.firstName} ${complaint.citizen.lastName}`}
                      </span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        <strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        <strong>Last Update:</strong> {new Date(complaint.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col items-center gap-2">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="font-semibold text-muted-foreground">{complaint.votes.length}</span>
                  </motion.button>
                  <span className="text-xs text-muted-foreground lg:text-center">upvotes</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                <Link to={`/complaint/${complaint._id}`}>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </motion.button>
                </Link>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 border border-border text-foreground hover:bg-accent rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {complaints.length === 0 && !loading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-2xl p-12 max-w-md mx-auto border border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No complaints found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMore && complaints.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More Complaints"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AllComplain
