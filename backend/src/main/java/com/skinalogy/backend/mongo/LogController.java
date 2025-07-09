package com.skinalogy.backend.mongo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogController {
    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public List<Log> getAllLogs() {
        return logService.findAll();
    }

    @PostMapping
    public Log createLog(@RequestBody Log log) {
        return logService.save(log);
    }

    @PostMapping("/login")
    public Log logLogin(@RequestParam String username) {
        return logService.logLogin(username);
    }
}
