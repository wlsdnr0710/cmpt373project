package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.Survey;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class SurveyRepositoryImpl implements SurveyRepository {
    // TODO: Replace the mock up implementation with JPA implementation
    private Map<Long, Survey> database = new HashMap<>();
    private Long id = -1l;

    @Override
    public Survey save(Survey survey) {
        incrementId();
        database.put(id, survey);
        survey.setId(id);
        return survey;
    }

    private void incrementId() {
        id++;
    }

    @Override
    public List<Survey> findAll() {
        Collection<Survey> surveyCollection = database.values();
        return new ArrayList<>(surveyCollection);
    }

    @Override
    public Optional<Survey> findById(Long id) {
        Survey survey = database.get(id);
        if (survey == null) {
            return Optional.empty();
        }
        return Optional.of(survey);
    }
}
