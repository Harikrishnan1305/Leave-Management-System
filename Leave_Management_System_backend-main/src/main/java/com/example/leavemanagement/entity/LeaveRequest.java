package com.example.leavemanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="leave_request")
public class LeaveRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@ManyToOne
	@JoinColumn(name = "employee_id")
	user employee;
	String leaveType;
	LocalDate startDate;
	LocalDate endDate;
	String reason;
	String status;
		public LeaveRequest() {
			super();
			// TODO Auto-generated constructor stub
		}
		public LeaveRequest(user employee, String leaveType, LocalDate startDate, LocalDate endDate, String reason,
				String status) {
			super();
			this.employee = employee;
			this.leaveType = leaveType;
			this.startDate = startDate;
			this.endDate = endDate;
			this.reason = reason;
			this.status = status;
		}
		public Long getId() {
		return id;
		}
		public void setId(Long id) {
		this.id = id;
		}
		public user getEmployee() {
		return employee;
		}
		public void setEmployee(user employee) {
		this.employee = employee;
		}
		public String getLeaveType() {
		return leaveType;
		}
		public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
		}
		public LocalDate getStartDate() {
		return startDate;
		}
		public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
		}
		public LocalDate getEndDate() {
		return endDate;
		}
		public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
		}
		public String getReason() {
		return reason;
		}
		public void setReason(String reason) {
		this.reason = reason;
		}
		public String getStatus() {
		return status;
		}
		public void setStatus(String status) {
		this.status = status;
		}

	
}
