const db = require('./db.js').pool

/**
 * THIS DELETES ALL EXISTING ROWS IN THE DATABASE. USE WITH CAUTION.
 */

// BE CAREFUL - DELETES ALL USER ROWS
const deleteExistingUsers = "DELETE from User;";

// DELETE ALL LOCATIONS
const deleteExistingLocations = "DELETE from Location;";

// DELETE ALL EVENTS
const deleteExistingEvents = "DELETE from Event;";

db.getConnection((err, connection) => {
    if(err) {
        console.error(err)
    }

    // DELETE EXISTING USERS
    connection.query(deleteExistingUsers, (err, result) => {
        if(err) {
            console.error(err)
        } else {
            console.log("Users Deleted")
        }
        // connection.release()
    });
    
    // DELETE EXISTING EVENTS
    connection.query(deleteExistingEvents, (err, result) => {
        if(err) {
            console.error(err)
        } else {
            console.log("Events Deleted")
        }
        // connection.release()
    });

    // DELETE EXISTING LOCATIONS
    connection.query(deleteExistingLocations, (err, result) => {
        if(err) {
            console.error(err)
        } else {
            console.log("Locations Deleted")
        }
        // connection.release()
    });