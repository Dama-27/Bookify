import React, { useState } from "react";
import { updateServiceProviderProfile } from "../../../services/api";
import { toast } from "react-toastify";
import { Pencil } from "lucide-react";
import styled from "styled-components";

// Styled components
const ProfileContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 20px;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const ProfileCard = styled.div`
  background: #bce3ec;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileDetails = styled.div`
  flex-grow: 1;
  margin-left: 20px;

  p {
    margin: 5px 0;
    color: #222;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Bold = styled.span`
  font-weight: bold;
  font-size: 17px;
`;

const EditIcon = styled.div`
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;

  &:hover {
    color: #0056b3;
  }
`;

const Section = styled.div`
  background: #bce3ec;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    font-size: 18px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    width: 48%;
    margin-bottom: 10px;
    color: #333;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    div {
      width: 100%;
    }
  }
`;

const Email = styled.a`
  color: #0056b3;
  font-weight: bold;
  text-decoration: none;
`;

const MyProfile = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditedData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditedData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if token exists
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required. Please login again.");
        // Redirect to login page
        window.location.href = "/service-provider/login";
        return;
      }

      const dataToUpdate = {
        username: editedData.username || userData.username || "",
        email: editedData.email || userData.email || "",
        contact: editedData.contact || userData.contact || "",
        address: editedData.address || userData.address || "",
        bio: editedData.bio || userData.bio || "",
        firstName: editedData.firstName || userData.firstName || "",
        lastName: editedData.lastName || userData.lastName || "",
        experience: editedData.experience || userData.experience || 0,
        isActive:
          editedData.isActive !== undefined
            ? editedData.isActive
            : userData.isActive || false,
        profileImage: editedData.profileImage || userData.profileImage || "",
      };

      const response = await updateServiceProviderProfile(dataToUpdate);

      if (!response) {
        throw new Error("No response received from server");
      }

      setUserData((prev) => ({
        ...prev,
        ...response,
      }));

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);

      // Handle different types of errors
      if (
        error.message.includes("Authentication required") ||
        error.message.includes("Invalid token") ||
        error.message.includes("Session expired")
      ) {
        toast.error("Session expired. Please login again.");
        // Clear local storage and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        window.location.href = "/service-provider/login";
      } else if (error.response?.status === 403) {
        toast.error("Access denied. Please login again.");
        window.location.href = "/service-provider/login";
      } else if (error.message.includes("Network Error")) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error(
          error.message || "Failed to update profile. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContainer>
      {/* Profile Card */}
      <ProfileCard>
        <div className="flex items-center w-full">
          <img
            src={userData.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white"
          />
          <ProfileDetails>
            <p>
              <Bold>
                Name: {userData.firstName} {userData.lastName}
              </Bold>
            </p>
            <p>Bio: {userData.bio || "Not specified"}</p>
          </ProfileDetails>
          {!isEditing && (
            <EditIcon onClick={() => setIsEditing(true)}>
              <Pencil size={20} />
            </EditIcon>
          )}
        </div>
      </ProfileCard>

      {/* Personnel Information */}
      <Section>
        <div className="flex justify-between items-center mb-4">
          <h3>Personnel Information</h3>
          {!isEditing && (
            <EditIcon onClick={() => setIsEditing(true)}>
              <Pencil size={20} />
            </EditIcon>
          )}
        </div>

        <Info>
          <div>
            <p className="text-gray-600 mb-1">First Name</p>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editedData.firstName || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              />
            ) : (
              <p>
                <Bold>{userData.firstName || "Not specified"}</Bold>
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-600 mb-1">Last Name</p>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={editedData.lastName || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              />
            ) : (
              <p>
                <Bold>{userData.lastName || "Not specified"}</Bold>
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-600 mb-1">E-mail</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
                disabled
              />
            ) : (
              <p>
                <Email>{userData.email || "Not specified"}</Email>
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-600 mb-1">Tel No:</p>
            {isEditing ? (
              <input
                type="tel"
                name="contact"
                value={editedData.contact || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              />
            ) : (
              <p>
                <Bold>{userData.contact || "Not specified"}</Bold>
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-600 mb-1">Experience (Years)</p>
            {isEditing ? (
              <input
                type="number"
                name="experience"
                value={editedData.experience || 0}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
                min="0"
              />
            ) : (
              <p>
                <Bold>{userData.experience || "0"} years</Bold>
              </p>
            )}
          </div>

          <div className="w-full">
            <p className="text-gray-600 mb-1">Bio</p>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedData.bio || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
                rows="3"
              />
            ) : (
              <p>{userData.bio || "Not specified"}</p>
            )}
          </div>
        </Info>
      </Section>

      {/* Address Information */}
      <Section>
        <div className="flex justify-between items-center mb-4">
          <h3>Address</h3>
          {!isEditing && (
            <EditIcon onClick={() => setIsEditing(true)}>
              <Pencil size={20} />
            </EditIcon>
          )}
        </div>

        <Info>
          <div className="w-full">
            <p className="text-gray-600 mb-1">Address</p>
            {isEditing ? (
              <textarea
                name="address"
                value={editedData.address || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
                rows="2"
              />
            ) : (
              <p>{userData.address || "Not specified"}</p>
            )}
          </div>
        </Info>

        {isEditing && (
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedData({ ...userData });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </Section>
    </ProfileContainer>
  );
};

export default MyProfile;
