package com.skillhire.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillhire.backend.dto.worker.GalleryResponse;
import com.skillhire.backend.service.GalleryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping("/worker/{workerId}")
    public List<GalleryResponse> getGallery(@PathVariable Long workerId) {
        return galleryService.getGallery(workerId);
    }

    @PostMapping("/worker/{workerId}")
    public ResponseEntity<GalleryResponse> addPhoto(
            @PathVariable Long workerId,
            @RequestBody Map<String, String> body
    ) {
        String imageUrl = body.get("imageUrl");
        String caption = body.getOrDefault("caption", "");
        return ResponseEntity.ok(galleryService.addPhoto(workerId, imageUrl, caption));
    }

    @PutMapping("/worker/{workerId}/photo")
    public ResponseEntity<Void> updateProfilePhoto(
            @PathVariable Long workerId,
            @RequestBody Map<String, String> body
    ) {
        galleryService.updateProfilePhoto(workerId, body.get("imageUrl"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long photoId) {
        galleryService.deletePhoto(photoId);
        return ResponseEntity.noContent().build();
    }
}