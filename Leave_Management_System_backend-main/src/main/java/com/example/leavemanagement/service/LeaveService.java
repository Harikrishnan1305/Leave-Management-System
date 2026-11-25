package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.LeaveRequestDto;
import com.example.leavemanagement.entity.LeaveRequest;
import com.example.leavemanagement.entity.user;
import com.example.leavemanagement.exception.BadRequestException;
import com.example.leavemanagement.exception.ResourceNotFoundException;
import com.example.leavemanagement.repository.LeaveRequestRepository;
import com.example.leavemanagement.repository.userrepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final userrepository userRepository;

    public LeaveService(
            LeaveRequestRepository leaveRequestRepository,
            userrepository userRepository) {

        this.leaveRequestRepository = leaveRequestRepository;
        this.userRepository = userRepository;
    }

    public LeaveRequest createLeave(LeaveRequestDto dto) {

        validateDates(dto);

        user employee = getEmployee(dto.getEmployeeId());

        LeaveRequest leaveRequest = new LeaveRequest();

        leaveRequest.setEmployee(employee);
        leaveRequest.setLeaveType(dto.getLeaveType());
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());
        leaveRequest.setReason(dto.getReason());

        leaveRequest.setStatus("PENDING");

        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getEmployeeLeaves(Long employeeId) {

        getEmployee(employeeId);

        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public List<LeaveRequest> getAllLeaves() {

        return leaveRequestRepository.findAll();
    }

    public LeaveRequest getLeaveById(Long id) {

        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Leave request not found"));
    }

    public LeaveRequest updateLeave(
            Long id,
            LeaveRequestDto dto) {

        validateDates(dto);

        LeaveRequest leaveRequest = getLeaveById(id);

        if (!"PENDING".equals(leaveRequest.getStatus())) {

            throw new BadRequestException(
                    "Only pending leave can be edited");
        }

        user employee = getEmployee(dto.getEmployeeId());

        if (!leaveRequest.getEmployee().getId()
                .equals(employee.getId())) {

            throw new BadRequestException(
                    "You can edit only your own leave request");
        }

        leaveRequest.setLeaveType(dto.getLeaveType());
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());
        leaveRequest.setReason(dto.getReason());

        return leaveRequestRepository.save(leaveRequest);
    }

    public void cancelLeave(Long id, Long employeeId) {

        LeaveRequest leaveRequest = getLeaveById(id);

        if (!leaveRequest.getEmployee().getId()
                .equals(employeeId)) {

            throw new BadRequestException(
                    "You can cancel only your own leave request");
        }

        if (!"PENDING".equals(leaveRequest.getStatus())) {

            throw new BadRequestException(
                    "Only pending leave can be cancelled");
        }

        leaveRequestRepository.delete(leaveRequest);
    }

    public LeaveRequest approveLeave(Long id) {

        LeaveRequest leaveRequest = getLeaveById(id);

        if (!"PENDING".equals(leaveRequest.getStatus())) {

            throw new BadRequestException(
                    "Only pending leave can be approved");
        }

        leaveRequest.setStatus("APPROVED");

        return leaveRequestRepository.save(leaveRequest);
    }

    public LeaveRequest rejectLeave(Long id) {

        LeaveRequest leaveRequest = getLeaveById(id);

        if (!"PENDING".equals(leaveRequest.getStatus())) {

            throw new BadRequestException(
                    "Only pending leave can be rejected");
        }

        leaveRequest.setStatus("REJECTED");

        return leaveRequestRepository.save(leaveRequest);
    }

    private user getEmployee(Long employeeId) {

        user employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found"));

        if (!"EMPLOYEE".equals(employee.getRole())) {

            throw new BadRequestException(
                    "User is not an employee");
        }

        return employee;
    }

    private void validateDates(LeaveRequestDto dto) {

        if (dto.getStartDate() == null ||
                dto.getEndDate() == null) {

            throw new BadRequestException(
                    "Start date and end date are required");
        }

        if (dto.getStartDate()
                .isAfter(dto.getEndDate())) {

            throw new BadRequestException(
                    "Start date cannot be after end date");
        }
    }
}