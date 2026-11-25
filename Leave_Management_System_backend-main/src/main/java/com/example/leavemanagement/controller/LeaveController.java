package com.example.leavemanagement.controller;

import com.example.leavemanagement.dto.LeaveRequestDto;
import com.example.leavemanagement.entity.LeaveRequest;
import com.example.leavemanagement.service.LeaveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

        private final LeaveService leaveService;

        public LeaveController(LeaveService leaveService) {
                this.leaveService = leaveService;
        }

        @PostMapping
        public ResponseEntity<LeaveRequest> createLeave(
                        @RequestBody LeaveRequestDto dto) {

                LeaveRequest leaveRequest = leaveService.createLeave(dto);

                return new ResponseEntity<>(
                                leaveRequest,
                                HttpStatus.CREATED);
        }

        @GetMapping("/employee/{employeeId}")
        public ResponseEntity<List<LeaveRequest>> getEmployeeLeaves(
                        @PathVariable Long employeeId) {

                List<LeaveRequest> leaves = leaveService.getEmployeeLeaves(employeeId);

                return ResponseEntity.ok(leaves);
        }

        @GetMapping("/{id}")
        public ResponseEntity<LeaveRequest> getLeaveById(
                        @PathVariable Long id) {

                LeaveRequest leaveRequest = leaveService.getLeaveById(id);

                return ResponseEntity.ok(leaveRequest);
        }

        @PutMapping("/{id}")
        public ResponseEntity<LeaveRequest> updateLeave(
                        @PathVariable Long id,
                        @RequestBody LeaveRequestDto dto) {

                LeaveRequest updatedLeave = leaveService.updateLeave(id, dto);

                return ResponseEntity.ok(updatedLeave);
        }

        @DeleteMapping("/{id}/employee/{employeeId}")
        public ResponseEntity<String> cancelLeave(
                        @PathVariable Long id,
                        @PathVariable Long employeeId) {

                leaveService.cancelLeave(id, employeeId);

                return ResponseEntity.ok(
                                "Leave request cancelled successfully");
        }
}