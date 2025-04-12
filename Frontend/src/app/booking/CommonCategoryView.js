import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, LocationMarkerIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/outline';

const CommonCategoryView = ({ category, title, description }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    rating: '',
    price: '',
    location: '',
    availability: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8081/api/providers/category/${category}`);
        const providersData = response.data.map(provider => ({
          ...provider,
          rating: provider.rating || 0,
          price: provider.services?.[0]?.price || 0,
          location: provider.address || 'Not specified',
          availability: provider.availability || 'Flexible'
        }));
        setProviders(providersData);
      } catch (err) {
        setError('Failed to fetch providers. Please try again later.');
        console.error('Error fetching providers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [category]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProviders = providers.filter(provider => {
    return (
      (!filters.rating || provider.rating >= parseFloat(filters.rating)) &&
      (!filters.price || provider.price <= parseFloat(filters.price)) &&
      (!filters.location || provider.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.availability || provider.availability.toLowerCase().includes(filters.availability.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Max price"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Any Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <motion.div
              key={provider.providerId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={provider.profileImage || '/default-avatar.png'}
                      alt={provider.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{provider.username}</h3>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{provider.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">${provider.price}</p>
                    <p className="text-sm text-gray-500">per session</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <LocationMarkerIcon className="h-5 w-5 mr-2" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>{provider.availability}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {provider.bio || 'No description available'}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/booking/${provider.providerId}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => navigate(`/provider/${provider.providerId}`)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonCategoryView;
