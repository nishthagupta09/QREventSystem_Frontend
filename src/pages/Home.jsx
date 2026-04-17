
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate= useNavigate();
    return(
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-300 px-4">
      
      {/* Card */}
      <div className="backdrop-blur-lg bg-white/70 shadow-xl rounded-3xl p-10 max-w-xl w-full text-center border border-white/30">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          QR Event System
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-8">
          Create events, generate QR codes, and manage seamless check-ins.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <button
            onClick={() => navigate("/create")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 hover:scale-105 transition"
          >
            Create Event
          </button>

          {/* Dashboard */}
          <button
            onClick={() => {
              const eventCode = prompt("Enter Event Code:");
              if (eventCode) navigate(`/dashboard/${eventCode}`);
            }}
            className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-xl font-semibold shadow-sm hover:bg-gray-100 hover:scale-105 transition"
          >
            Go to Dashboard
          </button>

        </div>

      </div>
    </div>

    );

}

export default Home;