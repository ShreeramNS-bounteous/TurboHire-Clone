package com.company.turbohireclone.backend.controller;

import com.company.turbohireclone.backend.dto.admin.AssignRoleRequest;
import com.company.turbohireclone.backend.dto.admin.CreateUserRequest;
import com.company.turbohireclone.backend.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public Long createUser(
            @RequestBody CreateUserRequest request
    ) {
        return adminService.createUser(request);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/users/{userId}/assign-role")
    public void assignRole(
            @PathVariable Long userId,
            @RequestBody AssignRoleRequest request
    ) {
        adminService.assignRole(userId, request.getRoleName());
    }
}
