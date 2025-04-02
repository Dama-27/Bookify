// src/services/reviewApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/feedback'; // Update with your backend URL

// Fetch all reviews
export const fetchReviews = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data; // Expecting array of FeedbackDTO
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
};

// Submit a new review
export const submitReview = async (reviewData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/save`, reviewData);
        return response.data;
    } catch (error) {
        console.error("Error submitting review:", error);
        throw error;
    }
};
