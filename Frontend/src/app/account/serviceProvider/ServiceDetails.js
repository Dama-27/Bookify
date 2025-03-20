import React, { useState } from 'react';
import Navigation from "../../../components/ui/navigation";

const ServiceDetails = ({ serviceData }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    providerName: serviceData?.providerName || '',
    specialty: serviceData?.specialty || '',
    qualification: serviceData?.qualification || '',
    contactNumber: serviceData?.contactNumber || '',
    workplace: serviceData?.workplace || '',
    address: {
      clinic: serviceData?.address?.clinic || '',
      district: serviceData?.address?.district || '',
      county: serviceData?.address?.county || ''
    },
    workingDays: serviceData?.workingDays || {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    workHours: serviceData?.workHours || {
      start: '08:00',
      end: '17:00'
    },
    timePackages: serviceData?.timePackages || 4
  });

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

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day]
      }
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      workHours: {
        ...prev.workHours,
        [name]: value
      }
    }));
  };

  const handleTimePackagesChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setFormData(prev => ({
      ...prev,
      timePackages: value
    }));
  };

  const handleSave = () => {
    // Here you would save the updated service data
    console.log('Saving service details:', formData);
    setEditMode(false);
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
    <div className='bg-cyan-100 p-8'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Service Details</h2>
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Edit Details
          </button>
        ) : (
          <button 
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Provider Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Provider Name</label>
            {editMode ? (
              <input 
                type="text" 
                name="providerName" 
                value={formData.providerName} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.providerName || 'Not specified'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Specialty/Service</label>
            {editMode ? (
              <input 
                type="text" 
                name="specialty" 
                value={formData.specialty} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.specialty || 'Not specified'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Qualification</label>
            {editMode ? (
              <input 
                type="text" 
                name="qualification" 
                value={formData.qualification} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.qualification || 'Not specified'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Contact Number</label>
            {editMode ? (
              <input 
                type="text" 
                name="contactNumber" 
                value={formData.contactNumber} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.contactNumber || 'Not specified'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Workplace/Hospital</label>
            {editMode ? (
              <input 
                type="text" 
                name="workplace" 
                value={formData.workplace} 
                onChange={handleChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.workplace || 'Not specified'}</p>
            )}
          </div>
        </div>
        
        <h3 className="font-medium mb-2">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Clinic/Location</label>
            {editMode ? (
              <input 
                type="text" 
                name="clinic" 
                value={formData.address.clinic} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.address.clinic || 'Not specified'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">District</label>
            {editMode ? (
              <input 
                type="text" 
                name="district" 
                value={formData.address.district} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.address.district || 'Not specified'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">County/City</label>
            {editMode ? (
              <input 
                type="text" 
                name="county" 
                value={formData.address.county} 
                onChange={handleAddressChange}
                className="w-full border rounded-md p-2" 
              />
            ) : (
              <p className="py-2">{formData.address.county || 'Not specified'}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Availability Settings</h3>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Working Days</h4>
          {editMode ? (
            <div className="flex flex-wrap gap-2">
              {Object.keys(formData.workingDays).map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  type="button"
                  className={`py-2 px-3 rounded-md ${
                    formData.workingDays[day] 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Object.keys(formData.workingDays).map((day) => (
                <span
                  key={day}
                  className={`py-2 px-3 rounded-md ${
                    formData.workingDays[day] 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium mb-2">Working Hours</h4>
            {editMode ? (
              <div className="flex items-center gap-2">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Start Time</label>
                  <input 
                    type="time" 
                    name="start" 
                    value={formData.workHours.start} 
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
                    value={formData.workHours.end} 
                    onChange={handleTimeChange}
                    className="border rounded-md p-2" 
                  />
                </div>
              </div>
            ) : (
              <p className="py-2">
                {formData.workHours.start} to {formData.workHours.end}
              </p>
            )}
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Time Slots</h4>
            {editMode ? (
              <div>
                <label className="block text-gray-700 text-sm mb-1">Number of Time Slots</label>
                <input 
                  type="number" 
                  min="1" 
                  max="12" 
                  value={formData.timePackages} 
                  onChange={handleTimePackagesChange}
                  className="border rounded-md p-2 w-full" 
                />
              </div>
            ) : (
              <p className="py-2">
                {formData.timePackages} slots per working day
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Time Slot Summary</h4>
          <p className="text-sm text-gray-700">
            Working hours: {formData.workHours.start} - {formData.workHours.end}
          </p>
          <p className="text-sm text-gray-700">
            {calculateTimeSlotDuration(formData.workHours.start, formData.workHours.end, formData.timePackages)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;