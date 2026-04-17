import { useState,useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

function CheckIn() {
    const [searchParams]=useSearchParams();
    const eventCode=searchParams.get("eventCode");

    const [form, setForm] = useState({
    name: "",
    email: "",
    eventCode:""
  });

  const [event, setEvent] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const[message, setMessage]=useState("");

  useEffect(() => {
    if (eventCode) {
      axios
        .get(`https://qr-event-system-6tn8.onrender.com/event/code/${eventCode}`)
        .then((res) => setEvent(res.data))
        .catch((err) => console.error(err));
    }
  }, [eventCode]);


  const handleSubmit= async (e) => {
     e.preventDefault();


   if (!eventCode) {
    return <p>Invalid QR code</p>;
  }

    try {
      await axios.post("https://qr-event-system-6tn8.onrender.com/attendance", {
        ...form ,eventCode
      });

      setMessage("You are in!");
    } catch (err) {
      console.error(err);
      setMessage("Already Checked-in");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-300 px-4">

      {event ? (
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 mb-6 w-full max-w-md text-center border border-white/30">
          <h2 className="text-2xl font-semibold text-indigo-600">
            {event.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Code: {event.eventCode}
          </p>

          <div className="mt-3 text-gray-700 space-y-1">
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
            <p>⏰ {event.time}</p>
          </div>
        </div>
        ) : (
        <p className="mb-6 text-gray-600">Loading event...</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-md flex flex-col gap-4 border border-white/30"
      >
        <h3 className="text-lg font-semibold text-center mb-2">
          Check In
        </h3>

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 hover:scale-[1.02] transition"
        >
          Check In
        </button>

        {message && (
          <p className="text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default CheckIn;