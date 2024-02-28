const { getEventsByDateAndRoom, getUserById } = require('../db/db.js');

const db = require('../db/db.js').pool;

/*
    This module provides methods for validating user input before it reaches the database.
*/

// Validates start/end date
module.exports.isValidDate = async(startDate, endDate, building, roomNo, eventID = null) => {
    
    let start_date = new Date(startDate);
    let end_date = new Date(endDate);
    console.log(`start_date: ${start_date}, end_date: ${end_date}`)

    //Make sure end date is after start date
    if(end_date < start_date) {
        console.log("end date is before start date")
        return false;
    } else {
        console.log("passed: end date after start date")
    }

    console.log(`hours: ${start_date.getHours()}, ${end_date.getHours()}`);

    //Make sure start time/end time are within bookbable hours of 9am - 11:59pm
    if(end_date.getHours() < 9 || end_date.getHours() > 23  || start_date.getHours() < 9 || start_date.getHours() > 23) {
        console.log("outside valid time window")
        return false;
    } else {
        console.log("passed: request during bookable hours")
    }

    //Check to see if desired location is already booked for that date/time
    console.log("Checking date validity");
    let result = await getEventsByDateAndRoom(startDate, building, roomNo);
    console.log("Result of conflict check:");
    console.log(result);
    if(result.length !=0 && result[0].ID != eventID) {
        return false;
    } else {
        console.log("passed: time slot not taken")
    }

    return true;
}

// Validates that given Student ID exists in the database
module.exports.checkStudentId = async(id) => {
    console.log("verifying that ID exists");

    let result = await getUserById(id);
    if(result.length != 0) {
        console.log("passed: ID exists")
        return true;
    } else {
        console.log("Failed: ID not found")
        return false;
    }
}