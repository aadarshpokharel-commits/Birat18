package com.skillhire.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/** Mirrors the frontend's `Worker` interface in src/lib/mock-data.ts. */
@Entity
@Table(name = "worker_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Every worker profile belongs to exactly one user account (role = WORKER).
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String profession;

    @Builder.Default
    private Double rating = 0.0;

    @Column(name = "reviews_count")
    @Builder.Default
    private Integer reviewsCount = 0;

    // Years of experience.
    @Builder.Default
    private Integer experience = 0;

    // Base price in rupees per hour.
    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String location;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "worker_languages",
            joinColumns = @JoinColumn(name = "worker_id")
    )
    @Column(name = "language")
    @Builder.Default
    private List<String> languages = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "worker_skills",
            joinColumns = @JoinColumn(name = "worker_id")
    )
    @Column(name = "skill")
    @Builder.Default
    private List<String> skills = new ArrayList<>();

    @Column(length = 2000)
    private String about;

    // Optional base64 data-URL or remote URL for the worker's profile photo.
    @Column(name = "photo_url", length = 5000000)
    private String photoUrl;

    @Builder.Default
    private Boolean available = true;

    @Column(name = "completed_jobs")
    @Builder.Default
    private Integer completedJobs = 0;

    @Builder.Default
    private Boolean verified = false;
}