import React, { useState } from 'react';
const MyProfile = ({ userData, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-cyan-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img 
              src={userData.profileImage || '/api/placeholder/80/80'} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover mr-4" 
            />
            <div>
              <p className="text-gray-500">Name: {userData.name}</p>
              <p className="text-gray-500">Bio: {userData.bio}</p>
            </div>
          </div>
          <button 
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setIsEditing(true)}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </span>
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Personnel Information</h3>
          <button 
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setIsEditing(true)}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">First Name</p>
            {isEditing ? (
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.firstName}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Name</p>
            {isEditing ? (
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.lastName}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">E-mail</p>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.email}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Tel No:</p>
            {isEditing ? (
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.phone}</p>
            )}
          </div>
          
          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-1">Occupation</p>
            {isEditing ? (
              <input 
                type="text" 
                name="occupation" 
                value={formData.occupation} 
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.occupation}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Address</h3>
          <button 
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setIsEditing(true)}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Country</p>
            {isEditing ? (
              <input 
                type="text" 
                name="country" 
                value={formData.address.country} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.address.country}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">State/Province</p>
            {isEditing ? (
              <input 
                type="text" 
                name="state" 
                value={formData.address.state} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.address.state}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">City</p>
            {isEditing ? (
              <input 
                type="text" 
                name="city" 
                value={formData.address.city} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.address.city}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Postal/Zip Code</p>
            {isEditing ? (
              <input 
                type="text" 
                name="zipCode" 
                value={formData.address.zipCode} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="font-medium">{userData.address.zipCode}</p>
            )}
          </div>
        </div>
      </div>
      
      {isEditing && (
        <div className="flex justify-end mt-4">
          <button 
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;