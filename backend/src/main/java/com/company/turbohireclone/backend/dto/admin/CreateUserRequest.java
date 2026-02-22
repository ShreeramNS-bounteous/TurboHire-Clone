package com.company.turbohireclone.backend.dto.admin;

import lombok.Data;

@Data
public class CreateUserRequest {

    private String fullName;
    private String email;
    private String password;
    private Long businessUnitId; //error
}
