package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.SurveyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<SurveyQuestion, Long> {
}
