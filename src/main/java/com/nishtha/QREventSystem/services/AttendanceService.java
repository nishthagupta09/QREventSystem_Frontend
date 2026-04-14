package com.nishtha.QREventSystem.services;

import com.nishtha.QREventSystem.entity.Attendance;
import com.nishtha.QREventSystem.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance saveAttendance(Attendance attendance) {
        boolean alreadyExists = attendanceRepository
                .existsByEmailAndEventCode(
                        attendance.getEmail(),
                        attendance.getEventCode()
                );

        if (alreadyExists) {
            throw new RuntimeException("Already checked in");
        }

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByEventId(String eventCode) {
        return attendanceRepository.findByEventCode(eventCode);
    }

}
