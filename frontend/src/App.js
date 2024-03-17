import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EventList from './Components/EventList';
import Schedule from './Components/Schedule';
import Home from './Components/Home';
import BookingPage from './Components/BookingPage';
import NotFound from './Components/NotFound';
import Admin from './Components/Admin';
import EventDetailsAdmin from './Components/EventDetailsAdmin';
import NavBar from './Components/NavBar.js';
import AdminSchedule from './Components/AdminSchedule.js';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/booking" Component={BookingPage} />
          <Route path="/admin" Component={Admin} />
          <Route path="/eventDetailsAdmin" Component={EventDetailsAdmin} />
          <Route path="/adminSchedule" Component={AdminSchedule} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
