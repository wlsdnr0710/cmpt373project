package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.AnsweredSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnsweredSurveyRepository extends JpaRepository<AnsweredSurvey, Long> {
}
