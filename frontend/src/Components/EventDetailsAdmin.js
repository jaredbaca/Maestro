import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function EventDetailsAdmin() {

    const location = useLocation();
    // const {state} = location;
    const eventID = location.state ? location.state.eventID : 4;
    const [event, setEvent] = useState([]);

    useEffect(() => {

        // console.log(date.toUTCString());
        let body = {eventID}
        console.log(`Event ID: ${eventID}`)

        const fetchEvent = async() => {
            // using get for all events
            // const response = await fetch('/all-events');

            // using POST for request by date
                const response = await fetch('/event', {
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
                setEvent(data[0]);
            
        };
        fetchEvent();

    }, [eventID]);

 
// =========================================================
    return(
        <div>
            <h1>Events Details Admin</h1>
            <h1>{eventID}</h1>
            <p>{event.Student_Id}</p>
            <p>{event.Start_Date}</p>
            <p>{event.Building}</p>
            <p>{event.Room_No}</p>
            
        </div>
    );
}
export default EventDetailsAdmin;