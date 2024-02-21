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

// // GET - Retrieve All events 
// // TODO add JSON, XML
// app.get('/all-events', (req, res) => {

//     let query = "SELECT * FROM Event";

//     db.getConnection((err, connection) => {
//         if(err) {
//             console.error(err);
//         }

//         connection.query(query, (err, result) => {
//             if(err) {
//                 console.error(err);
//             }

//             console.log(result);
//             res.json(result);

//             connection.release();
//         });
//     });
// });

// Alternate version of all events
app.get('/all-events', async function (req, res) {

    let result = await db.getAllEvents(req, res);
    return result;
    
});

// // GET - Locations
// app.get('/locations', (req, res) => {

//     let query = "SELECT * FROM Location";

//     db.getConnection((err, connection) => {
//         if(err) {
//             console.error(err);
//         }

//         connection.query(query, (err, result) => {
//             if(err) {
//                 console.error(err);
//             }

//             console.log(result);
//             res.json(result);

//             connection.release();
//         });
//     });
// });

// GET - Locations (DB Logic moved to separate DB file)
app.get('/locations', async function (req, res) {

    let result = await db.getLocations(req, res);
    return result;
});

// Retrieve Events By Date
app.post('/date', async function(req, res) {
    let date = req.body.date;
    let result = await db.getEventByDate(date, res);
    return result;
});

// Retrieve Events By Event ID
app.post('/event', async function(req, res) {
    let eventID = req.body.eventID;
    let result = await db.getEventByEventID(eventID, res);
    return result;
});

// Retrieve Events By User ID
app.get('/:id', async function(req, res) {
    let studentID = req.params.id;
    let result = await db.getEventsByUser(studentID, res);
    return result;
});

// POST - Schedule an event
app.post('/add', async function (req, res) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const studentID = req.body.studentID;
    const building = req.body.building;
    const roomNo = req.body.roomNo;

    let result = await db.addEvent(res, startDate, endDate, studentID, building, roomNo);
    return result;
})

// DELETE - Delete an event



// POST - Update an event
app.post('/update', async function(req, res) {
    const id = req.body.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const studentID = req.body.studentID;
    const building = req.body.building;
    const roomNo = req.body.roomNo;

    let result = await db.updateEvent(res, id, startDate, endDate, studentID, building, roomNo);
    return result;
})

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.listen(PORT, function(){
  console.log(`http://localhost:${PORT}`);
});


