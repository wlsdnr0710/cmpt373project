package com.earth.cbr.services;

import com.earth.cbr.models.Message;

import java.util.List;

public interface MessageService {
    List<Message> getAllMessages();
    Message getMessageById(Long id);
    Message addMessage(Message message);
    Message updateMessageById(Message message);
    void deleteMessageById(Long id);
}
