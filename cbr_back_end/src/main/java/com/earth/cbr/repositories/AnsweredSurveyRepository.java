package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.AnsweredSurvey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnsweredSurveyRepository extends JpaRepository<AnsweredSurvey, Long> {
}
