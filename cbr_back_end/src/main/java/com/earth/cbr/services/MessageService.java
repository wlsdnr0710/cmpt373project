package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Message;

import java.util.List;

public interface MessageService {
    List<Message> getAllMessages();
    Message getMessageById(Long id);
    Message addMessage(JSONObject payload);
    Message updateMessageById(Long id, JSONObject payload);
    void deleteMessageById(Long id);
}
