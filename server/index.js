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


// Alternate version of all events
app.get('/all-events', async function (req, res) {
    let result = await db.getAllEvents();
    res.json(result);
    return result;  
});


// GET - Locations (DB Logic moved to separate DB file)
app.get('/locations', async function (req, res) {
    let result = await db.getLocations();
    res.json(result);
    return result;
});

// Retrieve Events By Date (Must Be UTC)
app.post('/date', async function(req, res) {
    let date = req.body.date;
    let result = await db.getEventByDate(date);
    res.json(result);
    return result;
});

// Retrieve Events By Event ID
app.post('/event', async function(req, res) {
    let eventID = req.body.eventID;
    let result = await db.getEventByEventID(eventID);
    res.json(result);
    return result;
});

// Retrieve Events By User ID
app.get('/:id', async function(req, res) {
    let studentID = req.params.id;
    let result = await db.getEventsByUser(studentID);
    res.json(result);
    return result;
});

// POST - Schedule an event
app.post('/add', async function (req, res) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const studentID = req.body.studentID;
    const building = req.body.building;
    const roomNo = req.body.roomNo;

    console.log(`Body as received by api: ${req.body}`)

    try{
        let result = await db.addEvent(startDate, endDate, studentID, building, roomNo);
        res.json(result);
    } catch(err) {
        res.status(500);
        console.error(err.message)
        res.json({error: 'Database Error'})
    }
})

// // DELETE - Delete an event



// POST - Update an event
app.post('/update', async function(req, res) {
    const id = req.body.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const studentID = req.body.studentID;
    const building = req.body.building;
    const roomNo = req.body.roomNo;

    try{
        let result = await db.updateEvent(id, startDate, endDate, studentID, building, roomNo);
         res.json(result);
    } catch(err) {
        res.status(500);
        console.error(err.message)
        res.json({error: 'Database Error'})
    }
})

app.use(function(req, res) {
	res.status(404);
});

app.listen(PORT, function(){
  console.log(`http://localhost:${PORT}`);
});


