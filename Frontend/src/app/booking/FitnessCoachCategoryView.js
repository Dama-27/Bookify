import React, { useState } from 'react';

const FitnessCoachCategoryView = () => {
  const [specializationFilter, setSpecializationFilter] = useState('All');
  
  const specializations = ['All', 'Yoga', 'Strength', 'Cardio', 'Nutrition', 'Pilates'];
  
  const coaches = [
    {
      id: 1,
      name: 'Alex Johnson',
      service: 'Yoga Instructor',
      specialization: 'Yoga',
      image: '/path/to/coach1.jpg'
    },
    {
      id: 2,
      name: 'Marcus Peters',
      service: 'Personal Trainer',
      specialization: 'Strength',
      image: '/path/to/coach2.jpg'
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      service: 'Cardio Expert',
      specialization: 'Cardio',
      image: '/path/to/coach3.jpg'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      service: 'Nutritionist',
      specialization: 'Nutrition',
      image: '/path/to/coach4.jpg'
    },
    {
      id: 5,
      name: 'David Chen',
      service: 'Pilates Instructor',
      specialization: 'Pilates',
      image: '/path/to/coach5.jpg'
    },
    {
      id: 6,
      name: 'Jennifer Taylor',
      service: 'Fitness Coach',
      specialization: 'Strength',
      image: '/path/to/coach6.jpg'
    }
  ];

  const filteredCoaches = specializationFilter === 'All' 
    ? coaches 
    : coaches.filter(coach => coach.specialization === specializationFilter);

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Fitness Professionals</h3>
        
        <div className="flex space-x-2">
          {specializations.map(spec => (
            <button
              key={spec}
              className={`px-3 py-1 rounded-md text-sm ${
                specializationFilter === spec 
                  ? 'bg-cyan-400 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSpecializationFilter(spec)}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {filteredCoaches.map(coach => (
          <div key={coach.id} className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="place-items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img 
                  src="/api/placeholder/100/100" 
                  alt={`Coach ${coach.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{coach.name}</h4>
                <p className="text-gray-600">{coach.service}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {coach.specialization}
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

export default FitnessCoachCategoryView;