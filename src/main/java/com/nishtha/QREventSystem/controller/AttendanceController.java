package com.nishtha.QREventSystem.controller;

import com.nishtha.QREventSystem.entity.Attendance;
import com.nishtha.QREventSystem.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins="*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public Attendance checkIn(@RequestBody Attendance attendance){
        return attendanceService.saveAttendance(attendance);
    }

    @GetMapping("/{eventCode}")
    public List<Attendance> getAttendance(@PathVariable String eventCode){
        return attendanceService.getAttendanceByEventId(eventCode);
    }
}
