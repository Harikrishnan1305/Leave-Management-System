package com.example.leavemanagement.dto;

public class LoginResponse {

    String message;
    Long id;
    String name;
    String email;
    String role;
    String designation;
    String department;
    String mobileNo;
    String whatsappNo;

    public LoginResponse() {
    }

    public LoginResponse(
            String message,
            Long id,
            String name,
            String email,
            String role,
            String designation,
            String department,
            String mobileNo,
            String whatsappNo) {

        this.message = message;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.designation = designation;
        this.department = department;
        this.mobileNo = mobileNo;
        this.whatsappNo = whatsappNo;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getWhatsappNo() {
        return whatsappNo;
    }

    public void setWhatsappNo(String whatsappNo) {
        this.whatsappNo = whatsappNo;
    }
}