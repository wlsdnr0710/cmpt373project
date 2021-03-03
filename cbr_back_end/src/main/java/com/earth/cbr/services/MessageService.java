package com.earth.cbr.services;

import com.earth.cbr.models.Message;

import javax.validation.Valid;
import java.util.List;

public interface MessageService {
    List<Message> getAllMessages();
    Message getMessageById(Long id);
    Message addMessage(@Valid Message message);
    Message updateMessage(@Valid Message message);
    void deleteMessageById(Long id);
}
