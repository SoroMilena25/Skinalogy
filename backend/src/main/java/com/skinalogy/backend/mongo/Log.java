package com.skinalogy.backend.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "logs")
public class Log {
    @Id
    private String id;
    private String message;
    private String level;
    private String date;

    public Log() {}

    public Log(String message, String level, String date) {
        this.message = message;
        this.level = level;
        this.date = date;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
