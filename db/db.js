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
    
    connection.release();
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

    connection.release();
    return undefined;
}

// Get all events for a specified date
module.exports.getEventByDate = async(date) => {
    let query = `SELECT * FROM Event
        WHERE DATEDIFF(Start_Date, "${date}") = 0`;

    try{
        const [results, fields] = await (await pool).execute(query);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    connection.release();
    return undefined;
}

// Get event by event ID
module.exports.getEventByEventID = async(eventID) => {
    let query = `SELECT * FROM Event
        WHERE id = ${eventID}`;

    try{
        const [results, fields] = await (await pool).execute(query);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    connection.release();
    return undefined;
}

// Get all events by user ID
module.exports.getEventsByUser = async(studentID) => {
    let query = `SELECT * FROM Event
        WHERE Student_Id = ${studentID}`;

    try{
        const [results, fields] = await (await pool).execute(query);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    connection.release();
    return undefined;
}


// Add new event
module.exports.addEvent = async(startDate, endDate, studentID, building, roomNo) => {
    const query = `INSERT INTO Event(Start_Date, End_Date, Student_Id, Building, Room_No)
    VALUES("${startDate}", "${endDate}", ${studentID}, ${building}, "${roomNo}")`;

    try{
        const [results] = await (await pool).execute(query);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    connection.release();
    return undefined;
}

// Update an existing event
module.exports.updateEvent = async(id, startDate, endDate, studentID, building, roomNo) => {
    const query = `UPDATE Event
    SET Start_Date = "${startDate}", End_Date = "${endDate}", Student_Id = ${studentID}, Building = ${building}, Room_No = "${roomNo}"
    WHERE id = ${id}`;

    try{
        const [results] = await (await pool).execute(query);
        console.log(results);
        return results;

    } catch(err) {
        console.log(err);
    }

    connection.release();
    return undefined;
}