package com.example.Book.repo;

import com.example.Book.dto.ServiceDateTimeDTO;
import com.example.Book.model.ServiceDateTime;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceDateTimeRepository extends JpaRepository<ServiceDateTime, Long> {

    @Query("SELECT new com.example.Book.dto.ServiceDateTimeDTO(sdt.serviceDateTimeId, sdt.startTime, sdt.EndTime, sdt.duration, sdt.date) " +
            "FROM ServiceDateTime sdt " +
            "JOIN sdt.services srv " +
            "JOIN srv.provider sp " +
            "WHERE sp.provider_id = :providerId")
    List<ServiceDateTimeDTO> findByProviderId(@Param("providerId") Long providerId);
}
