package com.earth.cbr.services.survey;

import com.earth.cbr.repositories.SurveyQuestionOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AnsweredQuestionParserFactoryImpl implements AnsweredQuestionParserFactory {

    @Autowired
    private SurveyQuestionOptionRepository surveyQuestionOptionRepository;

    @Override
    public AnsweredQuestionParser buildMultipleChoiceParser() {
        return new MultipleChoiceAnsweredQuestionParser(surveyQuestionOptionRepository);
    }

    @Override
    public AnsweredQuestionParser buildYesOrNoParser() {
        return new YesOrNoAnsweredQuestionParser();
    }

    @Override
    public AnsweredQuestionParser buildDropdownParser() {
        return new DropdownAnsweredQuestionParser(surveyQuestionOptionRepository);
    }

    @Override
    public AnsweredQuestionParser buildWrittenParser() {
        return new WrittenAnsweredQuestionParser();
    }
}
