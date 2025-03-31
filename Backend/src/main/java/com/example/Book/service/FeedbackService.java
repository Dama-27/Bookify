package com.example.Book.service;

import com.example.Book.dto.FeedbackDTO;
import com.example.Book.model.Consumer;
import com.example.Book.model.Feedback;
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

    public FeedbackDTO saveFeedback(FeedbackDTO feedbackDTO) {
        if (feedbackDTO.getConsumerId() == null) {
            throw new IllegalArgumentException("Consumer ID cannot be null");
        }

        Consumer consumer = consumerRepository.findById(feedbackDTO.getConsumerId())
                .orElseThrow(() -> new RuntimeException("Consumer not found with ID: " + feedbackDTO.getConsumerId()));

        Feedback feedback = new Feedback(consumer, feedbackDTO.getComments(), feedbackDTO.getRating());
        feedbackRepository.save(feedback);

        return new FeedbackDTO(feedback.getConsumer().getClient_id(),
                feedback.getComments(), feedback.getRating(), feedback.getResponseDate());
    }


    public List<FeedbackDTO> getAllFeedback() {
        return feedbackRepository.findAll().stream().map(feedback ->
                        new FeedbackDTO(feedback.getConsumer().getClient_id(),
                                feedback.getComments(), feedback.getRating(), feedback.getResponseDate()))
                .collect(Collectors.toList());
    }

    public List<FeedbackDTO> getFeedbackByConsumer(Long consumerId) {
        return feedbackRepository.findByConsumerId(consumerId).stream().map(feedback ->
                        new FeedbackDTO(feedback.getConsumer().getClient_id(),
                                feedback.getComments(), feedback.getRating(), feedback.getResponseDate()))
                .collect(Collectors.toList());
    }
}
