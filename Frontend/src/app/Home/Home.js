import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import Button from "../../components/ui/button";
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import "../../styles/Home.css";
import image1 from '../../images/1ae6e703-2e7a-4be5-9ca1-13a2cdd82738.png';
import image2 from '../../images/14ac423b-f383-4ab5-b624-4fb57e99b7ef.webp';
import image3 from '../../images/622e4649-090b-4f8f-bee7-9c607d3f8732.webp';
import { Link } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const slideInterval = useRef(null);
  const slideDelay = 5000;

  useEffect(() => {
    startAutoSlide();
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    startAutoSlide();
  }, [currentSlide]);

  const startAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, slideDelay);
  };

  const pauseAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const nextSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    pauseAutoSlide();
    setCurrentSlide(index);
  };

  const monthlyData = [
    { month: "Jan", value: 2500 },
    { month: "Feb", value: 2800 },
    { month: "Mar", value: 3000 },
    { month: "Apr", value: 2900 },
    { month: "May", value: 3100 },
    { month: "Jun", value: 2700 },
    { month: "Jul", value: 2800 },
  ];

  const images = [image1, image2, image3];

  return (
    
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-10 flex justify-between items-center p-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center w-full h-full rounded-lg border-b-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              BOOKIFY
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-blue-500 font-medium">Home</Link>
            <Link to="/review" className="text-gray-600 hover:text-blue-500 transition-colors">Review</Link>
            <Link to="/community" className="text-gray-600 hover:text-blue-500 transition-colors">Community</Link>
            <Link to="/service" className="text-gray-600 hover:text-blue-500 transition-colors">Service</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button className="hidden md:block bg-white text-gray-700 border hover:bg-gray-50">
                Sign In
              </Button>
            </Link>
            <Link to="/signupcommon">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>      
      </nav>
      
      <section className="px-6 py-16 md:py-24 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center  w-[95%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50">
          <div 
            className="relative w-full h-[450px] md:h-[500px] overflow-hidden rounded-lg"
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            {images.map((image, index) => (
              <div 
                key={index}
                className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                  currentSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
              >
                <img 
                  src={image} 
                  className="w-full h-full object-cover rounded-lg" 
                  alt={`Slide ${index + 1}`} 
                />
              </div>
            ))}

            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
              {[0, 1, 2].map((slideIndex) => (
                <button 
                  key={slideIndex}
                  type="button" 
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === slideIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => goToSlide(slideIndex)}
                  aria-current={currentSlide === slideIndex ? "true" : "false"}
                  aria-label={`Slide ${slideIndex + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              type="button" 
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
              onClick={prevSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-white group-focus:outline-none transition-all">
                <svg className="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            
            <button 
              type="button" 
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
              onClick={nextSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-white group-focus:outline-none transition-all">
                <svg className="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>

          <div className="order-2 md:order-1 items-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Step into the <span className="text-3xl text-black">----</span> 
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-blue-500">future</span> of <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">B</span>ooking systems
            </h1>
            <p className="text-gray-600 mb-8">
              Streamline your appointments, maximize efficiency, and enhance client satisfaction with our intuitive booking platform.
            </p>
            <div className="space-x-4 items-center justify-start">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white text-center">
                Get Started
              </Button>
              <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-center">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 items-center  w-[95%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-20">
          <div>
            <div className="max-w-6xl mx-auto pb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaUser className="text-blue-500 text-xl" />
                    </div>
                    <div>
                      <div className="items-center space-x-2 px-10">
                        <div>
                          <p className="text-gray-500">Total Clients</p>
                          <p className="text-2xl font-bold">5,457</p>
                        </div>
                      </div>
                      <div className="boarder bg-slate-200 text-left">
                        <div className="">
                          <span className="text-green-500 text-sm">+16.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaCalendarAlt className="text-green-500 text-xl"/>
                    </div>
                    <div>
                      <div className="items-center space-x-2 px-10">
                        <div>
                          <p className="text-gray-500">Service Providers</p>
                          <p className="text-2xl font-bold">5,457</p>
                        </div>
                      </div>
                      <div className="boarder bg-slate-200 text-left">
                        <div className="">
                          <span className="text-green-500 text-sm">+16.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>               
                <Card>
                  <CardContent className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaMoneyBillWave className="text-purple-500 text-xl"/>
                    </div>
                    <div>
                      <div className="items-center space-x-2 px-10">
                        <div>
                          <p className="text-gray-500">Total Revenue</p>
                          <p className="text-2xl font-bold">Rs.100,555.00</p>
                        </div>
                      </div>
                      <div className="boarder bg-slate-200 text-left">
                        <div className="">
                          <span className="text-green-500 text-sm">+10.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="max-w-6xl mx-auto">
              <Card className="w-full">
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Client Login in Weekly</h3>
                    <span className="text-green-500 text-sm">+10.5% from last period</span>
                  </div>
                  <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6 bg-gray-50">
        <div>
          <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 items-center  w-[95%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-20">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Add New Service</h2>
                <p className="text-gray-600">Choose from our popular service categories</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src="/api/placeholder/400/200" 
                    alt="Medical Consultation" 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent>
                    <h3 className="font-bold mb-2">Doctors</h3>
                    <p className="text-gray-600">A patient booking a doctor's appointment for a medical consultation</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src="/api/placeholder/400/200" 
                    alt="Tutoring Session" 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent>
                    <h3 className="font-bold mb-2">Teachers</h3>
                    <p className="text-gray-600">A student scheduling a tutoring session with a lecturer</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src="/api/placeholder/400/200" 
                    alt="Fitness Training" 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent>
                    <h3 className="font-bold mb-2">Fitness Coach</h3>
                    <p className="text-gray-600">A trainee reserving a time slot with a fitness coach</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 px-6 bg-gray-50">
        <div>
          <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 items-center  w-[95%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-20">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Feedback</h2>
                <p className="text-gray-600">What our users are saying</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                        <h3 className="font-bold mb-1">John Doe</h3>
                        <p className="text-gray-500 text-sm mb-4">user@example.com</p>
                        <p className="text-gray-600">
                          "The booking system is incredibly intuitive and has saved me hours of administrative work!"
                        </p>
                        <div className="flex mt-4 space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600">B</button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">I</button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">Link</button>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm">
                            Comment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <footer className="bg-white border-t py-12 px-6 ">
        <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 w-[100%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-20">
          <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 w-[100%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Bookify</h3>
                <p className="text-gray-600 mb-4">The future of booking systems</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">Facebook</a>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4">Menu</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-600 hover:text-blue-500">Home</a></li>
                  <li><a href="/pricing" className="text-gray-600 hover:text-blue-500">Pricing</a></li>
                  <li><a href="/customers" className="text-gray-600 hover:text-blue-500">Customers</a></li>
                  <li><a href="/contact-us" className="text-gray-600 hover:text-blue-500">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="/login" className="text-gray-600 hover:text-blue-500">Login</a></li>
                  <li><a href="/sign-up" className="text-gray-600 hover:text-blue-500">Sign Up</a></li>
                  <li><a href="/privacy" className="text-gray-600 hover:text-blue-500">Privacy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Subscribe Our Newsletter</h3>
                <p className="text-gray-600 mb-4">Stay up to date with our latest features</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email..." 
                    className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-l-none">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t text-center text-gray-500">
              <p>© 2025 Your Company Name. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;