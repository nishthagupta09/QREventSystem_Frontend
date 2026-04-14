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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const[message, setMessage]=useState("");

  const handleSubmit= async (e) => {
     e.preventDefault();


   if (!eventCode) {
    return <p>Invalid QR code</p>;
  }

    try {
      await axios.post("http://localhost:8080/attendance", {
        ...form ,eventCode
      });

      setMessage("You are in!");
    } catch (err) {
      console.error(err);
      setMessage("Already Checked-in");
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center pt-10 gap-6">

      <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">Check-In</h2>
      <p className="text-sm text-gray-700">
          Event Code: {eventCode}
        </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-15 rounded-xl shadow-md"
      >
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="border px-15 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pl-3 text-left placeholder:text-left"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border px-15 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pl-3 text-left placeholder:text-left"
        />

        <button
          type="submit"
          className="bg-amber-200 px-15 py-4 rounded hover:bg-amber-300 disabled:bg-gray-300"
        >
          Check In
        </button>
      </form>
       {message && <h4>{message}</h4>}

    </div>
  );
}

export default CheckIn;