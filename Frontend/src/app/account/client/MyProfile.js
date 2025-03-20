import React, { useState } from 'react';

const MyProfile = () => {
  const [user, setUser] = useState({
    firstName: 'Thilina',
    lastName: 'Thilina',
    email: 'Thilina@gmail.com',
    phone: '07*******',
    bio: 'Student',
    profileImage: '/profile-placeholder.jpg',
    address: {
      country: 'Sri Lanka',
      city: 'Colombo',
      district: 'Western',
      postalCode: '10000'
    }
  });

  // State to track which sections are being edited
  const [editMode, setEditMode] = useState({
    profile: false,
    personal: false,
    address: false
  });

  // Form state for editing
  const [formData, setFormData] = useState({...user});

  // Toggle edit mode for a section
  const toggleEditMode = (section) => {
    // Reset form data to current user data when entering edit mode
    if (!editMode[section]) {
      setFormData({...user});
    }
    
    setEditMode({
      ...editMode,
      [section]: !editMode[section]
    });
  };

  // Handle input changes
  const handleInputChange = (e, section, nestedField = null) => {
    const { name, value } = e.target;
    
    if (nestedField) {
      setFormData({
        ...formData,
        [nestedField]: {
          ...formData[nestedField],
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Save changes
  const saveChanges = (section) => {
    setUser({...formData});
    toggleEditMode(section);
  };

  // Cancel editing
  const cancelEdit = (section) => {
    toggleEditMode(section);
  };

  return (
    <div className="bg-cyan-100 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-blue-500">My Profile</h2>
      
      {/* Profile Overview Section */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        {!editMode.profile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" 
                />
              </div>
              <div>
                <p className="text-gray-600">Name: {user.firstName} {user.lastName}</p>
                <p className="text-gray-600">Bio: {user.bio}</p>
              </div>
            </div>
            <button 
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => toggleEditMode('profile')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span className="ml-1">Edit</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange(e)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-1">Profile Image URL</label>
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={(e) => handleInputChange(e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                className="bg-gray-300 px-3 py-1 rounded text-gray-700"
                onClick={() => cancelEdit('profile')}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 px-3 py-1 rounded text-white"
                onClick={() => saveChanges('profile')}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Personal Information Section */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Personnel information</h3>
          {!editMode.personal && (
            <button 
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => toggleEditMode('personal')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span className="ml-1">Edit</span>
            </button>
          )}
        </div>
        
        {!editMode.personal ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">First Name</p>
              <p className="font-medium">{user.firstName}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Last Name</p>
              <p className="font-medium">{user.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">E-mail</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tel No.</p>
              <p className="font-medium">{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Bio</p>
              <p className="font-medium">{user.bio}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-500 text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">Tel No.</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">Bio</label>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                className="bg-gray-300 px-3 py-1 rounded text-gray-700"
                onClick={() => cancelEdit('personal')}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 px-3 py-1 rounded text-white"
                onClick={() => saveChanges('personal')}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Address Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Address</h3>
          {!editMode.address && (
            <button 
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => toggleEditMode('address')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span className="ml-1">Edit</span>
            </button>
          )}
        </div>
        
        {!editMode.address ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Country</p>
              <p className="font-medium">{user.address.country}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">District</p>
              <p className="font-medium">{user.address.district}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">City</p>
              <p className="font-medium">{user.address.city}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Postal Code</p>
              <p className="font-medium">{user.address.postalCode}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-500 text-sm mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.address.country}
                  onChange={(e) => handleInputChange(e, null, 'address')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.address.district}
                  onChange={(e) => handleInputChange(e, null, 'address')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange(e, null, 'address')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.address.postalCode}
                  onChange={(e) => handleInputChange(e, null, 'address')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                className="bg-gray-300 px-3 py-1 rounded text-gray-700"
                onClick={() => cancelEdit('address')}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 px-3 py-1 rounded text-white"
                onClick={() => saveChanges('address')}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;