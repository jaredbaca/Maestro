const dotenv = require('dotenv');
dotenv.config({ path: '.././.env' });
const express = require('express');
const app = express();
const router = express.Router;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 3001;
console.log(process.env.PORT);

// Import DB object
const db = require('../db/db.js');

// =================================================== REST API Actions ==============================================================


// Get All Events
app.get('/events', async function (req, res) {
    let result = await db.getAllEvents();

    res.format({

        'application/json': function() {
            res.json(result);
        },

        'application/xml': function() {
            let resultXML =
                `<?xml version="1.0"?>\n`
            
            for(let event of result) {
                resultXML += `<event id="${event.ID}">
                                <Start_Date>${event.Start_Date}</Start_Date>
                                <End_Date>${event.End_Date}</End_Date>
                                <Student_Id>${event.Student_Id}</Student_Id>
                                <Building>${event.Building}</Building>
                                <Room_No>${event.Room_No}</Room_No>
                            </event>`
            }

            res.type('application/xml');
            res.send(resultXML);
        }
     })
});


// GET All Locations 
app.get('/locations', async function (req, res) {
    let result = await db.getLocations();
    res.format({

        'application/json': function() {
            res.json(result);
        },

        'application/xml': function() {
            let resultXML =
                `<?xml version="1.0"?>\n`
            
            for(let location of result) {
                resultXML += `<location>
                                <Name>${location.Name}</Name>
                                <Building>${location.Building}</Building>
                                <Room_No>${location.Room_No}</Room_No>
                                <Type>${location.Type}</Type>
                            </location>`
            }

            res.type('application/xml');
            res.send(resultXML);
        }
     })
});

// Retrieve Events By Date (Must Be UTC)
app.post('/events/date', async function(req, res) {
    let date = req.body.date;
    let result = await db.getEventByDate(date);
    res.format({

        'application/json': function() {
            res.json(result);
        },

        'application/xml': function() {
            let resultXML =
                `<?xml version="1.0"?>\n`
            
            for(let event of result) {
                resultXML += `<event id="${event.ID}">
                                <Start_Date>${event.Start_Date}</Start_Date>
                                <End_Date>${event.End_Date}</End_Date>
                                <Student_Id>${event.Student_Id}</Student_Id>
                                <Building>${event.Building}</Building>
                                <Room_No>${event.Room_No}</Room_No>
                            </event>`
            }

            res.type('application/xml');
            res.send(resultXML);
        }
     })
});

// Retrieve Event By Event ID
app.post('/event', async function(req, res) {
    let eventID = req.body.eventID;
    let result = await db.getEventByEventID(eventID);
    res.format({

        'application/json': function() {
            res.json(result);
        },

        'application/xml': function() {
            let resultXML =
                `<?xml version="1.0"?>
                    <event id="${result.ID}">
                        <Start_Date>${result.Start_Date}</Start_Date>
                        <End_Date>${result.End_Date}</End_Date>
                        <Student_Id>${result.Student_Id}</Student_Id>
                        <Building>${result.Building}</Building>
                        <Room_No>${result.Room_No}</Room_No>
                    </event>`

            res.type('application/xml');
            res.send(resultXML);
        }
     })
});

// Retrieve Events By User ID
app.get('/events/:studentID', async function(req, res) {
    let studentID = req.params.studentID;
    let result = await db.getEventsByUser(studentID);
    res.format({

        'application/json': function() {
            res.json(result);
        },

        'application/xml': function() {
            let resultXML =
                `<?xml version="1.0"?>\n`
            
            for(let event of result) {
                resultXML += `<event id="${event.ID}">
                                <Start_Date>${event.Start_Date}</Start_Date>
                                <End_Date>${event.End_Date}</End_Date>
                                <Student_Id>${event.Student_Id}</Student_Id>
                                <Building>${event.Building}</Building>
                                <Room_No>${event.Room_No}</Room_No>
                            </event>`
            }

            res.type('application/xml');
            res.send(resultXML);
        }
     })
});

// POST - Schedule an event
app.post('/events/add', async function (req, res) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const studentID = req.body.studentID;
    const building = req.body.building;
    const roomNo = req.body.roomNo;

    console.log(`Body as received by api: ${req.body}`)

    try{
        let result = await db.addEvent(startDate, endDate, studentID, building, roomNo);
        res.format({

            'application/json': function() {
                res.json(result);
            },
    
            'application/xml': function() {
                let resultXML =
                    `<?xml version="1.0"?>
                        <result>Event added successfully</result>`
                        
    
                res.type('application/xml');
                res.send(resultXML);
            }
         })
    } catch(err) {
        console.error(err.message)
        res.status(500);
        res.format({
            'application/json': function() {
                res.json({error: 'Database Error'})
            },

            'application/xml': function() {
                let resultXML =
                    `<?xml version="1.0"?>
                        <result>Database Error</result>`
                        
    
                res.type('application/xml');
                res.send(resultXML);
            }
        })
        
    }
})

// DELETE - Delete an event
app.post('/events/delete', async function(req, res) {
    let eventID = req.body.eventID;

    try{
        let result = await db.deleteEvent(eventID);
        res.format({

            'application/json': function() {
                res.json(result);
            },
    
            'application/xml': function() {
                let resultXML =
                    `<?xml version="1.0"?>
                        <result>Event deleted successfully</result>`
                        
    
                res.type('application/xml');
                res.send(resultXML);
            }
         })
    } catch(err) {
        console.error(err.message)
        res.status(500).format({
            'application/json': function() {
                res.json({error: 'Database Error'})
            },

            'application/xml': function() {
                let resultXML =
                    `<?xml version="1.0"?>
                        <result>Database Error</result>`
                        
    
                res.type('application/xml');
                res.send(resultXML);
            }
        })
        
    }
});


// POST - Update an event
app.post('/events/update', async function(req, res) {
    const eventID = req.body.eventID;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const studentID = req.body.studentID;
    const building = req.body.building;
    const roomNo = req.body.roomNo;

    try{
        let result = await db.updateEvent(eventID, startDate, endDate, studentID, building, roomNo);
        res.format({

            'application/json': function() {
                res.json(result);
            },
    
            'application/xml': function() {
                let resultXML =
                    `<?xml version="1.0"?>
                        <result>Event updated successfully</result>`
                        
    
                res.type('application/xml');
                res.send(resultXML);
            }
         })
    } catch(err) {
        console.error(err.message)
        res.status(500);
        res.format({
            'application/json': function() {
                res.json({error: 'Database Error'})
            },

            'application/xml': function() {
                let resultXML =
                    `<?xml version="1.0"?>
                        <result>Database Error</result>`
                        
                res.type('application/xml');
                res.send(resultXML);
            }
        })
    }
})

app.use(function(req, res) {
	res.status(404);
});

app.listen(PORT, function(){
  console.log(`http://localhost:${PORT}`);
});


