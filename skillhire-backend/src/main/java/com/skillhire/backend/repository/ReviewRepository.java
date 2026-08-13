package com.skillhire.backend.repository;

import com.skillhire.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByWorker_IdOrderByCreatedAtDesc(Long workerId);

    boolean existsByWorker_IdAndReviewer_Id(Long workerId, Long reviewerId);
}