package com.nishtha.QREventSystem.controller;

import com.nishtha.QREventSystem.entity.Event;
import com.nishtha.QREventSystem.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public Event createEvent(@RequestBody Event event){
        return eventService.saveEvent(event);
    }


    @GetMapping("/code/{code}")
    public Event findByCode(@PathVariable String code){
        return eventService.getEventByCode(code);
    }

}
