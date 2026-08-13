package com.skillhire.backend.dto.worker;

public record GalleryResponse(
        Long id,
        String imageUrl,
        String caption,
        String uploadedAt
) {}