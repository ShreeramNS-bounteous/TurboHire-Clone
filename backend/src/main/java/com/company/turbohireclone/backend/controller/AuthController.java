package com.company.turbohireclone.backend.controller;

import com.company.turbohireclone.backend.dto.loginDto.LoginRequest;
import com.company.turbohireclone.backend.dto.loginDto.LoginResponse;
import com.company.turbohireclone.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * LOGIN API
     */
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        String token = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        return new LoginResponse(token);
    }
}
