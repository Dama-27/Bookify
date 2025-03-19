import React, { useState } from 'react';
const DoctorCategoryView = () => {
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  
  const specialties = ['All', 'Cardiology', 'Pediatrics', 'Neurology', 'Dermatology', 'Orthopedics', 'Psychiatry'];
  
  const doctors = [
    {
      id: 1,
      name: 'Dr. James Wilson',
      service: 'Cardiologist',
      specialty: 'Cardiology',
      image: '/path/to/doctor1.jpg'
    },
    {
      id: 2,
      name: 'Dr. Emily Parker',
      service: 'Pediatrician',
      specialty: 'Pediatrics',
      image: '/path/to/doctor2.jpg'
    },
    {
      id: 3,
      name: 'Dr. Robert Chen',
      service: 'Neurologist',
      specialty: 'Neurology',
      image: '/path/to/doctor3.jpg'
    },
    {
      id: 4,
      name: 'Dr. Maria Garcia',
      service: 'Dermatologist',
      specialty: 'Dermatology',
      image: '/path/to/doctor4.jpg'
    },
    {
      id: 5,
      name: 'Dr. Alex Thompson',
      service: 'Orthopedist',
      specialty: 'Orthopedics',
      image: '/path/to/doctor5.jpg'
    },
    {
      id: 6,
      name: 'Dr. Sophia Williams',
      service: 'Psychiatrist',
      specialty: 'Psychiatry',
      image: '/path/to/doctor6.jpg'
    }
  ];

  const filteredDoctors = specialtyFilter === 'All' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === specialtyFilter);

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Medical Professionals</h3>
        
        <div className="flex space-x-2">
          {specialties.map(specialty => (
            <button
              key={specialty}
              className={`px-3 py-1 rounded-md text-sm ${
                specialtyFilter === specialty 
                  ? 'bg-cyan-400 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSpecialtyFilter(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="place-items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img 
                  src="/api/placeholder/100/100" 
                  alt={`Doctor ${doctor.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{doctor.name}</h4>
                <p className="text-gray-600">{doctor.service}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {doctor.specialty}
              </span>
              <button className="bg-cyan-400 text-white px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition">
                Book Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorCategoryView;