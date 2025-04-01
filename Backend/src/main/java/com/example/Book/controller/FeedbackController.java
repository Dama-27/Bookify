package com.example.Book.controller;

import com.example.Book.dto.FeedbackDTO;
import com.example.Book.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/add")
    public ResponseEntity<?> addFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        try {
            FeedbackDTO savedFeedback = feedbackService.saveFeedback(feedbackDTO);
            return ResponseEntity.ok(savedFeedback);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<FeedbackDTO> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/consumer/{consumerId}")
    public List<FeedbackDTO> getFeedbackByConsumer(@PathVariable Long consumerId) {
        return feedbackService.getFeedbackByConsumer(consumerId);
    }
}
