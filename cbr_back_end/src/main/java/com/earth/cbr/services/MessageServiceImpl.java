package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Message;
import com.earth.cbr.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

	@Override
	public List<Message> getAllMessages() {
		return messageRepository.findAll();
	}

	@Override
	public Message getMessageById(Long id) {
		Optional<Message> messageOptional = messageRepository.findById(id);
        Message message = messageOptional.get();
		return message;
	}

	@Override
	public Message addMessage(JSONObject payload) {
		Long messageWorkerId = (Long) payload.get("worker_id");
        java.sql.Date messageDate = formatDate((String) payload.get("date"));
        String messageMessage = (String) payload.get("message");
        int messagePriority = (int) payload.get("priority");
		Message message = new Message(messageWorkerId, messageDate, messageMessage, messagePriority);
        return messageRepository.save(message);

	}

    @Override
	public Message updateMessageById(Long id, JSONObject payload) {
        Long messageWorkerId = (Long) payload.get("worker_id");
        java.sql.Date messageDate = formatDate((String) payload.get("date"));
        String messageMessage = (String) payload.get("message");
        int messagePriority = (int) payload.get("priority");

        Optional<Message> messageOptional = messageRepository.findById(id);
        Message message = messageOptional.get();

        message.setWorkerId(messageWorkerId);
        message.setDate(messageDate);
        message.setMessage(messageMessage);
        message.setPriority(messagePriority);
        return messageRepository.save(message);
	}

	@Override
	public void deleteMessageById(Long id) {
		messageRepository.deleteById(id);
		
	}

    public java.sql.Date formatDate(String date) {
        Date longDate = null;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            longDate = dateFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        java.sql.Date sqlDate = new java.sql.Date(longDate.getTime());

        return sqlDate;
    }

    
}
