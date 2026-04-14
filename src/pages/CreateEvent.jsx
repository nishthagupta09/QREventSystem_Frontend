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
            "https://qr-event-system-6tn8.onrender.com/event",{
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200">

            <h1 className="text-5xl font-bold mt-4 mb-10 px-8 py-4">
                <span  className="bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">
                    Create Event
                </span>
            </h1>

            <form onSubmit={handleSubmit} className="bg-gray-200 p-8 shadow-lg rounded-2xl w-[320px] flex flex-col gap-8">

                <input 
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="title" 
                placeholder="Title" 
                required
                onChange={handleChange}/>

                <input 
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="location" 
                placeholder="Location" 
                required
                onChange={handleChange}/>

                <input 
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="date" 
                placeholder="Date" 
                required
                onChange={handleChange}/>

                <input 
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="time" 
                placeholder="Time" 
                required
                onChange={handleChange}/>

                <button type="submit" className="bg-amber-200 text-black p-3 rounded-lg font-semibold hover:bg-amber-300 transition duration-600">CREATE</button>
            </form>
            {message && <h4>{message}</h4>}

        </div>
    );

}

export default CreateEvent;