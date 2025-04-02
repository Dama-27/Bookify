package com.example.Book.repo;

import com.example.Book.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query("SELECT f FROM Feedback f WHERE f.consumer.client_id = :clientId")
    List<Feedback> findByConsumerId(@Param("clientId") Long clientId);



}
