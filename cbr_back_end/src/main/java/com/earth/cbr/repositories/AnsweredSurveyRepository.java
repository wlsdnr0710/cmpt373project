package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.AnsweredSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnsweredSurveyRepository extends JpaRepository<AnsweredSurvey, Long> {
    List<AnsweredSurvey> findAllByClient_Id(Long clientId);
}
