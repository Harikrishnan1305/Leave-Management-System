package com.example.leavemanagement.controller;

import com.example.leavemanagement.entity.LeaveRequest;
import com.example.leavemanagement.service.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final LeaveService leaveService;

    public AdminController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {

        List<LeaveRequest> leaves = leaveService.getAllLeaves();

        return ResponseEntity.ok(leaves);
    }

    @PutMapping("/leaves/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeave(
            @PathVariable Long id) {

        LeaveRequest leaveRequest = leaveService.approveLeave(id);

        return ResponseEntity.ok(leaveRequest);
    }

    @PutMapping("/leaves/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectLeave(
            @PathVariable Long id) {

        LeaveRequest leaveRequest = leaveService.rejectLeave(id);

        return ResponseEntity.ok(leaveRequest);
    }
}