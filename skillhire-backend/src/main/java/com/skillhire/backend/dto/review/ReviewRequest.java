package com.skillhire.backend.dto.review;

public record ReviewRequest(
        Long reviewerId,
        Integer rating,
        String comment
) {}