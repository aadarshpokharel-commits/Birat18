package com.skillhire.backend.controller;

import com.skillhire.backend.dto.review.ReviewRequest;
import com.skillhire.backend.dto.review.ReviewResponse;
import com.skillhire.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/worker/{workerId}")
    public List<ReviewResponse> getReviews(@PathVariable Long workerId) {
        return reviewService.getReviews(workerId);
    }

    @PostMapping("/worker/{workerId}")
    public ResponseEntity<ReviewResponse> addReview(
            @PathVariable Long workerId,
            @RequestBody ReviewRequest req
    ) {
        return ResponseEntity.ok(reviewService.addReview(workerId, req));
    }
}