package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.LoginRequest;
import com.example.leavemanagement.dto.LoginResponse;
import com.example.leavemanagement.dto.RegisterRequest;
import com.example.leavemanagement.entity.user;
import com.example.leavemanagement.repository.userrepository;

import com.example.leavemanagement.exception.BadRequestException;
import com.example.leavemanagement.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final userrepository userRepository;

    public AuthService(userrepository userRepository) {
        this.userRepository = userRepository;
    }

    public user register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        user user = new user();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("EMPLOYEE");
        user.setDesignation(request.getDesignation() != null ? request.getDesignation() : "Associate");
        user.setDepartment(request.getDepartment() != null ? request.getDepartment() : "General");
        user.setMobileNo(request.getMobileNo());
        user.setWhatsappNo(request.getWhatsappNo());

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        user user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Invalid email or password"));

        // Check password
        if (!user.getPassword().equals(request.getPassword())) {
            throw new BadRequestException(
                    "Invalid email or password");
        }

        return new LoginResponse(
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getDesignation(),
                user.getDepartment(),
                user.getMobileNo(),
                user.getWhatsappNo());
    }
}