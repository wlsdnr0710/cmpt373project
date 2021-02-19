package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Message;
import com.earth.cbr.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
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
	public Message addMessage(Message message) {
        return messageRepository.save(message);
	}

    @Override
	public Message updateMessageById(Long id, Message message) {
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
