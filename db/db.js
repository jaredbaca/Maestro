const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

/**
 * This file establishes the connection to the MySQL database
 * and defines the methods for database manipulation. 
 * It abstracts the database layer out of the
 * server code so that a different database could be used if necessary.
 */

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

// Get all scheduled events
module.exports.getAllEvents = async() => {
    let query = "SELECT * FROM Event";

    try{
        const [results, fields] = await (await pool).execute(query);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }
    
    return undefined;

}

// Get All Locations
module.exports.getLocations = async() => {
    let query = "SELECT * FROM Location";

    try{
        const [results, fields] = await (await pool).execute(query);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    return undefined;
}

// Get all events for a specified date
module.exports.getEventByDate = async(date) => {
    // let query = `SELECT * FROM Event
    //     WHERE DATEDIFF(Start_Date, "${date}") = 0`;

    let query = `SELECT * FROM Event
    WHERE DATEDIFF(Start_Date, ?) = 0`;

    try{
        const [results, fields] = await (await pool).execute(query, [date]);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    return undefined;
}

// Get event by event ID
module.exports.getEventByEventID = async(eventID) => {

     let query = `SELECT * FROM Event 
                WHERE id = ?`;

    try{
        const [results, fields] = await (await pool).execute(query, [eventID]);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    return undefined;
}

// Get all events by user ID
module.exports.getEventsByUser = async(studentID) => {
    let query = `SELECT * FROM Event
        WHERE Student_Id = ?`;

    try{
        const [results, fields] = await (await pool).execute(query, [studentID]);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    return undefined;
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
module.exports.updateEvent = async(id, startDate, endDate, studentID, building, roomNo) => {
    const query = `UPDATE Event
    SET Start_Date = ?, End_Date = ?, Student_Id = ?, Building = ?, Room_No = ?
    WHERE id = ?`;

    const [results] = await (await pool).execute(query, [startDate, endDate, studentID, building, roomNo, id]);
    console.log(results);
    return results;
}