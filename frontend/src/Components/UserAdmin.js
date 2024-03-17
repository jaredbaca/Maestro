import { Divider } from '@mui/material';
import React, { Component, useState } from 'react';
import {Container, Card, DropdownDivider, Form, FormControl, Button, Row, Col, InputGroup} from 'react-bootstrap';


function UserAdmin(props) {

    const [users, setUsers] = useState(["test user 1", "test user 2", "test user 3"])
    const [searchResults, setSearchResults] = useState(users)

    const handleChange = (event) => {
        setSearchResults(users.filter((user) => user.includes(event.target.value)))
    }

    return(
        <div>
            
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col className='text-center'>
                        <Row>
                        <Form className='m-3'>
                            <Row>
                                <Col xs={8}>
                                    <Form.Control placeholder='Search for a user' onChange={handleChange} />
                                </Col>
                                {/* <Col xs={1}>
                                    <Button type='submit'>Search</Button>
                                </Col> */}
                            </Row>
                        </Form>
                        </Row>
                    </Col>
                 
                    <Col className='text-center'>
                        <div className='m-3'>
                            <Button>Add User</Button>
                        </div>
                        
                    </Col>
                </Row>
               
                <div>
                    <Container>
                        <Card>
                            <Card.Body>

                                {searchResults.map((result) =>{
                                    return(
                                        <div>
                                            <p>{result}</p>
                                         <Divider></Divider>
                                        </div>  
                                    )
                                }
                                )}
                                {/* <p>test user 1</p>
                                <Divider></Divider>

                                <p>test user 2</p>
                                <Divider></Divider>

                                <p>test user 3</p>
                                <Divider></Divider> */}

                            </Card.Body>
                        </Card>
                    </Container>
                        
                </div>
            </Container>
        </div>
    )
}

export default UserAdmin;