package com.skillhire.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillhire.backend.dto.booking.BookingResponse;
import com.skillhire.backend.dto.worker.WorkerResponse;
import com.skillhire.backend.enums.Role;
import com.skillhire.backend.repository.BookingRepository;
import com.skillhire.backend.repository.UserRepository;
import com.skillhire.backend.repository.WorkerProfileRepository;
import com.skillhire.backend.service.Mapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminController {

    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final BookingRepository bookingRepository;
    private final Mapper mapper;

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        long totalUsers     = userRepository.count();
        long totalWorkers   = workerProfileRepository.count();
        long totalCustomers = userRepository.countByRole(Role.CUSTOMER);
        long totalBookings  = bookingRepository.count();

        return Map.of(
                "totalUsers",     totalUsers,
                "totalWorkers",   totalWorkers,
                "totalCustomers", totalCustomers,
                "totalBookings",  totalBookings
        );
    }

    @GetMapping("/users")
    public List<Map<String, Object>> users() {
        return userRepository.findAll().stream()
                .map(u -> Map.<String, Object>of(
                        "id",    u.getId(),
                        "name",  u.getName(),
                        "email", u.getEmail(),
                        "role",  u.getRole().name()
                ))
                .toList();
    }

    @GetMapping("/workers")
    public List<WorkerResponse> workers() {
        return workerProfileRepository.findAll()
                .stream()
                .map(mapper::toWorkerResponse)
                .toList();
    }

    @GetMapping("/bookings")
    public List<BookingResponse> bookings() {
        return bookingRepository.findAll()
                .stream()
                .map(mapper::toBookingResponse)
                .toList();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}