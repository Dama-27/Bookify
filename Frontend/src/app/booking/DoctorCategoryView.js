import React, { useEffect, useState } from 'react';
import image1 from '../../images/Ellipse 1.png';
import image2 from '../../images/Ellipse 137.png';
import image3 from '../../images/Ellipse 138.png';
import { Link } from 'react-router-dom';

const CommonCategoryView = () => {
  const [providers, setProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:8081/api/booking/providers')
      .then(response => response.json())
      .then(data => {
        const filteredProviders = data
          .filter(provider => 
            provider.services.some(service => service.category === "Doctor") // Filtering providers with "Doctor" service
          )
          .map(provider => ({
            id: provider.providerId,
            name: provider.username,
            service: provider.services.length > 0 ? provider.services[0].name : 'No Service',
            image: `https://via.placeholder.com/48?text=${provider.username.charAt(0)}` // Placeholder image
          }));

        setProviders(filteredProviders);
      })
      .catch(error => console.error('Error fetching providers:', error));
  }, []);

  const totalPages = Math.ceil(providers.length / itemsPerPage);
  const currentProviders = providers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <h3 className="text-lg font-medium mb-6">Common Services</h3>
      <div className="grid grid-cols-3 gap-4 items-center">
        {currentProviders.map(provider => (
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
      <div className="flex justify-center mt-6 gap-2">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-300 px-4 py-2 rounded-l-lg">Previous</button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => setCurrentPage(index + 1)} 
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-cyan-500 text-white' : 'bg-gray-300'} rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 px-4 py-2 rounded-r-lg">Next</button>
        )}
      </div>
    </div>
  );
};

export default CommonCategoryView;
