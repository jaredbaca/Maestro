import React, { Component, useState, useEffect } from 'react';
import { getEvents } from './apiCalls';
import Schedule from './Schedule';
import DatePicker from "react-datepicker";
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import { FloatingLabel } from 'react-bootstrap';

function EventList(props) {

    const navigate = useNavigate();

    const [events, setEvents] = useState(["test"]);
    const [date, setDate] = useState(new Date());
    

    useEffect(() => {

        // console.log(date.toUTCString());
        let body = {date}

        const fetchEvents = async() => {
            // using get for all events
            // const response = await fetch('/all-events');

            // using POST for request by date
            const response = await fetch('/events/date', {
                method: "POST", 
                body: JSON.stringify(body),
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            })
            console.log(`POST request body: ${JSON.stringify(body)}`);
            const data = await response.json();
            console.log(data);
            setEvents(data);
        };
        fetchEvents();

    }, [date]);
    
    return(
        <div className="events-container">
            {/* <DatePicker selected={date} onChange={(date) => {
                setDate(date)
            }} /> */}
            <div className="text-center mt-3 mb-3">
                <input type="date" id="dateSelect" name="date" onChange={(event)=>setDate(event.target.value)}/>
            </div>
            
            {/* <h5>{date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</h5> */}
            <Schedule events={events} date={date} handleClick={props.handleClick} title="Master Schedule" subtitle={props.subtitle}/>
        </div>
    );
}

export default EventList;