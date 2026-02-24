package com.portfolio.leadmanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.leadmanager.model.Lead;
import com.portfolio.leadmanager.repository.LeadRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*") // This is necessary so that JS can consume the API without the browser blocking it for security reasons (CORS).
public class LeadController {

    private final LeadRepository leadRepository;

    public LeadController(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    // 1. GET: List all leads
    @GetMapping
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    // 2. POST: Create new prospect
    @PostMapping
    public ResponseEntity<Lead> createLead(@Valid @RequestBody Lead lead) {
        Lead newLead = leadRepository.save(lead);
        return new ResponseEntity<>(newLead, HttpStatus.CREATED); // Returns 201 Created
    }

    // 3. PUT: Update existing lead status
    @PutMapping("/{id}")
    public ResponseEntity<Lead> updateLeadStatus(@PathVariable Long id, @RequestBody Lead leadDetails) {
        return leadRepository.findById(id)
                .map(lead -> {
                    lead.setStatus(leadDetails.getStatus()); // Only update the status field
                    Lead updatedLead = leadRepository.save(lead);
                    return ResponseEntity.ok(updatedLead);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. DELETE: Delete lead
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        if (leadRepository.existsById(id)) {
            leadRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        }
        return ResponseEntity.notFound().build(); // Returns 404 if it doesn't exist
    }
}