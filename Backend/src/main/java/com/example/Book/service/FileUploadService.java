package com.example.Book.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {
    
    private static final Logger logger = LoggerFactory.getLogger(FileUploadService.class);
    
    @Value("${app.upload.dir:${user.home}/uploads}")
    private String uploadDir;
    
    private final String profileImagesDir = "profile-images/";
    
    public FileUploadService() {
        // Directory creation will be handled in the uploadFile method
    }

    public String uploadFile(MultipartFile file) throws IOException {
        // Create the full upload directory path
        String fullUploadDir = uploadDir + "/" + profileImagesDir;
        Path uploadPath = Paths.get(fullUploadDir);
        
        // Create directories if they don't exist
        if (!Files.exists(uploadPath)) {
            logger.info("Creating upload directory: {}", uploadPath);
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFilename = UUID.randomUUID().toString() + extension;
        
        // Save file
        Path filePath = uploadPath.resolve(newFilename);
        logger.info("Saving file to: {}", filePath);
        Files.copy(file.getInputStream(), filePath);
        
        // Return the URL to access the file
        String imageUrl = "/uploads/" + profileImagesDir + newFilename;
        logger.info("File uploaded successfully. URL: {}", imageUrl);
        return imageUrl;
    }
} 