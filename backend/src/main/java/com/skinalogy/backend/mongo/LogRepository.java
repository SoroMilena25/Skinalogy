package com.skinalogy.backend.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LogRepository extends MongoRepository<Log, String> {
    // Ajoute ici des méthodes personnalisées si besoin
}
