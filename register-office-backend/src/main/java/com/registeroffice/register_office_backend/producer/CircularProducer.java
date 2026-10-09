package com.registeroffice.register_office_backend.producer;

import com.registeroffice.register_office_backend.model.Circular;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class CircularProducer {

    private static final String TOPIC = "circular-events";

    private final KafkaTemplate<String, Circular> kafkaTemplate;

    public CircularProducer(KafkaTemplate<String, Circular> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendCircular(Circular circular) {
        kafkaTemplate.send(TOPIC, circular);
    }
}