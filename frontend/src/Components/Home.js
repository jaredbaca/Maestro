import React, { Component } from 'react';
import EventList from './EventList';
import Schedule from './Schedule';
import NavBar from './NavBar';

function Home() {

    return(
        <div>
            {/* <h1>Master Calendar</h1> */}
            <NavBar />
            <EventList />

        </div>
    )
}
export default Home;