const dotenv = require('dotenv');
dotenv.config({ path: '.././.env' });
const mysql = require('mysql2'); 
// Does not use pool from the db.js file because that one uses Promise Wrapper 

/**
 * This file will seed the MySQL database with initial data. It will not create the database, but
 * will create the necessary tables and rows if the database already exists.
 * 
 * To get started, create a MySQL database and user. Add the host, username, password, and database name
 * to the .env file with the variables properly named. When run, this script will create tables (if they dont' exist)
 * and insert rows(if tables are empty). It will not remove any data, and it will not insert rows into non-empty tables.
 */

//   // Using hard coded values
//   const connection = mysql.createConnection({
//     "host": "localhost",
//     "user": "admin",
//     "password": "CS602_Admin",
//     "database": "CS602_FinalProject2",
//     "timezone": 'Z'
// });

// Using environment variables
const connection = mysql.createConnection({
    "host": process.env.HOST,
    "user": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.DB_NAME,
    "timezone": 'Z'
});

const createUserTable =
`CREATE TABLE IF NOT EXISTS User (
    id int NOT NULL,
    First varchar(45) DEFAULT NULL,
    Last varchar(45) DEFAULT NULL,
    Major varchar(45) DEFAULT NULL,
    Semester int DEFAULT NULL,
    Instrument varchar(45) DEFAULT NULL,
    Email varchar(45) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY Student_id_idx (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

  const createLocationTable =
  `CREATE TABLE IF NOT EXISTS Location (
    Name varchar(45) DEFAULT NULL,
    Building int NOT NULL,
    Room_No varchar(45) NOT NULL,
    Type varchar(45) DEFAULT NULL,
    PRIMARY KEY (Building, Room_No),
    KEY Building_Idx (Building),
    KEY Room_No_Idx (Room_No)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

  const createEventTable =
  `CREATE TABLE IF NOT EXISTS Event (
    ID int NOT NULL AUTO_INCREMENT,
    Start_Date datetime NOT NULL,
    End_Date datetime DEFAULT NULL,
    Student_Id int DEFAULT NULL,
    Building int NOT NULL,
    Room_No varchar(45) NOT NULL,
    PRIMARY KEY (ID),
    KEY Student_Id_idx (Student_Id),
    KEY Building_idx (Building),
    KEY Room_No_idx (Room_No),
    CONSTRAINT Building FOREIGN KEY (Building) REFERENCES Location (Building) ON UPDATE CASCADE,
    CONSTRAINT Room_No FOREIGN KEY (Room_No) REFERENCES Location (Room_No) ON UPDATE CASCADE,
    CONSTRAINT Student_Id FOREIGN KEY (Student_Id) REFERENCES User (id) ON DELETE SET NULL ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

const populateUserTable = 
`INSERT INTO User 
SELECT *
FROM (
	VALUES
	ROW(0505567, 'Jared', 'Baca', 'CWP', 7, 'Trumpet', 'jbaca@jaredbaca.com'), 
	ROW(0354121, 'Amadeus', 'Mozart', 'COMP', 1, 'Piano', 'amozart@jaredbaca.com'), 
	ROW(0583983, 'John', 'Lennon', 'SONG', 5, 'Guitar', 'jlennon@jaredbaca.com'), 
	ROW(0996352, 'John', 'Williams', 'FS', 8, 'Piano', 'jwilliams@jaredbaca.com'), 
	ROW(0583986, 'Wayne', 'Shorter', 'PERF', 3, 'Saxophone', 'wshorter@jaredbaca.com'), 
	ROW(0154027, 'Quincy', 'Jones', 'MPE', 2, 'Trumpet', 'qjones@jaredbaca.com'), 
	ROW(0161221, 'Bootsy', 'Collins', 'PERF', 4, 'Bass', 'bcollins@jaredbaca.com'), 
	ROW(0634144, 'Ludwig','Goransson',	'FS', 6, 'Piano', 'lgoransson@jaredbaca.com'), 
	ROW(0941178, 'Yo Yo', 'Ma', 'PERF', 2, 'Cello', 'yma@jaredbaca.com'), 
	ROW(0307449, 'Hans', 'Zimmer', 'EPD', 5, 'Piano', 'hzimmer@jaredbaca.com') ,
	ROW(0243347, 'Haley', 'Williams', 'MPE', 4, 'Voice', 'hwilliams@jaredbaca.com'), 
	ROW(0965841, 'Jack' , 'White', 'CWP', 3, 'Guitar', 'jwhite@jaredbaca.com'), 
	ROW(0656314, 'Jill', 'Scott', 'SONG', 8, 'Voice', 'jscott@jaredbaca.com')
    ) as initial_users

WHERE NOT EXISTS (
SELECT NULL 
FROM User
)`;

const populateLocationTable = 
`INSERT INTO Location 
SELECT *
FROM (
	VALUES
	ROW('Practice Room - General', 130, 'A14', 'Practice Room'),
    ROW('Practice Room - General', 130, 'A12', 'Practice Room'),
    ROW('Practice Room - Baby Grand', 171, '110', 'Practice Room'),
    ROW('Practice Room - Concert Grand', 171, '106', 'Practice Room'),
    ROW('Practice Room - Drums', 921, 'B11', 'Practice Room'),
    ROW('Studio A', 150, '126', 'Studio'),
    ROW('Production Suite A', 160, 'B16', 'Production Suite'),
    ROW(NULL, 136, '116', 'Ensemble Room'),
    ROW('Studio B', 150, '127', 'Studio'),
    ROW('Large Ensemble Room', 130, '211', 'Ensemble Room'),
    ROW('Mastering Suite', 160, 'B253', 'Studio'),
    ROW('Analog Synth Room', 150, 'B51', 'Studio')
        ) as initial_locations

WHERE NOT EXISTS (
SELECT NULL 
FROM Location
)`;

const populateEventTable = 
`INSERT INTO Event(Start_Date, End_Date, Student_Id, Building, Room_No)
SELECT *
FROM (
	VALUES
	ROW('2024-03-01 18:00:00', '2024-03-01 20:00:00', 0243347, 150, '127'),
    ROW('2024-03-01 18:00:00', '2024-03-01 20:00:00', 0161221, 136, '116'),
    ROW('2024-03-01 14:00:00', '2024-03-01 16:00:00', 0941178, 130, 'A14'),
    ROW('2024-03-01 20:00:00', '2024-03-01 22:00:00', 0161221, 160, 'B16')
        ) as initial_events

WHERE NOT EXISTS (
SELECT NULL 
FROM Event
)`;


// CREATE USER TABLE
connection.query(createUserTable, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log("User Table Created")
    }
})

// CREATE LOCATION TABLE
connection.query(createLocationTable, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Location Table Created")
    }
})

// CREATE EVENT TABLE
connection.query(createEventTable, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Event Table Created")
    }
})

// POPULATE WITH INITIAL USERS
connection.query(populateUserTable, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Users added")
    }
})

// POPULATE WITH INITIAL LOCATIONS
connection.query(populateLocationTable, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Locations added")
    }
})

// POPULATE WITH INITIAL EVENTS
connection.query(populateEventTable, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Events added")
    }
})

connection.end();


