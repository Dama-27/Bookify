import React, { useState } from 'react';
import MyProfile from './MyProfile';
import ServiceDetails from './ServiceDetails';
import Notifications from './Notifications';
import BookingService from './BookingService';
import Security from './Security';
import ResetPassword from './ResetPassword';
import DeleteAccount from './DeleteAccount';
import Navigation from "../../../components/ui/navigation";

const AccountSettings = () => {
  const [currentPage, setCurrentPage] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    bio: 'Medical professional',
    photo: '/profile-image.jpg',
    personalInfo: {
      firstName: 'Thilina',
      lastName: 'Thilina',
      email: 'Thilina@gmail.com',
      phone: '07********',
      role: 'Student'
    },
    address: {
      country: 'Sri Lanka',
      city: 'Colombo',
      district: 'Western',
      postalCode: '10100'
    }
  });

  const renderSidebar = () => {
    return (
      <div className="w-full md:w-48 bg-cyan-100 rounded-lg shadow-sm p-4">
        <SidebarItem 
          label="My Profile" 
          active={currentPage === 'profile'} 
          onClick={() => setCurrentPage('profile')} 
        />
        <SidebarItem 
          label="Service Details" 
          active={currentPage === 'serviceDetails'} 
          onClick={() => setCurrentPage('serviceDetails')} 
        />
        <SidebarItem 
          label="Notifications" 
          active={currentPage === 'notifications'} 
          onClick={() => setCurrentPage('notifications')} 
        />
        <SidebarItem 
          label="Booking Service" 
          active={currentPage === 'bookingService'} 
          onClick={() => setCurrentPage('bookingService')} 
        />
        <SidebarItem 
          label="Security" 
          active={currentPage === 'security'} 
          onClick={() => setCurrentPage('security')} 
        />
        <SidebarItem 
          label="Reset Password" 
          active={currentPage === 'resetPassword'} 
          onClick={() => setCurrentPage('resetPassword')} 
        />
        
        <div className="mt-8">
          <button
            onClick={() => setCurrentPage('deleteAccount')}
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
          active ? 'bg-blue-100 text-blue-500 font-medium' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {label}
      </div>
    );
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'profile':
        return <MyProfile userData={userData} setUserData={setUserData} />;
      case 'serviceDetails':
        return <ServiceDetails userData={userData} setUserData={setUserData} />;
      case 'notifications':
        return <Notifications />;
      case 'bookingService':
        return <BookingService />;
      case 'security':
        return <Security />;
      case 'resetPassword':
        return <ResetPassword />;
      case 'deleteAccount':
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
          
          <div className="flex-1">
            {renderContent()}
          </div>
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