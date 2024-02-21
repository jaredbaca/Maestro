import React, { Component } from 'react';
import {useState, useEffect} from 'react';
import ReactDatePicker from 'react-datepicker';
import TextField from '@mui/material/TextField';
import { Chip, Select } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BookingForm from '../Components/BookingForm';

function BookingPage() {

    // Fetch Locations
    const [locations, setLocations] = useState([]);
    const [date, setDate] = useState(new Date());
    const [eventsByRoom, setEventsByRoom] = useState([]);
    const [roomTypes, setRoomTypes] = useState(locations.map((location) => location.Type));
    const [availableTimes, setAvailableTimes] = useState([9, 11, 14, 16, 18, 20, 22, 24, 2, 4, 6]);
    const [currentType, setCurrentType] = useState(roomTypes[0]);

    useEffect(() => {

        const fetchLocations = async() => {
            const response = await fetch('/locations');
            const data = await response.json();
            setLocations(data);
            // console.log(data);

            let types = new Set(locations.map((location)=> location.Type))
            setRoomTypes(Array.from(types));
            setCurrentType(roomTypes[0]);

            // setRoomTypes(locations.map((location) => location.Type))
        }
        fetchLocations();

    }, []);


    // Form Data
    const [text, setText] = useState("");
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        first: "",
        last: "",
        studentID: "",
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]:value }));
    }

    const handleTypeChange = (event) => {
        setCurrentType(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        let body = {
            "startDate" : formData.startDate,
            "endDate" : formData.endDate,
            "studentID" : formData.studentID,
            "building" : formData.location.split(',')[0],
            "roomNo" : formData.location.split(',')[1]
        }
        console.log(body);

        const response = await fetch('/add', {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        
        if(response.ok) {
            console.log("Success")
        } else {
            console.log(response)
        }
        
    }

    return(
        <div>
            <h1>Event Booking</h1>
            <form onSubmit={handleSubmit}>

            
                <div>
                    <label>Type</label>
                    <select onChange={handleTypeChange} name="type">
                        {
                        roomTypes.map((type) => {
                            return(<option value={type}>{type}</option>)
                        })}
                    </select>
                </div>
                
                <div>
                    <label>Location</label>
                    <select onChange={handleChange} name="location">
                        {locations.map((location) => {
                            // if(location.Type == currentType || !currentType){
                                return(<option value={`${location.Building},${location.Room_No}`}>{location.Building} - {location.Room_No} {location.Name}</option>)
                            // }
                        })}
                    </select>
                </div>
                
                <div>
                    <label>Start Date/Time</label>
                    <input type="datetime-local" id="startDate" name="startDate" onChange={handleChange}/>
                </div>
                
                <div>
                    <label>End Date/Time</label>
                    <input type="datetime-local" id="endDate" name="endDate" onChange={handleChange}/>
                </div>
                
                <div>
                    <label>First</label>
                    <input type="text" id="first" name="first" value={formData.first} onChange={handleChange} />
                </div>

                <div>
                    <label>Last</label>
                    <input type="text" id="last" name="last" value={formData.last} onChange={handleChange} />
                </div>

                <div>
                    <label>Student ID</label>
                    <input type="text" id="studentID" name="studentID" value={formData.studentID} onChange={handleChange} />
                </div>

                

                

                {/* <div>
                    <Grid container columns={4}>
                    {availableTimes.map((time) => {
                        return (
                            <Grid>
                                <Chip label={`${time <= 12 ? time : time%12}:00${time <= 12 ? "AM" : "PM"} - ${time+2 <= 12 ? time+2 : (time+2)%12}:00${time+2 <= 12 ? "AM" : "PM"}`} />
                            </Grid>)
                        
                        })}

                    </Grid>
                </div> */}
                        
                {/* <BookingForm /> */}

                <button type="submit">Submit</button>
            </form>
            <h2>{text}</h2>
        </div>
        
    )
}
export default BookingPage;