import React, { useState } from 'react';
import ClientBookingPage from '../client/clientBookingPage';

const FirstPage = () => {
  const [currentPage, setCurrentPage] = useState('provider'); 
  const [serviceData, setServiceData] = useState({
    providerName: '',
    specialty: '',
    qualification: '',
    contactNumber: '',
    workplace: '',
    address: {
      clinic: '',
      district: '',
      county: ''
    },
    workingDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    workHours: {
      start: '08:00',
      end: '17:00'
    },
    timePackages: 4 // Default number of slots per hour
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleDayToggle = (day) => {
    setServiceData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day]
      }
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      workHours: {
        ...prev.workHours,
        [name]: value
      }
    }));
  };

  const handleTimePackagesChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setServiceData(prev => ({
      ...prev,
      timePackages: value
    }));
  };

  const renderProviderPage = () => {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Service Provider Setup</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-1">Provider Name</label>
              <input 
                type="text" 
                name="providerName" 
                value={serviceData.providerName} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Specialty/Service</label>
              <input 
                type="text" 
                name="specialty" 
                value={serviceData.specialty} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Qualification</label>
              <input 
                type="text" 
                name="qualification" 
                value={serviceData.qualification} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Contact Number</label>
              <input 
                type="text" 
                name="contactNumber" 
                value={serviceData.contactNumber} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Workplace/Hospital</label>
              <input 
                type="text" 
                name="workplace" 
                value={serviceData.workplace} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
          </div>
          
          <h3 className="font-medium mb-2">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Clinic/Location</label>
              <input 
                type="text" 
                name="clinic" 
                value={serviceData.address.clinic} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">District</label>
              <input 
                type="text" 
                name="district" 
                value={serviceData.address.district} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">County/City</label>
              <input 
                type="text" 
                name="county" 
                value={serviceData.address.county} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2" 
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Availability Settings</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Working Days</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(serviceData.workingDays).map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  className={`py-2 px-3 rounded-md ${
                    serviceData.workingDays[day] 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium mb-2">Working Hours</h3>
              <div className="flex items-center gap-2">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Start Time</label>
                  <input 
                    type="time" 
                    name="start" 
                    value={serviceData.workHours.start} 
                    onChange={handleTimeChange}
                    className="border rounded-md p-2" 
                  />
                </div>
                <span className="mt-6">to</span>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">End Time</label>
                  <input 
                    type="time" 
                    name="end" 
                    value={serviceData.workHours.end} 
                    onChange={handleTimeChange}
                    className="border rounded-md p-2" 
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Time Slots</h3>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Number of Time Slots</label>
                <input 
                  type="number" 
                  min="1" 
                  max="12" 
                  value={serviceData.timePackages} 
                  onChange={handleTimePackagesChange}
                  className="border rounded-md p-2 w-full" 
                />
                <p className="text-gray-500 text-sm mt-1">
                  This will divide your working hours into {serviceData.timePackages} equal time slots.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Time Slot Preview</h3>
            <p className="text-sm text-gray-700">
              Working hours: {serviceData.workHours.start} - {serviceData.workHours.end}
            </p>
            <p className="text-sm text-gray-700">
              {calculateTimeSlotDuration(serviceData.workHours.start, serviceData.workHours.end, serviceData.timePackages)}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={() => setCurrentPage('client')}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
          >
            View Client Booking Page
          </button>
        </div>
      </div>
    );
  };

  // Helper function to calculate and display time slot duration
  const calculateTimeSlotDuration = (start, end, packages) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const totalMinutes = endMinutes - startMinutes;
    
    const slotDuration = Math.floor(totalMinutes / packages);
    const hours = Math.floor(slotDuration / 60);
    const minutes = slotDuration % 60;
    
    let durationText = '';
    if (hours > 0) {
      durationText += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      durationText += `${hours > 0 ? ' and ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    
    return `Each time slot will be ${durationText} long.`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {currentPage === 'provider' ? renderProviderPage() : (
        <ClientBookingPage 
          serviceData={serviceData}
          onBack={() => setCurrentPage('provider')}
        />
      )}
    </div>
  );
};

export default FirstPage;