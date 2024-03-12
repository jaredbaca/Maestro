import React, { Component, useState, useEffect } from 'react';
import Schedule from './Schedule';
import DatePicker from "react-datepicker";
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import { FloatingLabel, Button } from 'react-bootstrap';
import {ChevronBarLeft, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

function EventList(props) {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const defaultDate = new Date().toISOString().slice(0,10);
    // const [testDate] = useState(new Date());
    // const [testDateString, setTestDateString] = useState(testDate.toDateString());
    // console.log(defaultDate);

    // Decrement date with arrow button
    const handleDecrementDate = () => {
        let tempDate = new Date(date);
        tempDate.setDate(tempDate.getDate() - 1);
        console.log(`temp date: ${tempDate}`)
        setDate(tempDate);
        console.log(`date: ${date}`)
    }

    const handleIncrementDate = () => {
        let tempDate = new Date(date);
        tempDate.setDate(tempDate.getDate() + 1);
        console.log(`temp date: ${tempDate}`)
        setDate(tempDate);
        console.log(`date: ${date}`)
    }
    

    useEffect(() => {

        // console.log(date.toUTCString());
        let body = {date}

        const fetchEvents = async() => {

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

            <div className="text-center mt-3 mb-3">
                <ChevronLeft className='pr-4' onClick={handleDecrementDate}/>
                <input type="date" id="dateSelect" name="date"  defaultValue={defaultDate} value={date.toISOString().slice(0,10)} onChange={(event)=>setDate(new Date(event.target.value))}/>
                <ChevronRight className='ml-5' onClick={handleIncrementDate}/>
            </div>
            
            {/* <h5>{date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</h5> */}
            <Schedule events={events} date={date} handleClick={props.handleClick} title="Master Schedule" subtitle={props.subtitle}/>
        </div>
    );
}

export default EventList;