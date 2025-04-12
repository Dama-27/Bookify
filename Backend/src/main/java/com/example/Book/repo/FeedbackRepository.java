package com.example.Book.repo;

import com.example.Book.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByServiceProvider_ProviderId(Long providerId);
    List<Feedback> findByConsumer_ClientId(Long consumerId);
}
