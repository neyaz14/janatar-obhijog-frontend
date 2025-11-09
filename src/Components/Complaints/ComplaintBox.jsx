import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Divisions from "../../../public/locals/division.json";
import { AuthContext } from "../../Provider/authProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const baseUrl = "https://janatar-obhijog-backend.vercel.app";

// Priority options
const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

// Visibility options
const visibilityOptions = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

export const complaintCategories = [
  { label: "Infrastructure", value: "infrastructure" },
  { label: "Public Services", value: "public-services" },
  { label: "Health & Safety", value: "health-safety" },
  { label: "Environment", value: "environment" },
  { label: "Transportation", value: "transportation" },
  { label: "Utilities", value: "utilities" },
  { label: "Administrative", value: "administrative" },
  { label: "Legal", value: "legal" },
  { label: "Education", value: "education" },
  { label: "Social Welfare", value: "social-welfare" },
  { label: "Corruption", value: "corruption" },
  { label: "Consumer Protection", value: "consumer-protection" },
  { label: "Housing", value: "housing" },
  { label: "Employment", value: "employment" },
  { label: "Technology", value: "technology" },
  { label: "Other", value: "other" },
];

// Department options
const departmentOptions = [
  { label: "Municipality", value: "municipality" },
  { label: "Health", value: "health" },
  { label: "Education", value: "education" },
  { label: "Water Supply", value: "water-supply" },
  { label: "Electricity", value: "electricity" },
  { label: "Transport", value: "transport" },
  { label: "Road Infrastructure", value: "road-infrastructure" },
  { label: "Drainage", value: "drainage" },
  { label: "Waste Management", value: "waste-management" },
  { label: "Law Enforcement", value: "law-enforcement" },
  { label: "Corruption", value: "corruption" },
  { label: "Land Disputes", value: "land-disputes" },
  { label: "Environmental", value: "environmental" },
  { label: "Social Welfare", value: "social-welfare" },
  { label: "Consumer Rights", value: "consumer-rights" },
  { label: "Security", value: "security" },
  { label: "Traffic", value: "traffic" },
  { label: "Public Order", value: "public-order" },
  { label: "Other", value: "other" },
];

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export default function ComplaintForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // image
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [imgURL, setImgurl] = useState(null);

  //---
  const divisions = Divisions;
  // Fetch districts when division changes
  useEffect(() => {
    if (division) {
      axios
        .get(`https://bdapis.com/api/v1.2/division/${division}`)
        .then((res) => {
          setDistricts(res.data?.data || []);
          setDistrict(""); // reset district
          setUpazilas([]); // reset upazilas
          setUpazila(""); // reset upazila
          //   setValue("district", "");
          //   setValue("upazila", "");
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          toast.error("Failed to load districts");
        });
    } else {
      setDistricts([]);
      setDistrict("");
      setUpazilas([]);
      setUpazila("");
      //   setValue("district", "");
      //   setValue("upazila", "");
    }
  }, [division]);

  // Set upazilas when district changes
  useEffect(() => {
    if (district) {
      const districtData = districts.find((d) => d.district === district);
      if (districtData) {
        setUpazilas([districtData.district, ...districtData.upazilla]);
        setUpazila(""); // reset upazila when district changes
        // setValue("upazila", "");
      }
    } else {
      setUpazilas([]);
      setUpazila("");
      //   setValue("upazila", "");
    }
  }, [district, districts]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response?.data?.secure_url) {
        setImgurl(response.data.secure_url);
        console.log(imgURL);
        // Set the image URL to the form
        // setValue("imageUrl", response.data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  //
  const axiosSecure = useAxiosSecure()
  const onSubmit = async (data) => {
    console.log(user);

    const complaint = {
      title: data.title,
      description: data.description,
      department: data.department,
      division: data.division,
      district: data.district,
      thana: data.upazila,
      postCode: data.postCode,
      address: data.address,
      priority: data.priority,
      visibility: data.visibility,
      media: imgURL,
      citizen: user?._id,
      category: data?.category,
    };

    console.log(complaint);

    try {
      const res = await axiosSecure.post(`/complaints`, complaint);
      toast.success(res.data.message);
      reset();
      console.log(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error submitting complaint");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-8 text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Submit a Complaint
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            placeholder="Enter complaint title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            placeholder="Describe your complaint..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            {...register("department", { required: "Department is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            defaultValue=""
          >
            <option value="" disabled>
              Select department
            </option>
            {Object.values(departmentOptions).map((dept) => (
              <option key={dept.label} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department.message}</p>
          )}
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
          >
            <option value="" disabled>
              Select category
            </option>
            {complaintCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Priority & Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              {...register("priority")}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              defaultValue={priorityOptions}
            >
              {Object.values(priorityOptions).map((priority) => (
                <option key={priority.label} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Visibility
            </label>
            <select
              {...register("visibility")}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              defaultValue={visibilityOptions}
            >
              {Object.values(visibilityOptions).map((vis) => (
                <option key={vis.label} value={vis.value}>
                  {vis.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* address code ------ */}
        <div>
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your full address"
              {...register("address", { required: "Address is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Location inputs: Division, District, Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division
              </label>
              <select
                {...register("division", { required: "Division is required" })}
                onChange={(e) => setDivision(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
              >
                <option value="">Select Division</option>
                {divisions.map((div) => (
                  <option key={div.division} value={div.division}>
                    {div.division}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.division.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District
              </label>
              <select
                {...register("district", { required: "District is required" })}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!districts.length}
                className={`mt-1 text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                  !districts.length ? "bg-gray-100" : ""
                }`}
              >
                <option value="">Select District</option>
                {districts.map((dist) => (
                  <option key={dist.district} value={dist.district}>
                    {dist.district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.district.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thana/Upazila
              </label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!upazilas.length}
                className={`mt-1 text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                  !upazilas.length ? "bg-gray-100" : ""
                }`}
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upa) => (
                  <option key={upa} value={upa}>
                    {upa}
                  </option>
                ))}
              </select>
              {errors.upazila && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.upazila.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Post Code
              </label>
              <input
                type="text"
                placeholder="e.g., 1205"
                {...register("postCode", { required: "Post Code is required" })}
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {errors.postCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.postCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* upload image  */}
        <div>
          <label className="block mb-1">Upload Image:</label>
          <div className="border border-emerald-200 p-8 bg-gray-100 relative">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
            />
            {/* Show delete button only if image is selected */}
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null); // Remove preview
                  //   setValue("imageUrl", ""); // Clear hidden input
                  //   setValue("image", null); // Reset file input
                }}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            )}
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded mt-2"
            />
          )}

          {isUploading && (
            <div className="mt-2">
              Uploading: {uploadProgress}%
              <progress
                value={uploadProgress}
                max="100"
                className="w-full mt-1"
              />
            </div>
          )}

          {/* Hidden input to store Cloudinary URL */}
          <input type="hidden" {...register("media")} />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
