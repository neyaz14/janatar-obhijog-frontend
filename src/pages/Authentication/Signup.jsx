import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import Divisions from "../../../public/locals/division.json";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../Provider/authProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";

export default function SignUp() {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { signUp, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const divisions = Divisions;
  console.log(divisions);

  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("Form data:", data);
    console.log("Additional state - district:", district, "upazila:", upazila);

    // Validate required state fields
    if (!district) {
      toast.error("Please select a district");
      setIsSubmitting(false);
      return;
    }

    if (!upazila) {
      toast.error("Please select a thana/upazila");
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the signup data with all required fields
      const signupData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        division: data.division,
        district: district, // from state
        thana: upazila, // from state (backend expects 'thana')
        postCode: data.postCode,
        password: data.password,

      };

      console.log("Sending signup data:", signupData);
      const res = await signUp(signupData);
      console.log("Signup response:", res);

      // Check if user was automatically logged in based on the response structure
      if (res && res.success && res.data && res.data.user && res.data.accessToken) {
        console.log("User automatically logged in:", res.data.user);
        toast.success(`Welcome ${res.data.user.firstName}! Account created and logged in successfully!`);
      } else if (res && res.success) {
        toast.success("Account created successfully! Please sign in.");
      } else {
        toast.success("Account created successfully!");
      }

      // Redirect to dashboard if logged in, otherwise to home
      setTimeout(() => {
        if (res && res.data && res.data.accessToken) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);

    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Failed to create account. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to home");
      navigate("/");
    }
  }, [user, navigate]);

  // working with api
  // fetch districts when division changes
  useEffect(() => {
    if (division) {
      axios.get(`https://bdapis.com/api/v1.2/division/${division}`)
        .then((res) => {
          console.log(res.data);
          setDistricts(res.data?.data || []);
          setDistrict(""); // reset district
          setUpazilas([]); // reset upazilas
          setUpazila(""); // reset upazila
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          toast.error("Failed to load districts");
        });
    }
  }, [division, axiosPublic]);

  // set upazilas when district changes
  useEffect(() => {
    if (district) {
      const districtData = districts.find((d) => d.district === district);
      if (districtData) {
        setUpazilas([districtData.district, ...districtData.upazilla]);
        setUpazila(""); // reset upazila when district changes
      }
    }
  }, [district, districts]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EDFAF9] p-4">
      <Toaster richColors />
      {/* Logo + Title */}
      <div className="mr-5 p-5 flex flex-col items-center justify-center gap-3">
        <p>
          <img
            src="../../../public/logoTransparent.png"
            alt="জনতার অভিযোগ"
            className="w-36"
          />
        </p>
        <h1 className="text-black font-semibold text-4xl">জনতার অভিযোগ</h1>
        <p className="text-gray-800">Digital Complaint Box</p>
      </div>

      {/* Sign Up Card */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join the digital complaint system to make your voice heard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First / Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white text-black"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                {...register("lastName", { required: "Last Name is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+8801XXXXXXXXX"
                {...register("phone", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^\+8801[0-9]{9}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Repeat your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

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

          {/* District / Division */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* division */}
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
                  <option key={div.coordinates} value={div.division}>
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
            {/* district */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!districts.length}
                className={`mt-1 text-black  block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${!district && districts.length > 0 ? 'border-red-300' : 'border-gray-300'
                  }`}
              >
                <option value="">Select District</option>
                {districts.map((dist) => (
                  <option key={dist.district} value={dist.district}>
                    {dist.district}
                  </option>
                ))}
              </select>
              {!district && districts.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  District is required
                </p>
              )}
            </div>
          </div>

          {/* Thana / PostCode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-950">
                Thana/Upazila <span className="text-red-500">*</span>
              </label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!upazilas.length}
                className={`mt-1 text-black  block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${!upazila && upazilas.length > 0 ? 'border-red-300' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upa) => (
                  <option key={upa} value={upa}>
                    {upa}
                  </option>
                ))}
              </select>
              {!upazila && upazilas.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  Thana/Upazila is required
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
                className="mt-1 text-black  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {errors.postCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.postCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-black  py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link
              to={"/signin"}
              className="font-medium text-green-500 hover:text-green-700"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}