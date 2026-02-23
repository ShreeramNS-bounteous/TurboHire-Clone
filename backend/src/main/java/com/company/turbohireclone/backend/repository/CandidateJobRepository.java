package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.CandidateJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateJobRepository extends JpaRepository<CandidateJob, Long> {

    // READ for frontend
    List<CandidateJob> findByCandidate_Id(Long candidateId);

    List<CandidateJob> findByJob_Id(Long jobId);

    List<CandidateJob> findByCurrentStageAndStatus(
            String currentStage,
            String status
    );

    List<CandidateJob> findByStatus(String status);

    long countByStatus(String status);

    long countByJobId(Long jobId);

    long countByJobIdAndStatus(Long jobId, String status);

    long countByCurrentStage(String stage);

    @Query("""
SELECT to_char(c.offerAcceptedAt, 'YYYY-MM') as month, count(c)
FROM CandidateJob c
WHERE c.offerAcceptedAt IS NOT NULL
GROUP BY month
ORDER BY month
""")
    List<Object[]> hiresPerMonth();


    @Query("""
SELECT to_char(c.appliedAt, 'YYYY-MM') as month, count(c)
FROM CandidateJob c
GROUP BY month
ORDER BY month
""")
    List<Object[]> candidatesPerMonth();
}
