package com.example.leavemanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.leavemanagement.entity.*;
public interface userrepository extends JpaRepository<user,Long> {
	
	Optional<user> findByEmail(String email);

    boolean existsByEmail(String email);
	
}
