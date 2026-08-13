package com.skillhire.backend.dto.booking;

public record BookingResponse(
        Long id,
        Long workerId,
        Long workerUserId,
        Long customerId,
        String workerName,
        String customerName,
        String category,
        String date,
        String time,
        String address,
        String description,
        String status,
        Integer price
) {}