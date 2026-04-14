package com.nishtha.QREventSystem.repository;

import com.nishtha.QREventSystem.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String> {
    Event findByEventCode(String eventCode);

}
