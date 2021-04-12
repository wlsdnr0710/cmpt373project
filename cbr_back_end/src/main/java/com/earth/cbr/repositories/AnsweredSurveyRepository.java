package com.earth.cbr.repositories;

import com.earth.cbr.models.survey.AnsweredSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnsweredSurveyRepository extends JpaRepository<AnsweredSurvey, Long> {
    //TODO: will need to refactor this in the future to remove snake case. Unable to use camel case
    //      because of the AnsweredSurvey model, will need to redesign the model to fix this issue
    List<AnsweredSurvey> findAllByClient_Id(Long clientId);
}
