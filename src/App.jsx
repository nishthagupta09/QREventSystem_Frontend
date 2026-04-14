import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import CheckIn from './pages/CheckIn';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<CreateEvent/>} />
        <Route path="/check-in" element={<CheckIn/>} />
        <Route path="/dashboard/:eventCode" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App;
