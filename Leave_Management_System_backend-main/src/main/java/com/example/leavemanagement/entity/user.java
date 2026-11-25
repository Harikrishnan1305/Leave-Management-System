package com.example.leavemanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class user {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
	String name;
	String email;
	String password;
	String role;
	String designation;
	String department;
	String mobileNo;
	String whatsappNo;

	public user() {
		super();
	}

	public user(String name, String email, String password, String role, String designation, String department, String mobileNo, String whatsappNo) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
		this.designation = designation;
		this.department = department;
		this.mobileNo = mobileNo;
		this.whatsappNo = whatsappNo;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
