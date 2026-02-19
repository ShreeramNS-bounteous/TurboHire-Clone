package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.admin.CreateUserRequest;
import com.company.turbohireclone.backend.entity.Role;
import com.company.turbohireclone.backend.entity.User;
import com.company.turbohireclone.backend.repository.RoleRepository;
import com.company.turbohireclone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // 1️⃣ Create USER (Employee by default)
    public Long createUser(CreateUserRequest req) {

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("USER role not found"));

        User user = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(userRole)
                .status("ACTIVE")
                .build();

        userRepository.save(user);
        return user.getId();
    }

    // 2️⃣ Assign role (USER → RECRUITER)
    public void assignRole(Long userId, String roleName) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        userRepository.save(user);
    }
}
