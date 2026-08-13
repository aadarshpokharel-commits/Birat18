package com.skillhire.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillhire.backend.entity.WorkerGallery;

public interface GalleryRepository extends JpaRepository<WorkerGallery, Long> {
    List<WorkerGallery> findByWorker_IdOrderByUploadedAtDesc(Long workerId);
}