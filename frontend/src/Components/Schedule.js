import React, { Component } from 'react';
import {Table, Container, Card, Tab, Tabs} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import '../App.css';

const defaultLocations = require('./Constants').defaultLocations;

function Schedule(props) {
    const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "0:00"];
    const locationColors = {
        // Canva "Padlocked Doors" Pallette
        // "Studio": "#B99095",
        // "Practice Room": "#FCB5AC",
        // "Ensemble Room" : "#B5E5CF",
        // "Production Suite": "#3D5B59",

        // Apple Shine
        "Studio": "#FF8370",
        "Practice Room": "#00B1B0",
        "Ensemble Room" : "#FEC84D",
        "Production Suite": "#A98AB0",
    }

    const [locations, setLocations] = useState(defaultLocations);

    const navigate = useNavigate();
    const cardBodyRef = useRef(null);

    //Calculates the duration of an event based on start/end time
    function calculateTimeSpan(startTime, endTime) {
        let duration = new Date(endTime).getHours() - new Date(startTime).getHours();
        return duration;
    }

    useEffect(() => {

        const fetchLocations = async() => {
            const response = await fetch('/locations');
            const data = await response.json();
            console.log(data);
            if(response.ok){
                setLocations(data);
            }
            
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
                    <h2 className="fw-bold mb-4">{props.title}<span className='text-warning'> {props.subtitle}</span></h2>
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

                        // If events have successfully loaded, populate eventsByRoom Array
                        let eventsByRoom = [];
                        if(props.events.length > 0) {
                            eventsByRoom = props.events.filter((event)=>event.Building==location.Building && event.Room_No==location.Room_No)
                        }
        
                        return(
                            
                            // filter events by location and date/time to fill cells
                            <tr key={index} style={{whiteSpace:'nowrap'}}>
                                <td >{location.Name ? location.Name : `${location.Building} - ${location.Room_No}`}</td>

                                {
                                    times.map((time, index) => {
                                        if(eventsByRoom.length > 0) {
                                            console.log(`Events by Room ${location.Name}: ` + eventsByRoom.map((event) => event.Start_Date))
                                            
                                            // for(let event of eventsByRoom) {
                                                // console.log(`time: ${time}, checking event ${event.ID}`);

                                                let foundEvents = eventsByRoom.find((event)=>event.Start_Date.slice(11,16)==time);
                                                // console.log(time + " found events: " + (foundEvents? `${foundEvents.Start_Date}, ${foundEvents.Room_No}` : foundEvents));

                                                return(
                                                    //if an event was found for that time
                                                    foundEvents ?

                                                    //return formatted table cell
                                                    <td key={index} 
                                                    className='text-center thick-border' 
                                                    style={{maxWidth: '50px', overflow:'hidden', backgroundColor: locationColors[`${location.Type}`]}} 
                                                    colSpan={calculateTimeSpan(foundEvents.Start_Date, foundEvents.End_Date)} 
                                                    id={foundEvents.ID} 
                                                    onClick={props.handleClick}>
                                                        {`${foundEvents.First} ${foundEvents.Last}`}
                                                        </td>
                                                        
                                                    // else (no event), return empty cell
                                                        : <td></td>
                                                )

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