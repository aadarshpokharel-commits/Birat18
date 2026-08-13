package com.skillhire.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillhire.backend.dto.message.MessageRequest;
import com.skillhire.backend.dto.message.MessageResponse;
import com.skillhire.backend.service.MessageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageResponse> send(@Valid @RequestBody MessageRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(messageService.send(req));
    }

    // GET /api/messages/conversation?userA=1&userB=2
    @GetMapping("/conversation")
    public List<MessageResponse> conversation(@RequestParam Long userA, @RequestParam Long userB) {
        return messageService.conversation(userA, userB);
    }

    // GET /api/messages/unread-count?userId=1
    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount(@RequestParam Long userId) {
        return Map.of("count", messageService.unreadCount(userId));
    }

    // POST /api/messages/mark-read?userId=1&senderId=2
    @PostMapping("/mark-read")
    public ResponseEntity<Void> markAsRead(@RequestParam Long userId, @RequestParam Long senderId) {
        messageService.markAsRead(userId, senderId);
        return ResponseEntity.ok().build();
    }
}