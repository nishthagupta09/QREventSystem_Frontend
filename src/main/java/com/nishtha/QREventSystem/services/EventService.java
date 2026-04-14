package com.nishtha.QREventSystem.services;

import com.nishtha.QREventSystem.entity.Event;
import com.nishtha.QREventSystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public Event saveEvent(Event event){
        String baseCode=event.getTitle()
                .toLowerCase()
                .replaceAll("[^a-z0-9 ]", "")
                .trim()
                .replaceAll("\\s+","-");

        int randomNum=new Random().nextInt(9000)+1000;
        String finalCode = baseCode + "-" + randomNum;

        while (eventRepository.findByEventCode(finalCode) != null) {
            randomNum = new Random().nextInt(9000) + 1000;
            finalCode = baseCode + "-" + randomNum;
        }

        event.setEventCode(finalCode);

        return eventRepository.save(event);
    }

    public Event getEventById(String id){
        return eventRepository.findById(id).orElse(null);
    }

    public Event getEventByCode(String code){
        return eventRepository.findByEventCode(code);
    }


}
