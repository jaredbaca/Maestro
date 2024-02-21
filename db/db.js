const dotenv = require('dotenv');
const mysql = require('mysql2');

// // Using hard coded values
// const pool = mysql.createPool({
//     "host": "localhost",
//     "user": "admin",
//     "password": "CS602_Admin",
//     "database": "CS602_FinalProject",
//     "connectionLimit": 15
// });

// Using environment variables
const pool = mysql.createPool({
    "host": process.env.HOST,
    "user": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": "CS602_FinalProject",
    "connectionLimit": 15,
    "timezone": 'Z'
});

module.exports.pool = pool;

// Works - receives the req and res from the parent function
module.exports.getAllEvents = async(req, res) => {
    let query = "SELECT * FROM Event";
    
    pool.getConnection((err, connection) => {
        if(err) {
            console.error(err);
        }

        connection.query(query, (err, result) => {
            if(err) {
                console.error(err);
            }

            console.log(result);
            res.json(result);

            connection.release();
        });
    });
}

// Get All Locations
module.exports.getLocations = async(req, res) => {
    let query = "SELECT * FROM Location";

    pool.getConnection((err, connection) => {
        if(err) {
            console.error(err);
        }

        connection.query(query, (err, result) => {
            if(err) {
                console.error(err);
            }

            console.log(result);
            res.json(result);

            connection.release();
        });
    });
}

// Search for events by date
module.exports.getEventByDate = async(date, res) => {
    let query = `SELECT * FROM Event
        WHERE DATEDIFF(Start_Date, "${date}") = 0`;

    pool.getConnection((err, connection) => {
        if(err) {
            console.error(err);
        }

        connection.query(query, (err, result) => {
            if(err) {
                console.error(err);
            }

            console.log(result);
            res.json(result);

            connection.release();
        });
    });
}

// Search for events by user
module.exports.getEventsByUser = async(studentID, res) => {
    let query = `SELECT * FROM Event
        WHERE Student_Id = ${studentID}`;

    pool.getConnection((err, connection) => {
        if(err) {
            console.error(err);
        }

        connection.query(query, (err, result) => {
            if(err) {
                console.error(err);
            }

            console.log(result);
            res.json(result);

            connection.release();
        });
    });
}

// Search for events by event ID
module.exports.getEventByEventID = async(eventID, res) => {
    let query = `SELECT * FROM Event
        WHERE id = ${eventID}`;

    pool.getConnection((err, connection) => {
        if(err) {
            console.error(err);
        }

        connection.query(query, (err, result) => {
            if(err) {
                console.error(err);
            }

            console.log(result);
            res.json(result);

            connection.release();
        });
    });
}

// Add new event
module.exports.addEvent = async(res, startDate, endDate, studentID, building, roomNo) => {
    const query = `INSERT INTO Event(Start_Date, End_Date, Student_Id, Building, Room_No)
    VALUES("${startDate}", "${endDate}", ${studentID}, ${building}, "${roomNo}")`;

    pool.getConnection((err, connection) => {
        if(err) {
            console.error(err);
            res.status(500);
            res.send(err);
        }

        connection.query(query, (err, result) => {
            if(err) {
                console.error(err);
                res.status(500);
                res.send(err);
            }

            console.log(result);
            res.json(result);

            connection.release();
        });
    });
}

// Update existing event
module.exports.updateEvent = async(res, id, startDate, endDate, studentID, building, roomNo) => {
    const query = `UPDATE Event
    SET Start_Date = "${startDate}", End_Date = "${endDate}", Student_Id = ${studentID}, Building = ${building}, Room_No = "${roomNo}"
    WHERE id = ${id}`;

    pool.getConnection((err, connection) => {
        if(err) {
            console.error(err);
            res.status(500);
            res.send(err);
        }

        connection.query(query, (err, result) => {
            if(err) {
                console.error(err);
                res.status(500);
                res.send(err);
            }

            console.log(result);
            res.json(result);

            connection.release();
        });
    });
}