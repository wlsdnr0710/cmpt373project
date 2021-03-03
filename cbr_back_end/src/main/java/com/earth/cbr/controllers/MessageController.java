package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ObjectDoesNotExist;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Message;
import com.earth.cbr.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllMessages() {
        List<Message> messages = messageService.getAllMessages();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data",messages);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getMessageById(@PathVariable Long id) throws ObjectDoesNotExist {
        if(messageService.getMessageById(id) == null) {
            throw new ObjectDoesNotExist("Message with that ID does not exist");
        }

        Message message = messageService.getMessageById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", message);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addMessage(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject messageJSON = payload.getJSONObject("data");

        if (messageJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Message data");
        }
        String messageString = messageJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Message message = JSON.parseObject(messageString, Message.class);

        Message addedMessage = messageService.addMessage(message);

        // Need to tell front-end the new message's id
        // so front-end can update the UI
        responseJson.put("id", addedMessage.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateMessage(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExist {
        JSONObject messageJSON = payload.getJSONObject("data");

        if (messageJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Message data");
        }

        if(messageService.getMessageById(messageJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExist("Message with that ID does not exist");
        }

        String messageString = messageJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Message message = JSON.parseObject(messageString, Message.class);

        Message updatedMessage = messageService.updateMessage(message);

        // Need to tell front-end the new message's id
        // so front-end can update the UI
        responseJson.put("id", updatedMessage.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteMessageById(@PathVariable Long id) throws ObjectDoesNotExist {
        if(messageService.getMessageById(id) == null) {
            throw new ObjectDoesNotExist("Message with that ID does not exist");
        }

        messageService.deleteMessageById(id);
        return ResponseEntity.ok().body(null);
    }
}
