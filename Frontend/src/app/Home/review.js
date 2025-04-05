import React, { useState, useEffect } from 'react';
import Navigation from '../../components/ui/navigation';
import { fetchReviews, submitReview } from '../../services/reviewApi';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    consumerId: "",
    consumerName: "",
    rating: 5,
    comment: "",
    bookingId: ""
  });

  // Fetch reviews when component loads
  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews();
      console.log("Fetched Reviews:", data); // Debugging
      setReviews(data);
    };
    getReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === "rating" ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newReview.consumerId || !newReview.bookingId) {
      alert("Consumer ID and Booking ID are required!");
      return;
    }

    try {
      const reviewToAdd = await submitReview({
        consumerId: newReview.consumerId,
        bookingId: newReview.bookingId,
        comments: newReview.comment,  // Ensure correct field name
        rating: newReview.rating
      });

      // Append the new review to the existing list
      setReviews((prevReviews) => [...prevReviews, reviewToAdd]);

      // Reset newReview form after submission
      setNewReview({ consumerId: "", consumerName: "", rating: 5, comment: "", bookingId: "" });
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Navigation /> 
      
      {/* Review List */}
      <section className='p-10'>
        <div className="p-6 rounded-lg shadow-md bg-cyan-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Reviews</h1>
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">What Our Customers Say</h2>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.responseDate} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">
                        {review.consumerName || "Anonymous"}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{review.comments}"</p> {/* Use comments */}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leave a Review */}
      <section className='p-10'>
        <div className="bg-cyan-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="mr-2">
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={newReview.rating === star}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <svg 
                      className={`w-8 h-8 cursor-pointer ${newReview.rating >= star ? "text-yellow-400" : "text-gray-300"}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 font-medium">
              Submit Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Review;
