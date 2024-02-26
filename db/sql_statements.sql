INSERT into Location
VALUES('Practice Room - General', 130, 'A14', 'Practice Room'); 

INSERT into Location
VALUES('Practice Room - Baby Grand', 171, '106', 'Practice Room'); 

/*
SCHEMA

User (ID, First, Last, Major, Semester, Instrument, Email)
Location (Name, Building, Room_No, Type)
Events (ID, Start_Date, End_Date, Student_Id, Building, Room_No)
*/

/* USERS */
(0354121, 'Amadeus', 'Mozart', 'COMP', 1, 'Piano' 'amozart@jaredbaca.com'),
(0583983, 'John', 'Lennon', 'SONG', 5, 'Guitar', 'jlennon@jaredbaca.com'),
(0996352, 'John', 'Williams', 'FS', 8, 'Piano', 'jwilliams@jaredbaca.com'),
(0583986, 'Wayne', 'Shorter', 'PERF', 3, 'Saxophone', 'wshorter@jaredbaca.com'),
(0154027, 'Quincy', 'Jones', 'MPE', 2, 'Trumpet', 'qjones@jaredbaca.com'),
(0161221, 'Bootsy', 'Collins', 'PERF', 4, 'Bass', 'bcollins@jaredbaca.com'),
(0634144, 'Ludwig','Goransson',	'FS', 6, 'Piano', 'lgoransson@jaredbaca.com'),
(0941178, 'Yo Yo', 'Ma', 'PERF', 2, 'Cello', 'yma@jaredbaca.com'),
(0307449, 'Hans', 'Zimmer', 'EPD', 5, 'Piano', 'hzimmer@jaredbaca.com'),
(0243347, 'Haley', 'Williams', 'MPE', 4, 'Voice', 'hwilliams@jaredbaca.com'),
(0965841, 'Jack' , 'White', 'CWP', 3, 'Guitar', 'jwhite@jaredbaca.com'),
(0656314, 'Jill', 'Scott', 'SONG', 8, 'Voice', 'jscott@jaredbaca.com')

/* LOCATIONS */
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
('Analog Synth Room', 150, 'B51', 'Studio')

/* EVENTS*/
('2024-03-01 18:00:00', '2024-03-01 20:00:00', 0243347, 150, '127'),
('2024-03-01 18:00:00', '2024-03-01 20:00:00', 0161221, 136, '116'),
('2024-03-01 14:00:00', '2024-03-01 16:00:00', 0941178, 130, 'A14'),
('2024-03-01 20:00:00', '2024-03-01 22:00:00', 0161221, 160, 'B16')

