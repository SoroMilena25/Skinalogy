package com.skinalogy.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/produits/top",
                    "/api/produits/cadeaux",
                    "/api/produits",
                    "/api/produits/{id}",
                    "/api/astuces",
                    "/api/astuces/{id}",
                    "/api/astuces/topHome",
                    "/api/categories",
                    "/api/typespeau",
                    "/api/utilisateurs/login",
                    "/api/utilisateurs", 
                    "/api/payments/create-payment-intent",
                    "/api/payments/confirm-payment",
                    "/api/utilisateurs/{id}/commandes",
                    "/api/utilisateurs/{id}",
                    "/api/logs/login",
                    "/api/commandes",
                    "/api/commandes/facture/{id}",
                    "/api/factures",
                    "/api/factures/{id}",
                    "/api/users",
                    "/api/upload",
                    "api/produits",
                    "/api/factures/stats-mensuelles"
                ).permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }

}
