package com.example.Book.controller;

import com.example.Book.dto.FeedbackDTO;
import com.example.Book.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        FeedbackDTO createdFeedback = feedbackService.createFeedback(feedbackDTO);
        return ResponseEntity.ok(createdFeedback);
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByProviderId(@PathVariable Long providerId) {
        List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByProviderId(providerId);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/consumer/{consumerId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByConsumerId(@PathVariable Long consumerId) {
        List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByConsumerId(consumerId);
        return ResponseEntity.ok(feedbacks);
    }
}
