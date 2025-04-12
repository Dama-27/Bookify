package com.example.Book.repo;

import com.example.Book.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByConsumer_ClientId(Long clientId);
    List<Booking> findByServices_ServiceId(Long serviceId);
    boolean existsByBookingIdAndConsumer_ClientId(Long bookingId, Long clientId);
}