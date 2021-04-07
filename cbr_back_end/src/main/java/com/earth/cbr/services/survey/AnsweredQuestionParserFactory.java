package com.earth.cbr.services.survey;

public interface AnsweredQuestionParserFactory {
    AnsweredQuestionParser buildMultipleChoiceParser();
    AnsweredQuestionParser buildYesOrNoParser();
    AnsweredQuestionParser buildDropdownParser();
    AnsweredQuestionParser buildWrittenParser();
}
