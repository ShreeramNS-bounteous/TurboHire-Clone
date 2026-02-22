package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.admin.CreateUserRequest;
import com.company.turbohireclone.backend.entity.BusinessUnit;
import com.company.turbohireclone.backend.entity.Role;
import com.company.turbohireclone.backend.entity.User;
import com.company.turbohireclone.backend.notification.NotificationService;
import com.company.turbohireclone.backend.repository.BURepository;
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
    private final NotificationService notificationService;
    private final BURepository businessUnitRepository;

    public Long createUser(CreateUserRequest req) {

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("USER role not found"));

        BusinessUnit businessUnit = businessUnitRepository
                .findById(req.getBusinessUnitId())
                .orElseThrow(() -> new RuntimeException("Business Unit not found"));

        User user = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(userRole)
                .businessUnit(businessUnit)   // ✅ CORRECT
                .status("ACTIVE")
                .build();

        userRepository.save(user);
        return user.getId();
    }

    // 2️⃣ Assign role (USER → RECRUITER)
    public void assignRole(Long userId, String roleName) {

        // 1️⃣ Fetch user from DB
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Fetch role entity
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // 3️⃣ Assign new role
        user.setRole(role);

        // 4️⃣ If role is RECRUITER → activate account
        if ("RECRUITER".equalsIgnoreCase(roleName)) {

            // Generate temporary password
            String tempPassword = generateTemporaryPassword();

            // Encode and override old password
            user.setPassword(passwordEncoder.encode(tempPassword));

            user.setPasswordTemporary(true);

            // Send activation email
            notificationService.notifyRecruiterActivated(
                    user.getFullName(),
                    user.getEmail(),
                    tempPassword
            );
        }

        userRepository.save(user);
    }

    private String generateTemporaryPassword() {

        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        StringBuilder password = new StringBuilder();
        java.util.Random random = new java.util.Random();

        for (int i = 0; i < 10; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }

        return password.toString();
    }
}
