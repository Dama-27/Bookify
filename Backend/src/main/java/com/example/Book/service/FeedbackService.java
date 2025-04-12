package com.example.Book.service;

import com.example.Book.dto.FeedbackDTO;
import com.example.Book.model.Consumer;
import com.example.Book.model.Feedback;
import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.FeedbackRepository;
import com.example.Book.repo.ServiceProviderRepository;
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
    private ServiceProviderRepository providerRepository;

    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {
        Consumer consumer = consumerRepository.findById(feedbackDTO.getConsumerId())
                .orElseThrow(() -> new RuntimeException("Consumer not found"));
        
        ServiceProvider provider = providerRepository.findById(feedbackDTO.getProviderId())
                .orElseThrow(() -> new RuntimeException("Service Provider not found"));

        Feedback feedback = new Feedback();
        feedback.setConsumer(consumer);
        feedback.setServiceProvider(provider);
        feedback.setComments(feedbackDTO.getComments());
        feedback.setRating(feedbackDTO.getRating());

        Feedback savedFeedback = feedbackRepository.save(feedback);
        return convertToDTO(savedFeedback);
    }

    public List<FeedbackDTO> getFeedbacksByProviderId(Long providerId) {
        List<Feedback> feedbacks = feedbackRepository.findByServiceProvider_ProviderId(providerId);
        return feedbacks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<FeedbackDTO> getFeedbacksByConsumerId(Long consumerId) {
        List<Feedback> feedbacks = feedbackRepository.findByConsumer_ClientId(consumerId);
        return feedbacks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private FeedbackDTO convertToDTO(Feedback feedback) {
        return new FeedbackDTO(
                feedback.getFeedbackId(),
                feedback.getConsumer().getClientId(),
                feedback.getServiceProvider().getProviderId(),
                feedback.getConsumer().getUsername(),
                feedback.getComments(),
                feedback.getRating(),
                feedback.getCreatedAt()
        );
    }
}
