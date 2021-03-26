package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.SurveyQuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionOptionRepository extends JpaRepository<SurveyQuestionOption, Long> {
}
