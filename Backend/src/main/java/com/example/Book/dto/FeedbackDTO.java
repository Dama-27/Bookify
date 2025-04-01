package com.example.Book.dto;

import java.util.Date;

public class FeedbackDTO {
    private Long consumerId;
    private String comments;
    private int rating;
    private Date responseDate;
    private Long bookingId;

    public FeedbackDTO() {}

    public FeedbackDTO(Long consumerId, Long bookingId, String comments, int rating, Date responseDate) {
        this.consumerId = consumerId;
        this.bookingId = bookingId;
        this.comments = comments;
        this.rating = rating;
        this.responseDate = responseDate;
    }

    public Long getConsumerId() { return consumerId; }
    public void setConsumerId(Long consumerId) { this.consumerId = consumerId; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public Date getResponseDate() { return responseDate; }
    public void setResponseDate(Date responseDate) { this.responseDate = responseDate; }
}
