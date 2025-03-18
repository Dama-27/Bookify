import { Card, CardContent } from "../ui/card";
import "../../styles/Home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import image1 from '../../images/Ellipse 1.png';
import image2 from '../../images/Ellipse 137.png';
import image3 from '../../images/Ellipse 138.png';

const Feedback = () => {

  const [reviews, setReviews] = useState([
    { id: 1, image: image1, name: "John Doe", email: "user@example.com", comment: "The booking system is incredibly intuitive and has saved me hours of administrative work!", rating: 5 },
    { id: 2, image: image2, name: "Jane Smith", email: "jane@example.com", comment: "Excellent service and easy to use!", rating: 4 },
    { id: 3, image: image3, name: "Alice Brown", email: "alice@example.com", comment: "Fast and reliable. Highly recommended!", rating: 5 }
  ]);

  const handleRatingChange = (id, value) => {
    setReviews(reviews.map(review => review.id === id ? { ...review, rating: value } : review));
  };

  return (
    <section className="py-12 px-6 bg-gray-100">
            <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 items-center w-full rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-12">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl text-left font-bold mb-2 px-3">
                    Feedback...  <Link to="/review" className="bg-teal-400 hover:bg-teal-600 text-white text-sm px-5 py-2 rounded-xl">add feedback</Link>
                  </h2>
                  <p className="text-gray-600 text-left px-5">What our users are saying</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8 lg:p-16">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full mb-4 overflow-hidden">
                            <img 
                              src={review.image} 
                              alt={`${review.name}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-bold mb-1">{review.name}</h3>
                          <p className="text-gray-500 text-sm mb-4">{review.email}</p>
                          <p className="text-gray-600">{review.comment}</p>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <label key={star} className="mr-2">
                                <input
                                  type="radio"
                                  name={`rating-${review.id}`}
                                  value={star}
                                  checked={review.rating === star}
                                  onChange={() => handleRatingChange(review.id, star)}
                                  className="sr-only"
                                />
                                <svg 
                                  className={`w-8 h-8 cursor-pointer ${review.rating >= star ? "text-yellow-400" : "text-gray-300"}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </label>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
  );
}

export default Feedback;