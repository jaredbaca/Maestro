import React, { Component } from 'react';
import {Table, Container, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import '../App.css';

function Schedule(props) {
    const times = ["09:00", "10:00", "11:00", "12:00", "13:00:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "0:00"];
    const locationColors = {
        // Canva "Padlocked Doors" Pallette
        "Studio": "#B99095",
        "Practice Room": "#FCB5AC",
        "Ensemble Room" : "#B5E5CF",
        "Production Suite": "#3D5B59",
    }
    const [locations, setLocations] = useState(["Studio A", "Production Suite A"]);
    // const [date, setDate] = useState(new Date());

    const navigate = useNavigate();
    const cardBodyRef = useRef(null);

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

    // Card Scroll Position
    useEffect(() => {
        const cardBody = cardBodyRef.current;
        if(cardBody) {
            const middlePosition = (cardBody.scrollWidth - cardBody.clientWidth) / 2;
            cardBody.scrollLeft = middlePosition;
        }
    })

    return(
        <div>
            <Container>
            <div className="border border-3 border-primary"></div>

                <Card className='shadow'>
                    <Card.Body style={{overflowX: "auto", maxWidth: "100%"}}>
                    {/* <div style={{maxWidth: "100%", overflowX: "auto"}}> */}
            {/* <h5>{props.date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</h5> */}
            <Table striped bordered id="scheduleTable">
                <thead>
                    <tr>
                        <th></th>
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
                                        if(eventsByRoom.length > 0) {
                                            for(let event of eventsByRoom) {
                                                if(event.Start_Date && event.Start_Date.slice(11,16)==time) {
                                                    // console.log(event.Start_Date.slice(11,16))
                                                    return(
                                                    <td key={index} className='text-center thick-border' style={{backgroundColor: locationColors[`${location.Type}`]}} colSpan={2} id={event.ID} onClick={handleClick}>Event ID: {event.ID}</td>
                                                    ) 
                                                } else {
                                                    return <td></td>
                                                }
                                            } 
                                        } else {
                                            return <td></td>
                                        }
                                         
                                    })
                                }
                                
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {/* </div> */}
            </Card.Body>
            </Card>
            </Container>
        </div>
    )
}

export default Schedule;