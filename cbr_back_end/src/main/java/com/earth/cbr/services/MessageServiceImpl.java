package com.earth.cbr.services;

import com.earth.cbr.models.Message;
import com.earth.cbr.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
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
        Message message = messageOptional.orElse(null);
		return message;
	}

	@Override
	public Message addMessage(@Valid Message message) {
        return messageRepository.save(message);
	}

    @Override
	public Message updateMessageById(@Valid Message message) {
        return messageRepository.save(message);
	}

	@Override
	public void deleteMessageById(Long id) {
		messageRepository.deleteById(id);
	}
}
