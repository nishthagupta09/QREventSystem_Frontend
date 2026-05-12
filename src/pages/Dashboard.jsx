import { useParams } from "react-router";
import { useState,useEffect } from "react";
import axios from "axios";
import { QRCode } from "react-qr-code";

function Dashboard(){
    const {eventCode}=useParams();
    console.log("PARAM Code:", eventCode);
    const [event,setEvent]=useState(null);
    const [attendees,setAttendees]=useState([]);

    useEffect(()=>{
        axios
        .get(`https://qr-event-system-backend.onrender.com/event/code/${eventCode}`)
        .then((res)=>setEvent(res.data))
        .catch((err)=>console.error(err));

        axios
      .get(`https://qr-event-system-backend.onrender.com/attendance/${eventCode}`)
      .then((res) => setAttendees(res.data))
      .catch((err) => console.error(err));

    }, [eventCode]);

    const qrUrl = `https://qr-event-system-backend.onrender.com/check-in?eventCode=${eventCode}`;
    console.log("EVENT:", event);
    console.log("QR URL:", qrUrl);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-300 p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Event Dashboard
            </h2>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

      {event && (
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            {event.title}
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            Code: {event.eventCode}
          </p>

          <div className="space-y-1 text-gray-700">
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
            <p>⏰ {event.time}</p>
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30 flex flex-col items-center">
        <h3 className="font-semibold mb-4">Scan to Check In</h3>

        <div className="p-3 bg-white rounded-xl shadow-inner">
          <QRCode value={qrUrl} />
        </div>
        <p className="text-xs mt-3 text-gray-500 break-all text-center">
          {qrUrl}
        </p>
      </div>

    </div>

    <div className="max-w-5xl mx-auto mt-8 bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30">
      
      <h3 className="text-lg font-semibold mb-4">
        Attendees ({attendees.length})
      </h3>

      {attendees.length === 0 ? (
        <p className="text-gray-500 text-center">No attendees yet</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {attendees.map((person, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="font-medium text-gray-800">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          ))}
        </div>
      )}

      </div>

    </div>

    )
}

export default Dashboard;