package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.*;

import java.time.LocalDate;
import java.util.List;

public interface AdminAnalyticsService {
    AdminDashboardSummaryDTO getAdminDashboardSummary();

    List<JobAnalyticsDTO> getJobAnalytics();

    List<JobAnalyticsDTO> getJobAnalytics(JobAnalyticsFilterDTO filter);

    HiringFunnelDTO getHiringFunnel();

    InterviewMetricsDTO getInterviewMetrics();

    TimeAnalyticsDTO getTimeAnalytics();
}
