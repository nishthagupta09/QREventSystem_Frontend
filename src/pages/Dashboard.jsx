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
        .get(`https://qr-event-system-6tn8.onrender.com/event/code/${eventCode}`)
        .then((res)=>setEvent(res.data))
        .catch((err)=>console.error(err));

        axios
      .get(`https://qr-event-system-6tn8.onrender.com/attendance/${eventCode}`)
      .then((res) => setAttendees(res.data))
      .catch((err) => console.error(err));

    }, [eventCode]);

    const qrUrl = `https://qr-event-system-theta.vercel.app//check-in?eventCode=${eventCode}`;
    console.log("EVENT:", event);
    console.log("QR URL:", qrUrl);
    

    return(
        <div className="bg-blue-200 min-h-screen p-6 flex flex-col items-center gap-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">Event Dashboard</h2>

            {event && (
                <div className="bg-amber-200 p-6 rounded-xl shadow-md w-full max-w-md text-center">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <h4 className="font-semibold">Event Code: {event.eventCode}</h4>
                    <p className="text-black">Location: {event.location}</p>
                    <p className="text-black">Date: {event.date}</p>
                    <p className="text-black">Time: {event.time}</p>
                </div>
            )}


      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
        <h3 className="mb-3 font-semibold">Scan to Check In</h3>
        <QRCode value={qrUrl} />
        <p className="text-xs mt-2 break-all">{qrUrl}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h3 className="mb-3 font-semibold">
          Attendees ({attendees.length})
        </h3>

        {attendees.length === 0 ? (
          <p className="text-gray-500">No attendees yet</p>
        ) : (
          <ul className="space-y-2">
            {attendees.map((person, index) => (
              <li key={index} className="border p-2 rounded">
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-gray-600">{person.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

        </div>
    )

}

export default Dashboard;