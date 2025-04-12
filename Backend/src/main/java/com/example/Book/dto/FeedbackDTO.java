package com.example.Book.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private Long feedbackId;
    private Long consumerId;
    private Long providerId;
    private String consumerName;
    private String comments;
    private int rating;
    private LocalDateTime createdAt;
}
