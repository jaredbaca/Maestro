    
    /* Provides a hard coded list of location objects by default so that when the master schedule loads 
    *  it is not missing locations. When locations are successfully loaded from the database, 
    *  the list will update accordingly to account for any new locations that may have been added to the DB.
    */

const defaultLocations = [
    {Name: 'Practice Room - General', Building: 130, Room_No: 'A14', Type: 'Practice Room'},
    {Name: 'Practice Room - General', Building: 130, Room_No: 'A12', Type: 'Practice Room'},
    {Name: 'Practice Room - Baby Grand', Building: 171, Room_No: '110', Type: 'Practice Room'},
    {Name: 'Practice Room - Concert Grand', Building: 171, Room_No: '106', Type: 'Practice Room'},
    {Name: 'Practice Room - Drums', Building: 921, Room_No: 'B11', Type: 'Practice Room'},
    {Name: 'Studio A', Building: 150, Room_No: '126', Type: 'Studio'},
    {Name: 'Production Suite A', Building: 160, Room_No: 'B16', Type: 'Production Suite'},
    {Name: undefined, Building: 136, Room_No: '116', Type: 'Ensemble Room'},
    {Name: 'Studio B', Building: 150, Room_No: '127', Type: 'Studio'},
    {Name: 'Large Ensemble Room', Building: 130, Room_No: '211', Type: 'Ensemble Room'},
    {Name: 'Mastering Suite', Building: 160, Room_No: 'B253', Type: 'Studio'},
    {Name: 'Analog Synth Room', Building: 150, Room_No: 'B51', Type: 'Studio'}
]

module.exports.defaultLocations = defaultLocations;