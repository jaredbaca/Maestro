import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';


function Schedule(props) {
    const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

    const [locations, setLocations] = useState(["Studio A", "Production Suite A"]);
    // const [date, setDate] = useState(new Date());

    const navigate = useNavigate();

    const handleClick = (event) => {
        navigate('/eventDetailsAdmin', {state: { eventID : event.target.id }})
    }

    useEffect(() => {

        const fetchLocations = async() => {
            const response = await fetch('/locations');
            const data = await response.json();
            console.log(data);
            setLocations(data);
        };
        fetchLocations();

    }, []);

    return(
        <div>
            {/* <h5>{props.date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</h5> */}
            <Table striped bordered id="scheduleTable">
                <thead>
                    <tr>
                        <th>#</th>
                        {/* {times.map((time)=>{return <td>{time}</td>})} */}
                        <th>9:00AM</th>
                        <th>10:00AM</th>
                        <th>11:00AM</th>
                        <th>12:00PM</th>
                        <th>1:00PM</th>
                        <th>2:00PM</th>
                        <th>3:00PM</th>
                        <th>4:00PM</th>
                        <th>5:00PM</th>
                        <th>6:00PM</th>
                        <th>7:00PM</th>
                        <th>8:00PM</th>
                        <th>9:00PM</th>
                        <th>10:00PM</th>
                        <th>11:00PM</th>
                        <th>12:00AM</th>
                        <th>1:00AM</th>
                        <th>2:00AM</th>
                        <th>3:00AM</th>
                        <th>4:00AM</th>
                        <th>5:00AM</th>
                        <th>6:00AM</th>
                        <th>8:00AM</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location, index) => {
                        let eventsByRoom = props.events.filter((event)=>event.Building==location.Building && event.Room_No==location.Room_No)
        
                        return(
                            // filter events by location and date/time to fill cells
                            <tr key={index} style={{whiteSpace:'nowrap'}}>
                                <td>{location.Name ? location.Name : `${location.Building} - ${location.Room_No}`}</td>

                                {
                                    times.map((time, index) => {
                                        for(let event of eventsByRoom) {
                                            if(event.Start_Date && event.Start_Date.includes(time)) {
                                                return(
                                                <td id={event.ID} onClick={handleClick}>{new Date(event.Start_Date).toLocaleDateString()}</td>
                                                ) 
                                            } else {
                                                return <td></td>
                                            }
                                        }  
                                    })
                                }
                                
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Schedule;