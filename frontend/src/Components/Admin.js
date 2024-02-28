import React, { Component, useState, useEffect } from 'react';
import Schedule from './Schedule';
import DatePicker from "react-datepicker";
import moment from 'moment';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
import EventList from './EventList';

import "react-datepicker/dist/react-datepicker.css";
import { Chip } from '@mui/material';

function Admin() {

    const navigate = useNavigate();

    //pass to scheduler
    const handleClick = (event) => {
        navigate('/eventDetailsAdmin', {state: { eventID : event.target.id }})
    }
    
    return(
        <div>
            <EventList subtitle="admin" handleClick={handleClick}/>

        </div>
    );
}

export default Admin;