package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Client;
import com.earth.cbr.models.survey.*;
import com.earth.cbr.repositories.ClientRepository;
import com.earth.cbr.repositories.SurveyQuestionOptionRepository;
import com.earth.cbr.repositories.SurveyQuestionRepository;
import com.earth.cbr.repositories.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnsweredSurveyServiceImpl implements AnsweredSurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private SurveyQuestionRepository surveyQuestionRepository;

    @Autowired
    private SurveyQuestionOptionRepository surveyQuestionOptionRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private AnsweredQuestionParserFactory answeredQuestionParserFactory;

    private Map<SurveyQuestionType, AnsweredQuestionParser> questionParsers;

    public AnsweredSurveyServiceImpl(AnsweredQuestionParserFactory answeredQuestionParserFactory) {
        this.answeredQuestionParserFactory = answeredQuestionParserFactory;
        initQuestionParsers();
    }

    private void initQuestionParsers() {
        questionParsers = new HashMap<>();
        for (SurveyQuestionType type : SurveyQuestionType.values()) {
            switch (type) {
                case MULTIPLE_CHOICE:
                    questionParsers.put(SurveyQuestionType.MULTIPLE_CHOICE, answeredQuestionParserFactory.buildMultipleChoiceParser());
                    break;
                case YES_OR_NO:
                    questionParsers.put(SurveyQuestionType.YES_OR_NO, answeredQuestionParserFactory.buildYesOrNoParser());
                    break;
                case DROPDOWN:
                    questionParsers.put(SurveyQuestionType.DROPDOWN, answeredQuestionParserFactory.buildDropdownParser());
                    break;
                case WRITTEN:
                    questionParsers.put(SurveyQuestionType.WRITTEN, answeredQuestionParserFactory.buildWrittenParser());
                    break;
            }
        }
    }

    @Override
    public AnsweredSurvey buildAnsweredSurvey(JSONObject data) {
        Map<String, Object> surveyInputs = getSurveyInputsFromData(data);
        List<AnsweredQuestion> answeredQuestions = parseQuestions(surveyInputs);
        return buildAnsweredSurvey(data, answeredQuestions);
    }

    private Map<String, Object> getSurveyInputsFromData(JSONObject data) {
        return (Map<String, Object>) data.get("surveyInputs");
    }

    private List<AnsweredQuestion> parseQuestions(Map<String, Object> surveyInputs) {
        Set<String> questionIds = surveyInputs.keySet();
        List<AnsweredQuestion> answeredQuestions = new ArrayList<>();
        for (String questionIdString : questionIds) {
            JSONObject questionValueJSON = getQuestionJSON(surveyInputs, questionIdString);
            SurveyQuestion surveyQuestion = getSurveyQuestionById(questionIdString);
            AnsweredQuestion answeredQuestion = parseQuestion(surveyQuestion, questionValueJSON);
            answeredQuestions.add(answeredQuestion);
        }
        return answeredQuestions;
    }

    private JSONObject getQuestionJSON(Map<String, Object> surveyInputs, String questionIdString) {
        return new JSONObject((Map<String, Object>) surveyInputs.get(questionIdString));
    }

    private SurveyQuestion getSurveyQuestionById(String questionIdString) {
        Long questionId = Long.valueOf(questionIdString);
        Optional<SurveyQuestion> surveyQuestionOptional = surveyQuestionRepository.findById(questionId);
        return surveyQuestionOptional.get();
    }

    private AnsweredQuestion parseQuestion(SurveyQuestion surveyQuestion, JSONObject questionValueJSON) {
        SurveyQuestionType questionType = surveyQuestion.getType();
        AnsweredQuestionParser parser = questionParsers.get(questionType);
        return parser.parse(questionValueJSON, surveyQuestion);
    }

    private AnsweredSurvey buildAnsweredSurvey(JSONObject data, List<AnsweredQuestion> answeredQuestions) {
        AnsweredSurvey answeredSurvey = new AnsweredSurvey();
        answeredSurvey.setSurvey(getSurveyFromData(data));
        for (AnsweredQuestion answeredQuestion : answeredQuestions) {
            answeredQuestion.setAnsweredSurvey(answeredSurvey);
        }
        answeredSurvey.setAnsweredQuestions(new HashSet<>(answeredQuestions));
        answeredSurvey.setClient(getClientFromData(data));
        return answeredSurvey;
    }

    private Survey getSurveyFromData(JSONObject data) {
        long surveyId = (int) data.get("surveyId");
        return surveyRepository.findById(surveyId).orElse(null);
    }

    private Client getClientFromData(JSONObject data) {
        long clientId = (int) data.get("clientId");
        return clientRepository.findById(clientId).orElse(null);
    }
}
