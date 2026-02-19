package com.company.turbohireclone.backend.dto.candidatePortal;

import com.company.turbohireclone.backend.dto.interview.InterviewResponseDto;
import com.company.turbohireclone.backend.dto.offer.OfferResponse;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CandidatePortalResponse {

    private String candidateName;
    private String jobTitle;
    private String businessUnit;
    private String stage;
    private String status;

    private InterviewResponseDto interview;   // ✅ EXISTING DTO
    private OfferResponse offer;               // ✅ EXISTING DTO
}
