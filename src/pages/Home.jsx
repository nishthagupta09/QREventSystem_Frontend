import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate= useNavigate();
    return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400">

        <h1 className="text-7xl font-extrabold mb-4">
        <span className="bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">
          QR Event System
        </span>
      </h1>

      <p className="text-gray-700 mb-10 text-lg">
        Create events. Scan. Check-in.
      </p>

      <div className="flex gap-6">

        <button
        onClick={()=>navigate("/create")}
         className="bg-yellow-300 px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition">
            Create Event
        </button>

         <button
          onClick={() => {
            const eventCode = prompt("Enter Event Code:");
            if (eventCode) navigate(`/dashboard/${eventCode}`);
          }}
          className="bg-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
        >
          Go to Dashboard
        </button>

      </div>

    </div>
    );

}

export default Home;