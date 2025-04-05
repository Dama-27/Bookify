//package com.example.Book.FileUploadTest;
//
//import com.example.Book.controller.FileUploadController;
//import com.example.Book.service.FileUploadService;
//import com.example.Book.service.JWTService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.*;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.Map;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class FileUploadControllerTest {
//
//    @InjectMocks
//    private FileUploadController fileUploadController;
//
//    @Mock
//    private FileUploadService fileUploadService;
//
//    @Mock
//    private JWTService jwtService;
//
//    @Mock
//    private MultipartFile file;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testUploadProfileImage_Success() throws IOException {
//        String token = "Bearer valid_token";
//        String email = "test@example.com";
//        String imageUrl = "http://example.com/image.jpg";
//
//        // Mock JWT service to return the email from the token
//        when(jwtService.extractUserName("valid_token")).thenReturn(email);
//
//        // Mock the file upload service to return the image URL
//        when(fileUploadService.uploadFile(file)).thenReturn(imageUrl);
//
//        // Call the controller method
//        ResponseEntity<?> response = fileUploadController.uploadProfileImage(token, file);
//
//        // Assert the response status and body
//        assertEquals(200, response.getStatusCodeValue());
//        assertTrue(((Map<?, ?>) response.getBody()).containsKey("imageUrl"));
//        assertEquals(imageUrl, ((Map<?, ?>) response.getBody()).get("imageUrl"));
//
//        // Verify that the JWT service and file upload service methods were called
//        verify(jwtService, times(1)).extractUserName("valid_token");
//        verify(fileUploadService, times(1)).uploadFile(file);
//    }
//
//    @Test
//    public void testUploadProfileImage_InvalidToken() {
//        String token = "Bearer invalid_token";
//
//        // Mock JWT service to return null (invalid token)
//        when(jwtService.extractUserName("invalid_token")).thenReturn(null);
//
//        // Call the controller method
//        ResponseEntity<?> response = fileUploadController.uploadProfileImage(token, file);
//
//        // Assert the response status and body
//        assertEquals(401, response.getStatusCodeValue());
//        assertEquals("Invalid token - could not extract user information", response.getBody());
//
//        // Verify the JWT service method was called
//        verify(jwtService, times(1)).extractUserName("invalid_token");
//    }
//
//    @Test
//    public void testUploadProfileImage_MissingToken() {
//        String token = "";
//
//        // Call the controller method
//        ResponseEntity<?> response = fileUploadController.uploadProfileImage(token, file);
//
//        // Assert the response status and body
//        assertEquals(401, response.getStatusCodeValue());
//        assertEquals("No token provided", response.getBody());
//    }
//
//    @Test
//    public void testUploadProfileImage_InvalidTokenFormat() {
//        String token = "invalid_token_format";
//
//        // Call the controller method
//        ResponseEntity<?> response = fileUploadController.uploadProfileImage(token, file);
//
//        // Assert the response status and body
//        assertEquals(401, response.getStatusCodeValue());
//        assertEquals("Invalid token format - missing Bearer prefix", response.getBody());
//    }
//
//    @Test
//    public void testUploadProfileImage_Failure() throws IOException {
//        String token = "Bearer valid_token";
//        String email = "test@example.com";
//
//        // Mock JWT service to return the email from the token
//        when(jwtService.extractUserName("valid_token")).thenReturn(email);
//
//        // Mock the file upload service to throw an exception
//        when(fileUploadService.uploadFile(file)).thenThrow(new RuntimeException("Upload failed"));
//
//        // Call the controller method
//        ResponseEntity<?> response = fileUploadController.uploadProfileImage(token, file);
//
//        // Assert the response status and body
//        assertEquals(400, response.getStatusCodeValue());
//        assertEquals("Failed to upload image: Upload failed", response.getBody());
//    }
//}
