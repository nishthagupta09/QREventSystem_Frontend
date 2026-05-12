import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function CreateEvent(){
    const navigate=useNavigate();
    const[message,setMessage]=useState("");
    const[ form, setForm]=useState({
        title:"",
        location:"",
        date:"",
        time:""
    });


    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit=async (e)=>{
        console.log("SUBMIT CLICKED");
        e.preventDefault();

    try {
        const response = await axios.post(
            "https://qr-event-system-backend.onrender.com/event",{
                ...form
            }
        );

        console.log(response.data);
        const eventCode = response.data.eventCode;
        navigate(`/dashboard/${eventCode}`);
    } catch (err) {
        if (!form.title || !form.location || !form.date || !form.time) {
            setMessage("Fill all fields.");
            return;
        }
        console.error(err);
        }
}


    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-300 px-4">

  <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-md border border-white/30">


    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Create Event
    </h1>


    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      <div>
        <label className="text-sm text-gray-600">Event Title</label>
        <input
          name="title"
          placeholder="Event Title"
          required
          onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Location</label>
        <input
          name="location"
          placeholder="Location"
          required
          onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>


      <div>
        <label className="text-sm text-gray-600">Date</label>
        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Time</label>
        <input
          type="time"
          name="time"
          required
          onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>


      <button
        type="submit"
        className="bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 hover:scale-[1.02] transition"
      >
        Create Event
      </button>

    </form>

    {message && (
      <p className="text-center text-green-600 mt-4 font-medium">
        {message}
      </p>
    )}

  </div>
</div>
    );

}

export default CreateEvent;