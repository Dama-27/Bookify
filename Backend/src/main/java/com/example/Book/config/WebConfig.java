package com.example.Book.config;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir:${user.home}/bookify-uploads}")
    private String uploadDir;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        
        source.registerCorsConfiguration("/api/**", config);
        
        // Allow public access to uploaded files without credentials
        CorsConfiguration publicConfig = new CorsConfiguration();
        publicConfig.addAllowedOrigin("*");
        publicConfig.addAllowedMethod("GET");
        publicConfig.addAllowedHeader("*");
        publicConfig.setMaxAge(3600L);
        
        source.registerCorsConfiguration("/uploads/**", publicConfig);
        return new CorsFilter(source);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // CORS for API endpoints
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);

        // CORS for uploaded files
        registry.addMapping("/uploads/**")
            .allowedOrigins("*")
            .allowedMethods("GET")
            .allowedHeaders("*")
            .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ensure upload directory exists
        String uploadPath = uploadDir + File.separator + "profile-images";
        createDirectoryIfNotExists(uploadPath);

        // Configure resource handlers for uploaded files with permissive CORS
        registry.addResourceHandler("/uploads/**")
            .addResourceLocations("file:" + uploadDir + File.separator)
            .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS))
            .resourceChain(true);

        // Configure resource handlers for static images
        registry.addResourceHandler("/images/**")
            .addResourceLocations("classpath:/static/images/")
            .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS))
            .resourceChain(true);

        // Configure specific handler for profile images with permissive CORS
        registry.addResourceHandler("/uploads/profile-images/**")
            .addResourceLocations("file:" + uploadPath + File.separator)
            .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS))
            .resourceChain(true);
    }

    private void createDirectoryIfNotExists(String path) {
        File directory = new File(path);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }
} 