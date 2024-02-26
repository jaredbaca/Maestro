const dotenv = require('dotenv');
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

const addInitialUsers = 
`INSERT INTO User VALUES
(0505567, 'Jared', 'Baca', 'CWP', 7, 'Trumpet', 'jbaca@jaredbaca.com'), 
(0354121, 'Amadeus', 'Mozart', 'COMP', 1, 'Piano', 'amozart@jaredbaca.com'), 
(0583983, 'John', 'Lennon', 'SONG', 5, 'Guitar', 'jlennon@jaredbaca.com'), 
(0996352, 'John', 'Williams', 'FS', 8, 'Piano', 'jwilliams@jaredbaca.com'), 
(0583986, 'Wayne', 'Shorter', 'PERF', 3, 'Saxophone', 'wshorter@jaredbaca.com'), 
(0154027, 'Quincy', 'Jones', 'MPE', 2, 'Trumpet', 'qjones@jaredbaca.com'), 
(0161221, 'Bootsy', 'Collins', 'PERF', 4, 'Bass', 'bcollins@jaredbaca.com'), 
(0634144, 'Ludwig','Goransson',	'FS', 6, 'Piano', 'lgoransson@jaredbaca.com'), 
(0941178, 'Yo Yo', 'Ma', 'PERF', 2, 'Cello', 'yma@jaredbaca.com'), 
(0307449, 'Hans', 'Zimmer', 'EPD', 5, 'Piano', 'hzimmer@jaredbaca.com') ,
(0243347, 'Haley', 'Williams', 'MPE', 4, 'Voice', 'hwilliams@jaredbaca.com'), 
(0965841, 'Jack' , 'White', 'CWP', 3, 'Guitar', 'jwhite@jaredbaca.com'), 
(0656314, 'Jill', 'Scott', 'SONG', 8, 'Voice', 'jscott@jaredbaca.com')`;

const populateLocations =
`INSERT INTO Location VALUES
('Practice Room - General', 130, 'A14', 'Practice Room'),
('Practice Room - General', 130, 'A12', 'Practice Room'),
('Practice Room - Baby Grand', 171, '110', 'Practice Room'),
('Practice Room - Concert Grand', 171, '106', 'Practice Room'),
('Practice Room - Drums', 921, 'B11', 'Practice Room'),
('Studio A', 150, '126', 'Studio'),
('Production Suite A', 160, 'B16', 'Production Suite'),
(NULL, 136, '116', 'Ensemble Room'),
('Studio B', 150, '127', 'Studio'),
('Large Ensemble Room', 130, '211', 'Ensemble Room'),
('Mastering Suite', 160, 'B253', 'Studio'),
('Analog Synth Room', 150, 'B51', 'Studio')`;

const populateEvents = 
`INSERT INTO Event(Start_Date, End_Date, Student_Id, Building, Room_No) VALUES
('2024-03-01 18:00:00', '2024-03-01 20:00:00', 0243347, 150, '127'),
('2024-03-01 18:00:00', '2024-03-01 20:00:00', 0161221, 136, '116'),
('2024-03-01 14:00:00', '2024-03-01 16:00:00', 0941178, 130, 'A14'),
('2024-03-01 20:00:00', '2024-03-01 22:00:00', 0161221, 160, 'B16')`;



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

    // POPULATE WITH INITIAL USERS
    connection.query(addInitialUsers, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Users added")
        }
        // connection.release()
    })

    // POPULATE WITH INITIAL LOCATIONS
    connection.query(populateLocations, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Locations added")
        }
        connection.release()
    })

    // POPULATE WITH INITIAL EVENTS
    connection.query(populateEvents, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Events added")
        }
        connection.release()
    })

})

