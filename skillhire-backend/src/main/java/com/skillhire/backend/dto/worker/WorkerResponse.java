package com.skillhire.backend.dto.worker;

import java.util.List;

public record WorkerResponse(
        Long id,
        Long userId,
        String name,
        String profession,
        String category,
        Double rating,
        Integer reviewsCount,
        Integer experience,
        Integer price,
        String location,
        List<String> languages,
        List<String> skills,
        String about,
        Boolean available,
        Integer completedJobs,
        Boolean verified,
        String initials,
        String color,
        String photoUrl
) {}