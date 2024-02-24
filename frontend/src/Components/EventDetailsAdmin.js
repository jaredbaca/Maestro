import React, { Component, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BookingForm from '../Components/BookingForm';
import {Form, Button, Card, Container, Row, Col} from 'react-bootstrap';

function EventDetailsAdmin() {

    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const location = useLocation();
    // const {state} = location;
    const eventID = location.state ? location.state.eventID : 4;
    const [event, setEvent] = useState([]);
    const [bookedStartDate, setBookedStartDate] = useState("");

     // Form Data
     const [text, setText] = useState("");
     const [formData, setFormData] = useState({
         startDate: "",
         endDate: "",
         first: "",
         last: "",
         studentID: "",
         location: ""
     })

    // Fetch Event Details
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
                if(!bookedStartDate) setBookedStartDate(event.Start_Date);
            
        };
        fetchEvent();

    }, [eventID]);

    useEffect(() => {
      console.log(event)  
    }, [event])

    // Fetch Locations
    useEffect(() => {

        const fetchLocations = async() => {
            const response = await fetch('/locations');
            
            if(response.ok) {
                const data = await response.json();
                setLocations(data);     
                // let types = new Set(locations.map((location)=> location.Type))
                // setRoomTypes(Array.from(types));
                // setCurrentType(roomTypes[0]);
                // setCurrentLocation(locations[0] || null);
                
            } else {
                console.log("api error occurred.")
            }
        }
        fetchLocations();

    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]:value }));
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

        const response = await fetch('/events/update', {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: event
        })
        
        if(response.ok) {
            alert("Event Successfully Updated!")
            console.log("Success")
            // Redirect to home page or user page
        } else {
            console.log(response)
        }
        
    }

    // Delete
    const handleDelete = async(event) => {
        event.preventDefault();

        const response = await fetch('/events/delete', {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"eventID": eventID})
        })
        
        if(response.ok) {
            navigate('/')
            alert("Event Successfully Deleted!");
            console.log("Success");
            // Redirect to home page or user page
        } else {
            console.log(response)
        }

    }

 
// =========================================================
    return(
        <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                            <Card className="shadow">
                                <Card.Body>
                                    <div className="mb-3 mt-4">
                                        <h2 className="fw-bold mb-4">Event Details</h2>
                                
                                            <Form onSubmit={handleSubmit}>

                                                <Form.Group className="mb-3" controlId="eventID">
                                                    <Form.Label>Event ID</Form.Label>
                                                    <Form.Control type="text" name="eventID" value={eventID} disabled readonly></Form.Control>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formStartDate">
                                                    <Form.Label>Start</Form.Label>
                                                
                                                    <Form.Control type="datetime-local" value={event.Start_Date} name="startDate" onChange={handleChange}></Form.Control>
                                                    {/* <Form.Text>{new Date(event.Start_Date).toUTCString()}</Form.Text> */}
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formEndDate">
                                                    <Form.Label>End</Form.Label>
                                                    <Form.Control type="datetime-local" name="endDate" onChange={handleChange}></Form.Control>
                                                    {/* <Form.Text>{new Date(event.End_Date).toUTCString()}</Form.Text> */}
                                                </Form.Group>

                                                <Form.Group className='mb-3' controlId="formLocation">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Select 
                                                        defaultValue={`${event.Building} - ${event.Room_No}`} 
                                                        onChange={handleChange} 
                                                        name="location">

                                                        <option></option>
                                                        {locations.map((location, index) => {

                                                        return(
                                                            <option 
                                                                key={index}     
                                                                value={`${location.Building},${location.Room_No}`}
                                                                selected={location.Building == event.Building && location.Room_No == event.Room_No}
                                                                >
                                                            {location.Building} - {location.Room_No} {location.Name}
                                                            </option>)

                                                        })}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formFirst">
                                                    <Form.Label>First</Form.Label>
                                                    <Form.Control type="text" name="first" value={formData.first} defaultValue={event.First} onChange={handleChange}></Form.Control>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formLast">
                                                    <Form.Label>Last</Form.Label>
                                                    <Form.Control type="text" name="last" value={formData.last} defaultValue={event.Last} onChange={handleChange}></Form.Control>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formStudentID">
                                                    <Form.Label>Student ID</Form.Label>
                                                    <Form.Control type="text" name="studentID" value={formData.studentID} defaultValue={event.Student_Id} onChange={handleChange}></Form.Control>
                                                </Form.Group>                                    

                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Save Changes
                                                    </Button>
                                                </div>
                                                
                                                <Form.Group className="mb-5 mt-3" controlId="deleteEvent">
                                                    <Form.Text onClick={handleDelete} className='text-center text-danger'>Delete this event?</Form.Text>
                                                </Form.Group> 

                                                    
            
                                                    
                                                    
                                                
                                            </Form>
                                
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                </Row>
            </Container>
    );
}
export default EventDetailsAdmin;