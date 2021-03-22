package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.Survey;

import java.util.List;
import java.util.Optional;

public interface SurveyRepository {
    Survey save(Survey survey);
    List<Survey> findAll();
    Optional<Survey> findById(Long id);
}
