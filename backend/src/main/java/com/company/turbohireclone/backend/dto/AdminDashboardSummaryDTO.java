package com.company.turbohireclone.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardSummaryDTO {
    private long totalJobs;
    private long activeJobs;
    private long closedJobs;

    private long totalCandidatesInPipeline;
    private long totalCandidatesHired;
    private long totalCandidatesRejected;

    private long totalInterviewsScheduled;
    private long totalInterviewsCompleted;
}
