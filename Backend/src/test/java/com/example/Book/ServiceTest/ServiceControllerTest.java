//package com.example.Book.ServiceTest;
//
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//
//import com.example.Book.controller.ServiceController;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import com.example.Book.model.ServiceProvider;
//import com.example.Book.model.Services;
//import com.example.Book.repo.ServiceProviderRepository;
//import com.example.Book.repo.ServiceRepository;
//import com.example.Book.repo.ServiceDateTimeRepository;
//import com.example.Book.service.JWTService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//@WebMvcTest(ServiceController.class)
//public class ServiceControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Mock
//    private ServiceRepository serviceRepository;
//
//    @Mock
//    private ServiceProviderRepository serviceProviderRepository;
//
//    @Mock
//    private ServiceDateTimeRepository serviceDateTimeRepository;
//
//    @Mock
//    private JWTService jwtService;
//
//    private ServiceProvider provider;
//
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        objectMapper = new ObjectMapper();
//        provider = new ServiceProvider();
//        provider.setEmail("test@example.com");
//        provider.setUsername("testProvider");
//    }
//
//    @Test
//    public void testGetProviderServices() throws Exception {
//        String token = "Bearer validToken";
//
//        Services service = new Services();
//        service.setServiceId(1);
//        service.setName("Test Service");
//        service.setSpecialization("Test Specialization");
//        service.setPrice(100.0);
//        service.setDescription("Service Description");
//        service.setCategory("Test Category");
//
//        when(jwtService.extractUserName(token.substring(7))).thenReturn("test@example.com");
//        when(serviceProviderRepository.findByEmail("test@example.com")).thenReturn(Optional.of(provider));
//        when(serviceRepository.findByProvider(provider)).thenReturn(java.util.List.of(service));
//
//        mockMvc.perform(get("/api/service-providers/services")
//                        .header("Authorization", token))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].serviceId").value(1))
//                .andExpect(jsonPath("$[0].name").value("Test Service"))
//                .andExpect(jsonPath("$[0].specialization").value("Test Specialization"))
//                .andExpect(jsonPath("$[0].price").value(100.0));
//    }
//
//    @Test
//    public void testCreateService() throws Exception {
//        String token = "Bearer validToken";
//
//        Map<String, Object> serviceData = new HashMap<>();
//        serviceData.put("name", "New Service");
//        serviceData.put("specialization", "New Specialization");
//        serviceData.put("price", 120.0);
//        serviceData.put("description", "New Service Description");
//        serviceData.put("category", "New Category");
//        Map<String, String> workHours = new HashMap<>();
//        workHours.put("start", "09:00");
//        workHours.put("end", "18:00");
//        serviceData.put("workHours", workHours);
//        Map<String, Boolean> workingDays = new HashMap<>();
//        workingDays.put("Monday", true);
//        serviceData.put("workingDays", workingDays);
//
//        when(jwtService.extractUserName(token.substring(7))).thenReturn("test@example.com");
//        when(serviceProviderRepository.findByEmail("test@example.com")).thenReturn(Optional.of(provider));
//
//        Services savedService = new Services();
//        savedService.setServiceId(1);
//        savedService.setName("New Service");
//        when(serviceRepository.save(any(Services.class))).thenReturn(savedService);
//
//        mockMvc.perform(post("/api/service-providers/services")
//                        .header("Authorization", token)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(serviceData)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.serviceId").value(1))
//                .andExpect(jsonPath("$.name").value("New Service"));
//    }
//
//    @Test
//    public void testUpdateService() throws Exception {
//        String token = "Bearer validToken";
//
//        Map<String, Object> serviceData = new HashMap<>();
//        serviceData.put("name", "Updated Service");
//        serviceData.put("specialization", "Updated Specialization");
//        serviceData.put("price", 150.0);
//        serviceData.put("description", "Updated Service Description");
//        serviceData.put("category", "Updated Category");
//        Map<String, String> workHours = new HashMap<>();
//        workHours.put("start", "10:00");
//        workHours.put("end", "17:00");
//        serviceData.put("workHours", workHours);
//        Map<String, Boolean> workingDays = new HashMap<>();
//        workingDays.put("Tuesday", true);
//        serviceData.put("workingDays", workingDays);
//
//        Services service = new Services();
//        service.setServiceId(1);
//        service.setName("Updated Service");
//
//        when(jwtService.extractUserName(token.substring(7))).thenReturn("test@example.com");
//        when(serviceProviderRepository.findByEmail("test@example.com")).thenReturn(Optional.of(provider));
//        when(serviceRepository.findByProvider(provider)).thenReturn(java.util.List.of(service));
//        when(serviceRepository.save(any(Services.class))).thenReturn(service);
//
//        mockMvc.perform(put("/api/service-providers/services")
//                        .header("Authorization", token)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(serviceData)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.serviceId").value(1))
//                .andExpect(jsonPath("$.name").value("Updated Service"));
//    }
//}
