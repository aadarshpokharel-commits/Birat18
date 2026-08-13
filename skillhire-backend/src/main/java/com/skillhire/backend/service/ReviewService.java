package com.skillhire.backend.service;

import com.skillhire.backend.dto.review.ReviewRequest;
import com.skillhire.backend.dto.review.ReviewResponse;
import com.skillhire.backend.entity.Review;
import com.skillhire.backend.entity.User;
import com.skillhire.backend.entity.WorkerProfile;
import com.skillhire.backend.exception.BadRequestException;
import com.skillhire.backend.exception.ResourceNotFoundException;
import com.skillhire.backend.repository.ReviewRepository;
import com.skillhire.backend.repository.UserRepository;
import com.skillhire.backend.repository.WorkerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final UserRepository userRepository;

    private static final String[] COLORS = {
            "#f59e0b", "#0ea5e9", "#a16207", "#ec4899", "#334155",
            "#22c55e", "#8b5cf6", "#ef4444", "#2563eb", "#7c3aed"
    };

    public List<ReviewResponse> getReviews(Long workerId) {
        return reviewRepository.findByWorker_IdOrderByCreatedAtDesc(workerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ReviewResponse addReview(Long workerId, ReviewRequest req) {

        WorkerProfile worker = workerProfileRepository.findById(workerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker not found: " + workerId));

        User reviewer = userRepository.findById(req.reviewerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found: " + req.reviewerId()));

        if (reviewRepository.existsByWorker_IdAndReviewer_Id(workerId, req.reviewerId())) {
            throw new BadRequestException("You have already reviewed this worker.");
        }

        if (req.rating() < 1 || req.rating() > 5) {
            throw new BadRequestException("Rating must be between 1 and 5.");
        }

        Review review = Review.builder()
                .worker(worker)
                .reviewer(reviewer)
                .rating(req.rating())
                .comment(req.comment())
                .build();

        reviewRepository.save(review);

        // Recalculate worker's average rating
        List<Review> allReviews =
                reviewRepository.findByWorker_IdOrderByCreatedAtDesc(workerId);

        double avg = allReviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        worker.setRating(Math.round(avg * 10.0) / 10.0);
        worker.setReviewsCount(allReviews.size());
        workerProfileRepository.save(worker);

        return toResponse(review);
    }

    private ReviewResponse toResponse(Review r) {
        String name = r.getReviewer().getName();
        return new ReviewResponse(
                r.getId(),
                name,
                initialsOf(name),
                colorFor(r.getReviewer().getId()),
                r.getRating(),
                r.getComment(),
                r.getCreatedAt().toString()
        );
    }

    private String initialsOf(String name) {
        String[] parts = name.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(2, parts.length); i++) {
            if (!parts[i].isEmpty()) {
                sb.append(Character.toUpperCase(parts[i].charAt(0)));
            }
        }
        return sb.length() > 0
                ? sb.toString()
                : name.substring(0, Math.min(2, name.length())).toUpperCase(Locale.ROOT);
    }

    private String colorFor(Long id) {
        return COLORS[(int) (id % COLORS.length)];
    }
}