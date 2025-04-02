export const BASE_URL = "http://localhost:8081/";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "An error occurred");
    } catch (e) {
      throw new Error(errorText || "An error occurred");
    }
  }

  try {
    return await response.json();
  } catch (e) {
    return { success: true };
  }
};

// Helper function to handle network errors
const handleNetworkError = (error) => {
  if (!window.navigator.onLine) {
    throw new Error("No internet connection. Please check your network.");
  }
  if (error.message === "Failed to fetch") {
    throw new Error(
      "Unable to connect to the server. Please ensure the backend is running."
    );
  }
  throw error;
};

// Registration endpoints
export const registerservice = async (formData) => {
  const endpoint = "auth/service-provider/register";

  // Add logging to debug the request
  console.log("Registration request:", {
    url: `${BASE_URL}${endpoint}`,
    data: formData,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      credentials: "include",
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
        termsAccepted: formData.termsAccepted,
      }),
    });

    return handleResponse(response);
  } catch (error) {
    return handleNetworkError(error);
  }
};

export const registercustomer = async (formData) => {
  const endpoint = "auth/consumer/register";

  // Add logging to debug the request
  console.log("Registration request:", {
    url: `${BASE_URL}${endpoint}`,
    data: formData,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      credentials: "include",
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
        role: "CONSUMER",
        termsAccepted: formData.termsAccepted,
      }),
    });

    return handleResponse(response);
  } catch (error) {
    return handleNetworkError(error);
  }
};

// Login endpoints
export const loginUser = async (formData) => {
  const endpoint = "auth/login";

  // Add logging to debug the request
  console.log("Login request:", {
    url: `${BASE_URL}${endpoint}`,
    data: formData,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    // Check for authentication failure specifically
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Incorrect credentials. Please check your email and password."
      );
    }

    return handleResponse(response);
  } catch (error) {
    return handleNetworkError(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    // Replace with your actual Google OAuth endpoint
    const response = await fetch(`${BASE_URL}/auth/google`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Google login failed');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginWithGithub = async () => {
  try {
    // Replace with your actual GitHub OAuth endpoint
    const response = await fetch(`${BASE_URL}/auth/github`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('GitHub login failed');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginWithFacebook = async () => {
  try {
    // Replace with your actual Facebook OAuth endpoint
    const response = await fetch(`${BASE_URL}/auth/facebook`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Facebook login failed');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Helper function to get user role
export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Test connection to backend
export const testConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}actuator/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Backend connection test failed:", error);
    return false;
  }
};

// Fetch service providers for consumer booking
export const fetchServiceProviders = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    // Updated endpoint to match backend convention
    const response = await fetch(`${BASE_URL}api/service-providers/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        // If no providers found, return empty array instead of error
        return [];
      }
      throw new Error(`Failed to fetch service providers (${response.status})`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching service providers:", error);
    throw error;
  }
};

// Fetch specific service provider details
export const fetchServiceProviderDetails = async (providerId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(
      `${BASE_URL}api/service-providers/${providerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        // Return empty object with default structure if provider not found
        return {
          name: "-",
          username: "-",
          specialty: "-",
          qualification: "-",
          contactNumber: "-",
          workplace: "-",
          workHours: { start: "09:00", end: "17:00" },
          address: {
            clinic: "-",
            district: "-",
            county: "-",
          },
        };
      }
      throw new Error(
        `Failed to fetch service provider details (${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching service provider details:", error);
    throw error;
  }
};

// Create a booking appointment
export const createBooking = async (bookingData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${BASE_URL}api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Update service provider profile
export const updateServiceProviderProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${BASE_URL}api/service-providers/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update profile: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating service provider profile:", error);
    throw error;
  }
};

// Fetch user profile data
export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${BASE_URL}api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
