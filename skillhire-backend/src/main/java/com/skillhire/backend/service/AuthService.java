package com.skillhire.backend.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillhire.backend.dto.auth.AuthResponse;
import com.skillhire.backend.dto.auth.LoginRequest;
import com.skillhire.backend.dto.auth.RegisterRequest;
import com.skillhire.backend.entity.Category;
import com.skillhire.backend.entity.User;
import com.skillhire.backend.entity.WorkerProfile;
import com.skillhire.backend.enums.Role;
import com.skillhire.backend.exception.BadRequestException;
import com.skillhire.backend.exception.InvalidCredentialsException;
import com.skillhire.backend.repository.CategoryRepository;
import com.skillhire.backend.repository.UserRepository;
import com.skillhire.backend.repository.WorkerProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final WorkerProfileRepository workerProfileRepository;
    private final CategoryRepository categoryRepository;
    private final Mapper mapper;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new BadRequestException("An account with this email already exists.");
        }

        User user = User.builder()
                .name(req.name())
                .email(req.email())
                .password(passwordEncoder.encode(req.password()))
                .role(req.role())
                .build();
        user = userRepository.save(user);

        if (req.role() == Role.WORKER) {
            Category defaultCategory = categoryRepository.findAll()
                    .stream()
                    .findFirst()
                    .orElseThrow(() -> new BadRequestException("No categories found."));

            WorkerProfile profile = WorkerProfile.builder()
                    .user(user)
                    .category(defaultCategory)
                    .profession("General Worker")
                    .experience(0)
                    .price(0)
                    .location("")
                    .languages(List.of())
                    .skills(List.of())
                    .about("")
                    .available(false)
                    .build();
            workerProfileRepository.save(profile);
        }

        return mapper.toAuthResponse(user);
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password."));
        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password.");
        }
        return mapper.toAuthResponse(user);
    }
}
