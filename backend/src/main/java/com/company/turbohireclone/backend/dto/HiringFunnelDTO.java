package com.company.turbohireclone.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HiringFunnelDTO {
    private long shortlisted;
    private long round1;
    private long round2;
    private long round3;
    private long hired;
}