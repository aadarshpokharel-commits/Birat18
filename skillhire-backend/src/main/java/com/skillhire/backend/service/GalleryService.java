package com.skillhire.backend.service;

import com.skillhire.backend.dto.worker.GalleryResponse;
import com.skillhire.backend.entity.WorkerGallery;
import com.skillhire.backend.entity.WorkerProfile;
import com.skillhire.backend.exception.ResourceNotFoundException;
import com.skillhire.backend.repository.GalleryRepository;
import com.skillhire.backend.repository.WorkerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final WorkerProfileRepository workerProfileRepository;

    // ── Profile picture ──────────────────────────────────────────────────────

    @Transactional
    public void updateProfilePhoto(Long workerId, String imageUrl) {
        WorkerProfile worker = workerProfileRepository.findById(workerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker not found: " + workerId));
        worker.setPhotoUrl(imageUrl);
        workerProfileRepository.save(worker);
    }

    // ── Gallery ──────────────────────────────────────────────────────────────

    public List<GalleryResponse> getGallery(Long workerId) {
        return galleryRepository.findByWorker_IdOrderByUploadedAtDesc(workerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public GalleryResponse addPhoto(Long workerId, String imageUrl, String caption) {
        WorkerProfile worker = workerProfileRepository.findById(workerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker not found: " + workerId));

        WorkerGallery photo = WorkerGallery.builder()
                .worker(worker)
                .imageUrl(imageUrl)
                .caption(caption != null ? caption : "")
                .build();

        galleryRepository.save(photo);
        return toResponse(photo);
    }

    @Transactional
    public void deletePhoto(Long photoId) {
        if (!galleryRepository.existsById(photoId)) {
            throw new ResourceNotFoundException("Photo not found: " + photoId);
        }
        galleryRepository.deleteById(photoId);
    }

    private GalleryResponse toResponse(WorkerGallery g) {
        return new GalleryResponse(
                g.getId(),
                g.getImageUrl(),
                g.getCaption(),
                g.getUploadedAt().toString()
        );
    }
}