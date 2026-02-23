package com.company.turbohireclone.backend.controller;

import com.company.turbohireclone.backend.dto.*;
import com.company.turbohireclone.backend.services.AdminAnalyticsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AdminAnalyticsController {

    private final AdminAnalyticsServiceImpl adminAnalyticsServiceImpl;

    @GetMapping("/summary")
    public ResponseEntity<AdminDashboardSummaryDTO> getAdminDashboardSummary() {
        return ResponseEntity.ok(adminAnalyticsServiceImpl.getAdminDashboardSummary());
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<JobAnalyticsDTO>> getJobAnalytics() {
        return ResponseEntity.ok(adminAnalyticsServiceImpl.getJobAnalytics());
    }

    @GetMapping("/jobs/filter")
    public ResponseEntity<List<JobAnalyticsDTO>> filterJobAnalytics(
            @RequestParam(required = false) Long businessUnitId,
//            @RequestParam(required = false) Long recruiterId,
            @RequestParam(required = false) String jobStatus,
            @RequestParam(required = false) String jobTitleContains,
            @RequestParam(required = false) String createdAfter,
            @RequestParam(required = false) String createdBefore
    ) {

        JobAnalyticsFilterDTO filter = new JobAnalyticsFilterDTO();

        filter.setBusinessUnitId(businessUnitId);
//        filter.setRecruiterId(recruiterId);
        filter.setJobStatus(jobStatus);
        filter.setJobTitleContains(jobTitleContains);

        if (createdAfter != null)
            filter.setCreatedAfter(LocalDate.parse(createdAfter));

        if (createdBefore != null)
            filter.setCreatedBefore(LocalDate.parse(createdBefore));

        return ResponseEntity.ok(adminAnalyticsServiceImpl.getJobAnalytics(filter));
    }

    @GetMapping("/funnel")
    public ResponseEntity<HiringFunnelDTO> getHiringFunnel() {
        return ResponseEntity.ok(adminAnalyticsServiceImpl.getHiringFunnel());
    }

    @GetMapping("/interviews")
    public ResponseEntity<InterviewMetricsDTO> getInterviewMetrics() {
        return ResponseEntity.ok(adminAnalyticsServiceImpl.getInterviewMetrics());
    }

    @GetMapping("/trends")
    public ResponseEntity<TimeAnalyticsDTO> getTimeAnalytics() {
        return ResponseEntity.ok(adminAnalyticsServiceImpl.getTimeAnalytics());
    }
}