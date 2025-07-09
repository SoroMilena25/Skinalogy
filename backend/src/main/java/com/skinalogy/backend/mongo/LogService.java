package com.skinalogy.backend.mongo;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LogService {
    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public List<Log> findAll() {
        return logRepository.findAll();
    }

    public Log save(Log log) {
        return logRepository.save(log);
    }

    public Log logLogin(String username) {
        String message = "Connexion utilisateur : " + username;
        String level = "INFO";
        String date = java.time.LocalDateTime.now().toString();
        Log log = new Log(message, level, date);
        return logRepository.save(log);
    }
}
