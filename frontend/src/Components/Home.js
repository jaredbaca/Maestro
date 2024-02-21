import React, { Component } from 'react';
import EventList from './EventList';
import Schedule from './Schedule';

function Home() {
    return(
        <div>
            <h1>Master Calendar</h1>
            <EventList />

        </div>
    )
}
export default Home;