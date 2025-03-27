package com.example.Book.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "group_booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Integer groupId;

    @Column(name = "group_name")
    private String groupName;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private ServiceProvider provider;

    @ManyToOne
    @JoinColumn(name = "group_leader_id")
    private Consumer groupLeader;

    @Column(name = "no_of_members")
    private Integer noOfMembers;

    @Column(name = "max_capacity")
    private Integer maxCapacity;
}