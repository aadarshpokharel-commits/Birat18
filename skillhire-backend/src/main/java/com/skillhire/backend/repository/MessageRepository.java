package com.skillhire.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skillhire.backend.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("""
           select m from Message m
           where (m.sender.id = :userA and m.receiver.id = :userB)
              or (m.sender.id = :userB and m.receiver.id = :userA)
           order by m.sentAt asc
           """)
    List<Message> findConversation(@Param("userA") Long userA, @Param("userB") Long userB);

    @Query("""
           select count(m) from Message m
           where m.receiver.id = :userId
             and m.read = false
           """)
    long countUnread(@Param("userId") Long userId);

    @Modifying
    @Query("""
           update Message m
           set m.read = true
           where m.receiver.id = :userId
             and m.sender.id = :senderId
             and m.read = false
           """)
    void markAsRead(@Param("userId") Long userId, @Param("senderId") Long senderId);
}