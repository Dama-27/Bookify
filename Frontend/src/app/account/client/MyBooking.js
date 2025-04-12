import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const clientId = localStorage.getItem('clientId');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!clientId) {
        setError('Client ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8081/api/bookings/client/${clientId}`);
        const bookingsData = response.data.map(booking => ({
          id: booking.booking_id,
          booking_date_time: new Date(booking.booking_date_time),
          status: booking.status ? 'Confirmed' : 'Cancelled',
          service: booking.service,
          provider: booking.provider
        }));
        setBookings(bookingsData);
      } catch (err) {
        setError('Failed to fetch bookings');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [clientId]);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:8081/api/bookings/${bookingId}/cancel`);
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled' }
          : booking
      ));
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Failed to cancel booking');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const now = new Date();
    if (activeTab === 'upcoming') {
      return booking.booking_date_time > now && booking.status === 'Confirmed';
    } else {
      return booking.booking_date_time < now || booking.status === 'Cancelled';
    }
  });

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'upcoming'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'past'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-gray-500">No {activeTab} bookings found</div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{booking.service?.name || 'Service'}</h3>
                    <p className="text-gray-600">{booking.provider?.username || 'Provider'}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-sm ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Booking ID</p>
                    <p className="font-medium">{booking.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {booking.booking_date_time.toLocaleDateString()} at{' '}
                      {booking.booking_date_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-medium">${booking.service?.price?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    View Details
                  </button>
                  {booking.status === 'Confirmed' && activeTab === 'upcoming' && (
                    <button 
                      onClick={() => cancelBooking(booking.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;