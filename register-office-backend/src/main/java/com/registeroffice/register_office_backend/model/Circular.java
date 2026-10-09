package com.registeroffice.register_office_backend.model;

public class Circular {

    private String title;
    private String category;
    private String message;

    public Circular() {
    }

    public Circular(String title, String category, String message) {
        this.title = title;
        this.category = category;
        this.message = message;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}