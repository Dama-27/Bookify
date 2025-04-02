import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyProfile from "./MyProfile";
import ServiceDetails from "./ServiceDetails";
import Notifications from "./Notifications";
import BookingService from "./BookingService";
import Security from "./Security";
import ResetPassword from "./ResetPassword";
import DeleteAccount from "./DeleteAccount";
import Navigation from "../../../components/ui/navigation";
import { fetchServiceProviderProfile } from "../../../services/api";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("profile");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    address: "",
    contact: "",
    experience: 0,
    isActive: false,
    personalInfo: {
      firstName: "",
      lastName: "",
      phone: "",
      role: "Service Provider",
    },
    address: {
      country: "",
      city: "",
      district: "",
      postalCode: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    console.log("Checking authentication:", { token, userRole });

    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/service-provider/login");
      return;
    }

    if (userRole !== "service_providers") {
      console.error("User is not a service provider, redirecting to login");
      navigate("/service-provider/login");
      return;
    }

    const loadProfileData = async () => {
      try {
        console.log("Loading profile data...");
        const profileData = await fetchServiceProviderProfile();
        console.log("Received profile data:", profileData);

        if (!profileData) {
          throw new Error("No profile data received");
        }

        setUserData((prevData) => ({
          ...prevData,
          username: profileData.username || "",
          email: profileData.email || "",
          address: profileData.address || "",
          contact: profileData.contact || "",
          experience: profileData.experience || 0,
          isActive: profileData.isActive || false,
          personalInfo: {
            ...prevData.personalInfo,
            phone: profileData.contact || "",
          },
        }));
      } catch (err) {
        console.error("Error loading profile:", err);
        if (
          err.message.includes("Authentication required") ||
          err.message.includes("Session expired")
        ) {
          // Clear localStorage and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("userRole");
          navigate("/service-provider/login");
        } else {
          setError(err.message || "Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [navigate]);

  const renderSidebar = () => {
    return (
      <div className="w-full md:w-48 bg-cyan-100 rounded-lg shadow-sm p-4">
        <SidebarItem
          label="My Profile"
          active={currentPage === "profile"}
          onClick={() => setCurrentPage("profile")}
        />
        <SidebarItem
          label="Service Details"
          active={currentPage === "serviceDetails"}
          onClick={() => setCurrentPage("serviceDetails")}
        />
        <SidebarItem
          label="Notifications"
          active={currentPage === "notifications"}
          onClick={() => setCurrentPage("notifications")}
        />
        <SidebarItem
          label="Booking Service"
          active={currentPage === "bookingService"}
          onClick={() => setCurrentPage("bookingService")}
        />
        <SidebarItem
          label="Security"
          active={currentPage === "security"}
          onClick={() => setCurrentPage("security")}
        />
        <SidebarItem
          label="Reset Password"
          active={currentPage === "resetPassword"}
          onClick={() => setCurrentPage("resetPassword")}
        />

        <div className="mt-8">
          <button
            onClick={() => setCurrentPage("deleteAccount")}
            className="text-red-500 font-medium hover:text-red-600 transition"
          >
            Delete account
          </button>
        </div>
      </div>
    );
  };

  const SidebarItem = ({ label, active, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`py-3 px-4 my-1 cursor-pointer rounded-md transition ${
          active
            ? "bg-blue-100 text-blue-500 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {label}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-4">Loading profile data...</div>;
    }

    if (error) {
      return (
        <div className="text-red-500 text-center py-4">Error: {error}</div>
      );
    }

    switch (currentPage) {
      case "profile":
        return <MyProfile userData={userData} setUserData={setUserData} />;
      case "serviceDetails":
        return <ServiceDetails userData={userData} setUserData={setUserData} />;
      case "notifications":
        return <Notifications />;
      case "bookingService":
        return <BookingService />;
      case "security":
        return <Security />;
      case "resetPassword":
        return <ResetPassword />;
      case "deleteAccount":
        return <DeleteAccount />;
      default:
        return <MyProfile userData={userData} setUserData={setUserData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <Navigation />

        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {renderSidebar()}

          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ label }) => {
  return (
    <a href="#" className="text-blue-500 hover:text-blue-600 transition">
      {label}
    </a>
  );
};

export default AccountSettings;
