package com.nishtha.QREventSystem.repository;

import com.nishtha.QREventSystem.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance,String> {
    List<Attendance> findByEventCode(String eventCode);

    boolean existsByEmailAndEventCode(String email, String eventCode);

}
