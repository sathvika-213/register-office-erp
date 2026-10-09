package com.registeroffice.register_office_backend.controller;

import com.registeroffice.register_office_backend.model.Circular;
import com.registeroffice.register_office_backend.producer.CircularProducer;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/circulars")
public class CircularController {

    private final CircularProducer producer;

    public CircularController(CircularProducer producer) {
        this.producer = producer;
    }

    @PostMapping
    public String createCircular(@RequestBody Circular circular) {
        producer.sendCircular(circular);
        return "Circular sent to Kafka successfully!";
    }
}