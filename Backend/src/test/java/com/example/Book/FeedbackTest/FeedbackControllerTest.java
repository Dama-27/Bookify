package com.example.Book.FeedbackTest;

import com.example.Book.controller.FeedbackController;
import com.example.Book.dto.FeedbackDTO;
import com.example.Book.service.FeedbackService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FeedbackControllerTest {

    @InjectMocks
    private FeedbackController feedbackController;

    @Mock
    private FeedbackService feedbackService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddFeedback_Success() {
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setComments("Great service!");

        when(feedbackService.saveFeedback(feedbackDTO)).thenReturn(feedbackDTO);

        FeedbackDTO response = feedbackController.addFeedback(feedbackDTO);

        assertNotNull(response);
        assertEquals("Great service!", response.getComments());
        verify(feedbackService, times(1)).saveFeedback(feedbackDTO);
    }

    @Test
    public void testGetAllFeedback_Success() {
        FeedbackDTO feedback1 = new FeedbackDTO();
        feedback1.setComments("Great service!");

        FeedbackDTO feedback2 = new FeedbackDTO();
        feedback2.setComments("Could be better.");

        List<FeedbackDTO> feedbackList = Arrays.asList(feedback1, feedback2);

        when(feedbackService.getAllFeedback()).thenReturn(feedbackList);

        List<FeedbackDTO> response = feedbackController.getAllFeedback();

        assertNotNull(response);
        assertEquals(2, response.size());
        assertEquals("Great service!", response.get(0).getComments());
        assertEquals("Could be better.", response.get(1).getComments());
        verify(feedbackService, times(1)).getAllFeedback();
    }

    @Test
    public void testGetAllFeedback_EmptyList() {
        List<FeedbackDTO> feedbackList = new ArrayList<>();

        when(feedbackService.getAllFeedback()).thenReturn(feedbackList);

        List<FeedbackDTO> response = feedbackController.getAllFeedback();

        assertNotNull(response);
        assertTrue(response.isEmpty());
        verify(feedbackService, times(1)).getAllFeedback();
    }
}

