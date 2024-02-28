import React, { Component } from 'react';
import {useState, useEffect} from 'react';
import {Form, Button, Card, Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

/**
 * Imports an array of default location objects so that in the event of a database error
 * the master calendar and booking form do not render without locations. Once locations
 * have been successfully read from the database, the list will update to reflect any 
 * newly added locations.
 */
const defaultLocations = require('./Constants').defaultLocations;


function BookingPage() {

    const [locations, setLocations] = useState(defaultLocations);
    const [date, setDate] = useState(new Date());
    const [eventsByRoom, setEventsByRoom] = useState([]);
    const [roomTypes, setRoomTypes] = useState(locations.map((location) => location.Type));
    // const [availableTimes, setAvailableTimes] = useState([9, 11, 14, 16, 18, 20, 22, 24, 2, 4, 6]);
    const [currentType, setCurrentType] = useState(roomTypes[0]);
    // const [bookedTimes, setBookedTimes] = useState([]);
    const [currentLocation, setCurrentLocation] = useState();
    const [validated, setValidated] = useState(false);

    const times = ["9:00AM - 11:00AM", "11:00AM - 1:00PM", "2:00PM - 4:00PM", "4:00PM - 6:00PM", 
    "6:00PM - 8:00PM", "8:00PM - 10:00PM", "10:00PM - 12:00AM", "12:00AM - 2:00AM", "2:00AM - 4:00AM", "4:00AM - 6:00AM"];


    const navigate = useNavigate();
    const { Formik } = formik; 

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

    useEffect(() => {
        console.log(locations)
        setCurrentLocation(locations[0])
    }, [locations]);

    // useEffect(() => {
    //     console.log(currentLocation)
    // }, [currentLocation]);


    // Form Data
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        first: "",
        last: "",
        studentID: "",
        location: ""
    })

    // Define the schema for form validation
    const schema = yup.object().shape({
        startDate: yup.date().required(),
        endDate: yup.date().required().when('startDate', (startDate, schema) => {return schema.min(startDate, 'End date must be after start date')}),
        first: yup.string().required(),
        last: yup.string().required(),
        studentID: yup.number().required(),
        location: yup.object().shape({
            selectField: yup.string().required('Please select an option')
        })
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]:value }));
    }

    const handleTypeChange = (event) => {
        setCurrentType(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log("submitted");
            console.log(formData);

        let body = {
            "startDate" : formData.startDate,
            "endDate" : formData.endDate,
            "studentID" : formData.studentID,
            "building" : formData.location.split(',')[0],
            "roomNo" : formData.location.split(',')[1]
        }
        console.log(body);

        const response = await fetch('/events/add', {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        
        if(response.ok) {
            alert("Event Successfully Scheduled!")
            console.log("Success")
            navigate('/')
            
        } else {
            response.json().then(data => alert(data.message ? data.message : "Unable to complete request"))
            console.log(response)
        }
        }

        setValidated(true);
        
        
        
    }
    return(
        <div> 
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                            <Card className="shadow">
                                <Card.Body>
                                    <div className="mb-3 mt-4">
                                        <h2 className="fw-bold mb-4">Reserve a Room</h2>
                                        
                                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                
                                                {/* <Form.Group className='mb-3' controlId="formLocation">
                                                    <Form.Label>Type</Form.Label>
                                                    <Form.Select onChange={handleChange} name="type">
                                                        {
                                                            roomTypes.map((type, index) => {
                                                            return(<option key={index} value={type}>{type}</option>)
                                                        })}
                                                    </Form.Select>
                                                </Form.Group> */}

                                                <Form.Group className="mb-3" controlId="formStartDate">
                                                    <Form.Label>Start</Form.Label>
                                                    <Form.Control required type="datetime-local" name="startDate" defaultValue={new Date().toISOString().slice(0,-8)} onChange={handleChange}></Form.Control>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formEndDate">
                                                    <Form.Label>End</Form.Label>
                                                    <Form.Control required isInvalid={formData.endDate < formData.startDate} type="datetime-local" name="endDate" defaultValue={new Date().toISOString().slice(0,-8)} onChange={handleChange}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        End date must be after start date
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className='mb-3' controlId="formLocation">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Select required onChange={handleChange} 
                                                        name="location">
                                                        <option></option>
                                                        {locations.map((location, index) => {
                                                        return(<option key={index} 
                                                            value={`${location.Building},${location.Room_No}`}
                                                            >{location.Building} - {location.Room_No} {location.Name}</option>)
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formFirst">
                                                    <Form.Label>First</Form.Label>
                                                    <Form.Control type="text" name="first" value={formData.first} onChange={handleChange}></Form.Control>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formLast">
                                                    <Form.Label>Last</Form.Label>
                                                    <Form.Control type="text" name="last" value={formData.last} onChange={handleChange}></Form.Control>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formStudentID">
                                                    <Form.Label>Student ID</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        name="studentID" 
                                                        value={formData.studentID} 
                                                        onChange={handleChange} 
                                                        >

                                                    </Form.Control>
                                                </Form.Group>                                    

                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </div>
                                            </Form> 
                                
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        
    )
}
export default BookingPage;