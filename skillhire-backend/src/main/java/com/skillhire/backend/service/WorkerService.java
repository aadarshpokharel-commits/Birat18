package com.skillhire.backend.service;

import com.skillhire.backend.dto.worker.WorkerProfileRequest;
import com.skillhire.backend.dto.worker.WorkerResponse;
import com.skillhire.backend.entity.Category;
import com.skillhire.backend.entity.User;
import com.skillhire.backend.entity.WorkerProfile;
import com.skillhire.backend.enums.Role;
import com.skillhire.backend.exception.BadRequestException;
import com.skillhire.backend.exception.ResourceNotFoundException;
import com.skillhire.backend.repository.CategoryRepository;
import com.skillhire.backend.repository.UserRepository;
import com.skillhire.backend.repository.WorkerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkerService {

    private final WorkerProfileRepository workerProfileRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final Mapper mapper;

    public List<WorkerResponse> search(String categorySlug, String location, String query) {
        return workerProfileRepository.search(
                        blankToNull(categorySlug),
                        blankToNull(location),
                        blankToNull(query))
                .stream()
                .map(mapper::toWorkerResponse)
                .toList();
    }

    public WorkerResponse getById(Long id) {
        WorkerProfile worker = workerProfileRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker not found: " + id));

        return mapper.toWorkerResponse(worker);
    }

    public WorkerResponse getByUserId(Long userId) {
        WorkerProfile worker = workerProfileRepository.findByUser_Id(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker profile not found"));

        return mapper.toWorkerResponse(worker);
    }

    @Transactional
    public WorkerResponse createOrUpdateProfile(Long userId, WorkerProfileRequest req) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found: " + userId));

        if (user.getRole() != Role.WORKER) {
            throw new BadRequestException(
                    "Only WORKER accounts can create a worker profile.");
        }

        Category category = categoryRepository.findBySlug(req.categorySlug())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found: " + req.categorySlug()));

        WorkerProfile profile = workerProfileRepository
                .findByUser_Id(userId)
                .orElseGet(() ->
                        WorkerProfile.builder()
                                .user(user)
                                .build());

        profile.setCategory(category);
        profile.setProfession(req.profession());
        profile.setExperience(req.experience() != null ? req.experience() : 0);
        profile.setPrice(req.price());
        profile.setLocation(req.location());
        profile.setLanguages(
                req.languages() == null ? List.of() : req.languages());
        profile.setSkills(
                req.skills() == null ? List.of() : req.skills());
        profile.setAbout(req.about());
        profile.setPhotoUrl(req.photoUrl());

        if (req.available() != null) {
            profile.setAvailable(req.available());
        }

        workerProfileRepository.save(profile);

        return mapper.toWorkerResponse(profile);
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }
}