package com.example.Book.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Book.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Basic CRUD methods provided by JpaRepository
}