import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EventList from './Components/EventList';
import Schedule from './Components/Schedule';
import Home from './Components/Home';
import BookingPage from './Components/BookingPage';
import Nav from './Components/Nav';
import NotFound from './Components/NotFound';
import Admin from './Components/Admin';
import EventDetailsAdmin from './Components/EventDetailsAdmin';

function App() {
  return (
    <Router>
      <div>
        {/* <Nav/> */}
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/booking" Component={BookingPage} />
          <Route path="/admin" Component={Admin} />
          <Route path="/eventDetailsAdmin" Component={EventDetailsAdmin} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
