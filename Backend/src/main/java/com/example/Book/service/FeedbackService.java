package com.example.Book.service;

import com.example.Book.dto.FeedbackDTO;
import com.example.Book.model.Booking;
import com.example.Book.model.Consumer;
import com.example.Book.model.Feedback;
import com.example.Book.repo.BookingRepository;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ConsumerRepository consumerRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public FeedbackDTO saveFeedback(FeedbackDTO feedbackDTO) {
        if (feedbackDTO.getConsumerId() == null || feedbackDTO.getBookingId() == null) {
            throw new IllegalArgumentException("Consumer ID and Booking ID cannot be null");
        }

        // Validate Consumer
        Consumer consumer = consumerRepository.findById(feedbackDTO.getConsumerId())
                .orElseThrow(() -> new RuntimeException("Consumer not found with ID: " + feedbackDTO.getConsumerId()));

        // Check if booking exists for the given consumer before allowing feedback submission
        boolean hasBooking = bookingRepository.existsByBookingIdAndConsumerClientId(feedbackDTO.getBookingId(), consumer.getClient_id());

        if (!hasBooking) {
            throw new RuntimeException("Feedback can only be given if the consumer has an existing booking.");
        }

        Booking booking = bookingRepository.findById(feedbackDTO.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + feedbackDTO.getBookingId()));

        Feedback feedback = new Feedback(consumer, booking, feedbackDTO.getComments(), feedbackDTO.getRating());
        feedbackRepository.save(feedback);

        return new FeedbackDTO(feedback.getConsumer().getClient_id(), feedback.getBooking().getBookingId(),
                feedback.getComments(), feedback.getRating(), feedback.getResponseDate());
    }

    public List<FeedbackDTO> getAllFeedback() {
        return feedbackRepository.findAll().stream().map(feedback ->
                        new FeedbackDTO(feedback.getConsumer().getClient_id(), feedback.getBooking().getBookingId(),
                                feedback.getComments(), feedback.getRating(), feedback.getResponseDate()))
                .collect(Collectors.toList());
    }

    public List<FeedbackDTO> getFeedbackByConsumer(Long consumerId) {
        return feedbackRepository.findByConsumerId(consumerId).stream().map(feedback ->
                        new FeedbackDTO(feedback.getConsumer().getClient_id(), feedback.getBooking().getBookingId(),
                                feedback.getComments(), feedback.getRating(), feedback.getResponseDate()))
                .collect(Collectors.toList());
    }
}
