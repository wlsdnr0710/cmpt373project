package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
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
    public ResponseEntity<JSONObject> getAllMessages(){
        List<Message> messages = messageService.getAllMessages();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data",messages);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getMessageById(@PathVariable Long id){
        Message message = messageService.getMessageById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", message);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addMessage(@RequestBody JSONObject payload){
        Message addedMessage = messageService.addMessage(payload);

        JSONObject responseJson = new JSONObject();
         // Need to tell front-end the new client's id
        // so front-end can update the UI
        responseJson.put("id", addedMessage.getId());

        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<JSONObject> updateMessageById(@PathVariable Long id, @RequestBody JSONObject payload) {
        Message updatedMessage = messageService.updateMessageById(id, payload);

        JSONObject responseJson = new JSONObject();
        // Need to tell front-end the new client's id
        // so front-end can update the UI
        responseJson.put("id", updatedMessage.getId());

        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping
    public ResponseEntity<JSONObject> deleteMessageById(@RequestBody JSONObject payload) {
        Integer messageIdInt = (Integer) payload.get("id");
        Long messageId = Long.valueOf(messageIdInt);
        messageService.deleteMessageById(messageId);
        return ResponseEntity.ok().body(null);
    }



}
