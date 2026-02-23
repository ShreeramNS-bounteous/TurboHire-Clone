package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.*;
import com.company.turbohireclone.backend.entity.Job;
import com.company.turbohireclone.backend.repository.CandidateJobRepository;
import com.company.turbohireclone.backend.repository.InterviewRepository;
import com.company.turbohireclone.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {
    private final JobRepository jobRepository;
    private final CandidateJobRepository candidateJobRepository;
    private final InterviewRepository interviewRepository;

    @Override
    public AdminDashboardSummaryDTO getAdminDashboardSummary() {
        long totalJobs = jobRepository.count();
        long activeJobs = jobRepository.countByStatus("OPEN");
        long closedJobs = jobRepository.countByStatus("CLOSED");

        long totalCandidates = candidateJobRepository.count();
        long hired = candidateJobRepository.countByStatus("HIRED");
        long rejected = candidateJobRepository.countByStatus("REJECTED");

        long scheduledInterviews = interviewRepository.count();
        long completedInterviews = interviewRepository.countByStatus("COMPLETED");

        return AdminDashboardSummaryDTO.builder()
                .totalJobs(totalJobs)
                .activeJobs(activeJobs)
                .closedJobs(closedJobs)
                .totalCandidatesInPipeline(totalCandidates)
                .totalCandidatesHired(hired)
                .totalCandidatesRejected(rejected)
                .totalInterviewsScheduled(scheduledInterviews)
                .totalInterviewsCompleted(completedInterviews)
                .build();
    }

    @Override
    public List<JobAnalyticsDTO> getJobAnalytics() {
        return jobRepository.findAll().stream().map(job -> {

            Long jobId = job.getId();

            long totalCandidates = candidateJobRepository.countByJobId(jobId);
            long hired = candidateJobRepository.countByJobIdAndStatus(jobId, "HIRED");
            long rejected = candidateJobRepository.countByJobIdAndStatus(jobId, "REJECTED");
            long active = candidateJobRepository.countByJobIdAndStatus(jobId, "IN_PROGRESS");

            long interviews = interviewRepository.countByCandidateJob_Job_Id(jobId);

            return JobAnalyticsDTO.builder()
                    .jobId(jobId)
                    .jobTitle(job.getTitle())
                    .businessUnitId(job.getBusinessUnit().getId())
                    .jobStatus(job.getStatus())
                    .totalCandidates(totalCandidates)
                    .hiredCandidates(hired)
                    .rejectedCandidates(rejected)
                    .activeCandidates(active)
                    .interviewsConducted(interviews)
                    .build();

        }).toList();
    }

    @Override
    public List<JobAnalyticsDTO> getJobAnalytics(JobAnalyticsFilterDTO filter) {
        return jobRepository.findAll().stream()
                .filter(job -> {

                    if (filter.getBusinessUnitId() != null &&
                            !job.getBusinessUnit().getId().equals(filter.getBusinessUnitId()))
                        return false;

//                    if (filter.getRecruiterId() != null &&
//                            !job.getCreatedBy().equals(filter.getRecruiterId()))
//                        return false;

                    if (filter.getJobStatus() != null &&
                            !job.getStatus().equalsIgnoreCase(filter.getJobStatus()))
                        return false;

                    if (filter.getJobTitleContains() != null &&
                            !job.getTitle().toLowerCase()
                                    .contains(filter.getJobTitleContains().toLowerCase()))
                        return false;

                    if (filter.getCreatedAfter() != null &&
                            job.getCreatedAt().toLocalDate().isBefore(filter.getCreatedAfter()))
                        return false;

                    if (filter.getCreatedBefore() != null &&
                            job.getCreatedAt().toLocalDate().isAfter(filter.getCreatedBefore()))
                        return false;

                    return true;
                })
                .map(job -> buildJobAnalytics(job))
                .toList();
    }

    @Override
    public HiringFunnelDTO getHiringFunnel() {
        long shortlisted = candidateJobRepository.countByCurrentStage("SHORTLISTED");
        long round1 = candidateJobRepository.countByCurrentStage("ROUND_1");
        long round2 = candidateJobRepository.countByCurrentStage("ROUND_2");
        long round3 = candidateJobRepository.countByCurrentStage("ROUND_3");
        long hired = candidateJobRepository.countByStatus("HIRED");

        return HiringFunnelDTO.builder()
                .shortlisted(shortlisted)
                .round1(round1)
                .round2(round2)
                .round3(round3)
                .hired(hired)
                .build();
    }

    @Override
    public InterviewMetricsDTO getInterviewMetrics() {
        long scheduled = interviewRepository.countByStatus("SCHEDULED");
        long completed = interviewRepository.countByStatus("COMPLETED");
        long noShow = interviewRepository.countByStatus("NO_SHOW");

        double noShowRate = scheduled == 0 ? 0 : (double) noShow / scheduled;

        return InterviewMetricsDTO.builder()
                .scheduled(scheduled)
                .completed(completed)
                .noShow(noShow)
                .noShowRate(noShowRate)
                .build();
    }

    @Override
    public TimeAnalyticsDTO getTimeAnalytics() {
        List<MonthlyTrendPointDTO> hires =
                candidateJobRepository.hiresPerMonth().stream()
                        .map(r -> new MonthlyTrendPointDTO((String) r[0], (Long) r[1]))
                        .toList();

        List<MonthlyTrendPointDTO> candidates =
                candidateJobRepository.candidatesPerMonth().stream()
                        .map(r -> new MonthlyTrendPointDTO((String) r[0], (Long) r[1]))
                        .toList();

        List<MonthlyTrendPointDTO> interviews =
                interviewRepository.interviewsPerMonth().stream()
                        .map(r -> new MonthlyTrendPointDTO((String) r[0], (Long) r[1]))
                        .toList();

        return TimeAnalyticsDTO.builder()
                .hiresPerMonth(hires)
                .candidatesPerMonth(candidates)
                .interviewsPerMonth(interviews)
                .build();
    }

    private JobAnalyticsDTO buildJobAnalytics(Job job) {

        Long jobId = job.getId();

        long totalCandidates = candidateJobRepository.countByJobId(jobId);
        long hired = candidateJobRepository.countByJobIdAndStatus(jobId, "HIRED");
        long rejected = candidateJobRepository.countByJobIdAndStatus(jobId, "REJECTED");
        long active = candidateJobRepository.countByJobIdAndStatus(jobId, "IN_PROGRESS");

        long interviews = interviewRepository.countByCandidateJob_Job_Id(jobId);

        return JobAnalyticsDTO.builder()
                .jobId(jobId)
                .jobTitle(job.getTitle())
                .businessUnitId(job.getBusinessUnit().getId())
                .jobStatus(job.getStatus())
                .totalCandidates(totalCandidates)
                .hiredCandidates(hired)
                .rejectedCandidates(rejected)
                .activeCandidates(active)
                .interviewsConducted(interviews)
                .build();
    }
}
