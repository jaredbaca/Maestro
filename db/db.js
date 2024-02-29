// const dotenv = require('dotenv');
const mysql_promise = require('mysql2/promise');

/**
 * This file establishes the connection to the MySQL database
 * and defines the methods for database manipulation. 
 * It abstracts the database layer out of the
 * server code so that a different database could be used if necessary.
 * 
 * All queries are parameterized and use the "execute" function of mysql2,
 * which automatically generates prepared statements, protecting against
 * SQL injection.
 */

// // Using hard coded values
// const pool = mysql_promise.createPool({
//     "host": "localhost",
//     "user": "admin",
//     "password": "CS602_Admin",
//     "database": "CS602_FinalProject2",
//     "connectionLimit": 15,
//     "timezone": 'Z'
// });


// Using environment variables
const pool = mysql_promise.createPool({
    "host": process.env.HOST,
    "user": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.DB_NAME,
    "connectionLimit": 15,
    "timezone": 'Z'
});


module.exports.pool = pool;

// Get all scheduled events
module.exports.getAllEvents = async() => {
    let query = "SELECT * FROM Event";

    const [results, fields] = await (await pool).execute(query);
    console.log("db read successful");
    return results;
}

// Get All Locations
module.exports.getLocations = async() => {
    let query = "SELECT * FROM Location";

    const [results, fields] = await (await pool).execute(query);
    // console.log(results);
    return results;
}

// Get all events for a specified date
module.exports.getEventByDate = async(date) => {

    let query = `SELECT * FROM Event
    NATURAL JOIN(
        SELECT id AS Student_Id, First, Last, Major, Semester, Instrument, Email
        FROM User) User
    WHERE DATEDIFF(Start_Date, ?) = 0`;

    const [results, fields] = await (await pool).execute(query, [date]);
    // console.log(results);
    return results;
}

// Get event by event ID
module.exports.getEventByEventID = async(eventID) => {

    // Changed this to a JOIN in order to retrieve student data that can be shown on event details page.
    let query = `SELECT * FROM Event
                    NATURAL JOIN(
                        SELECT id AS Student_Id, First, Last, Major, Semester, Instrument, Email
                        FROM User) User
                    WHERE id = ?`;

    const [results, fields] = await (await pool).execute(query, [eventID]);
    console.log(results);
    return results;
}

// Get all events by user ID
module.exports.getEventsByUser = async(studentID) => {
    let query = `SELECT * FROM Event
        WHERE Student_Id = ?`;

    const [results, fields] = await (await pool).execute(query, [studentID]);
    console.log(results);
    return results;
}

// Get events by date and room
module.exports.getEventsByDateAndRoom = async(startDate, building, roomNo) => {
    let query = `SELECT ID FROM Event
                WHERE Start_Date = ? AND Building = ? AND Room_No = ?`;
    const [results] = await (await pool).execute(query, [startDate, building, roomNo]);
    // console.log(results);
    return results;
}


// Add new event
module.exports.addEvent = async(startDate, endDate, studentID, building, roomNo) => {
    const query = `INSERT INTO Event(Start_Date, End_Date, Student_Id, Building, Room_No)
    VALUES(?, ?, ?, ?, ?)`;

    const [results] = await (await pool).execute(query, [startDate, endDate, studentID, building, roomNo]);
    console.log(results);
    return results;
}

// Update an existing event
module.exports.updateEvent = async(eventID, startDate, endDate, studentID, building, roomNo) => {
    const query = `UPDATE Event
    SET Start_Date = ?, End_Date = ?, Student_Id = ?, Building = ?, Room_No = ?
    WHERE id = ?`;

    const [results] = await (await pool).execute(query, [startDate, endDate, studentID, building, roomNo, eventID]);
    console.log(results);
    return results;
}

// Delete an event
module.exports.deleteEvent = async(eventID) => {

    let query = `DELETE FROM Event 
               WHERE id = ?`;
    const [results] = await (await pool).execute(query, [eventID]);
    console.log(results);
    return results;

}

// Get User by ID
module.exports.getUserById = async(id) => {
    let query = `SELECT * FROM User
                WHERE id = ?`;
    const [results, fields] = await (await pool).execute(query, [id]);
    console.log(results)
    return results;
}