import React from 'react';
import image1 from '../../images/Ellipse 1.png';
import image2 from '../../images/Ellipse 137.png';
import image3 from '../../images/Ellipse 138.png';
import { Link } from 'react-router-dom';
const CommonCategoryView = () => {
  const commonProviders = [
    {
      id: 1,
      name: 'John Smith',
      service: 'General Services',
      image: image1
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      service: 'Customer Support',
      image: image2
    },
    {
      id: 3,
      name: 'David Lee',
      service: 'Consultation',
      image: image3
    },
    {
      id: 4,
      name: 'Emma Brown',
      service: 'Administration',
      image: image3
    },
    {
      id: 5,
      name: 'Michael Johnson',
      service: 'Assistance',
      image: image2
    },
    {
      id: 6,
      name: 'Jessica Taylor',
      service: 'General Support',
      image: image1
    }
  ];

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <h3 className="text-lg font-medium mb-6">Common Services</h3>
      
      <div className="grid grid-cols-3 gap-4 items-center">
        {commonProviders.map(provider => (
          <div key={provider.id} className="bg-white rounded-lg p-4 border border-gray-100 items-center">
            <div className="place-items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3 items-center">
                <img 
                  src={provider.image}
                  alt={`Provider ${provider.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{provider.name}</h4>
                <p className="text-gray-600">{provider.service}</p>
              </div>
            </div>
            <Link to="/clientbookingpage" className="bg-cyan-400 text-white px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition">
                Book Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonCategoryView;