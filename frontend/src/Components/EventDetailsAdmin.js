import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function EventDetailsAdmin() {

    const location = useLocation();
    const {eventID} = location.state || {};
    const [event, setEvent] = useState([]);

    useEffect(() => {

        // console.log(date.toUTCString());
        let body = {eventID}

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

    // ============================================== THIS IS ALL COPIED FROM BOOKING FORM

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
             body: body
         })
         
         if(response.ok) {
             console.log("Success")
         } else {
             console.log(response)
         }
         
     }
// =========================================================
    return(
        <div>
            <h1>Events Details Admin</h1>
            <h1>{eventID}</h1>
            <p>{event.Student_Id}</p>
            <p>{event.Start_Date}</p>
            <p>{event.Building}</p>
            <p>{event.Room_No}</p>
            
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
                <input type="text" id="first" name="first" value={event.Student_Id} onChange={handleChange} />
            </div>

            <div>
                <label>Last</label>
                <input type="text" id="last" name="last" value={formData.last} onChange={handleChange} />
            </div>

            <div>
                <label>Student ID</label>
                <input type="text" id="studentID" name="studentID" value={formData.studentID} onChange={handleChange} />
            </div>
        </div>
    );
}
export default EventDetailsAdmin;