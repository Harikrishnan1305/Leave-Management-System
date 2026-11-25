package com.example.leavemanagement.config;

import com.example.leavemanagement.entity.user;
import com.example.leavemanagement.repository.userrepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdmin(userrepository userRepository) {

        return args -> {

            if (!userRepository.existsByEmail("admin@123.com")) {

                user admin = new user();

                admin.setName("Admin");
                admin.setEmail("admin@123.com");
                admin.setPassword("admin123");
                admin.setRole("ADMIN");
                admin.setDesignation("HR Administrator");
                admin.setDepartment("Human Resources");
                admin.setMobileNo("+91 9876543210");
                admin.setWhatsappNo("+91 9876543210");

                userRepository.save(admin);

                System.out.println("Default admin created successfully.");
            } else {

                System.out.println("Admin already exists.");
            }
        };
    }
}