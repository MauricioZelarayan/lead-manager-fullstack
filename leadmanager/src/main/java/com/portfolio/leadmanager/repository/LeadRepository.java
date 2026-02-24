package com.portfolio.leadmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.leadmanager.model.Lead;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    // With just this one line, Spring Boot already knows how to perform a complete CRUD operation on Leads.
}