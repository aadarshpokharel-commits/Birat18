package com.skillhire.backend.dto.review;

public record ReviewResponse(
        Long id,
        String reviewerName,
        String initials,
        String color,
        Integer rating,
        String comment,
        String createdAt
) {}