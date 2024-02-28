import React, { Component } from 'react';
import { Container, Grid } from 'react-bootstrap';
import {Chip} from '@mui/material';

// Comonent for showing available times as chips. Not currently used.

function TimeSlots() {
    return(
        <Container className='mb-3'>
            <Grid container spacing={2}>
                {times.map((time, index) => (
                <Grid item xs={4} key={index}> {/* Each chip occupies 4 columns on small devices */}
                    <Chip label={time} variant="outlined" />
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}