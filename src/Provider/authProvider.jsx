import { createContext, useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Initialize authentication state from stored token
  useEffect(() => {
    // Function to validate and refresh token if needed
    const validateToken = async (token) => {
      try {
        const response = await axiosPublic.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        // Try to refresh token if available
        if (error.response?.status === 401) {
          try {
            const refreshResponse = await axiosPublic.post("/auth/refresh", {
              token: token
            });

            if (refreshResponse.data && refreshResponse.data.data?.accessToken) {
              const newToken = refreshResponse.data.data.accessToken;
              localStorage.setItem("token", newToken);

              // Validate with new token
              const validationResponse = await axiosPublic.get("/users/me", {
                headers: { Authorization: `Bearer ${newToken}` },
              });
              return validationResponse.data;
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            localStorage.removeItem("token");
          }
        }
        throw error;
      }
    };

    const initializeAuth = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await validateToken(token);

        if (userData && userData.data) {
          setUser(userData.data);
          console.log("User authenticated from token:", userData.data);
        } else if (userData && userData.user) {
          setUser(userData.user);
          console.log("User authenticated from token (legacy format):", userData.user);
        } else {
          // Invalid response format
          console.error("Invalid user data format:", userData);
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication initialization failed:", error.response?.data || error.message);

        // If token is invalid or expired and couldn't be refreshed, remove it
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [axiosPublic]);

  const signUp = async (signupData) => {
    setLoading(true);
    try {
      console.log("AuthProvider - sending signup data:", signupData);
      const response = await axiosPublic.post(`/users/signup`, signupData);

      // Handle the response structure
      let token = null;
      let userData = null;

      if (response.data && response.data.success && response.data.data) {
        token = response.data.data.accessToken;
        userData = response.data.data.user;
      }

      if (token && userData) {
        localStorage.setItem("token", token);
        setUser(userData);
        console.log("User automatically logged in after signup:", userData);
        console.log("Access token stored:", token);
      }

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("AuthProvider - signup error:", error.response?.data || error.message);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post(`/auth/login`, {
        email,
        password,
      });

      // Handle login response structure
      let token = null;
      let userData = null;

      if (res.data && res.data.success && res.data.data) {
        token = res.data.data.accessToken;
        userData = res.data.data.user;
      } else if (res.data && res.data.token && res.data.user) {
        // Fallback for different response structure
        token = res.data.token;
        userData = res.data.user;
      }

      if (token && userData) {
        localStorage.setItem("token", token);
        setUser(userData);
        console.log("User logged in successfully:", userData);
      } else {
        throw new Error("Invalid login response format");
      }

      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      console.error("AuthProvider - signin error:", error.response?.data || error.message);
      throw error;
    }
  };

  const forgetPassword = async (email) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post(`/auth/forget-password`, { email });
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      console.error("AuthProvider - forget password error:", error.response?.data || error.message);
      throw error;
    }
  };

  const resetPassword = async (token, newPassword, email) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post(`/auth/reset-password`, {
        token,
        newPassword,
        email
      });
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      console.error("AuthProvider - reset password error:", error.response?.data || error.message);
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosPublic.post(
        `/auth/change-password`,
        {
          oldPassword: currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      console.error("AuthProvider - change password error:", error.response?.data || error.message);
      throw error;
    }
  };

  const signOut = () => {
    // Clear all auth-related storage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Reset user state
    setUser(null);

    console.log("User signed out successfully");
  };

  return (
    <AuthContext.Provider value={{
      user,
      signUp,
      signIn,
      signOut,
      forgetPassword,
      resetPassword,
      changePassword,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
