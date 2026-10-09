package com.registeroffice.register_office_backend.consumer;

import com.registeroffice.register_office_backend.model.Circular;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class CircularConsumer {

    @KafkaListener(topics = "circular-events", groupId = "register-office-group")
    public void consume(Circular circular) {
        System.out.println("Received Circular:");
        System.out.println("Title: " + circular.getTitle());
        System.out.println("Category: " + circular.getCategory());
        System.out.println("Message: " + circular.getMessage());
    }
}