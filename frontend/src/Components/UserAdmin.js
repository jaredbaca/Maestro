import { Divider } from '@mui/material';
import React, { Component, useState, useEffect } from 'react';
import {Container, Card, DropdownDivider, Form, FormControl, Button, Row, Col, InputGroup} from 'react-bootstrap';


function UserAdmin(props) {

    const [users, setUsers] = useState([])
    const [searchResults, setSearchResults] = useState(users)

    const handleChange = (e) => {
        setSearchResults(users.filter((user) => Object.values(user).toString().includes(e.target.value)))
    }

    useEffect(() => {

        const fetchUsers = async() => {
            const response = await fetch('/users');
            const data = await response.json();
            if(response.ok) {
                setUsers(data);
                setSearchResults(data);
                console.log(data);
            }   
        };
        fetchUsers();
    }, []);

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

                                {searchResults.length > 0 ? searchResults.map((user, index) =>{
                                    return(
                                        <div>
                                            <Row>
                                                <Col>{user.id}</Col>
                                                <Col>{user.First}</Col>
                                                <Col>{user.Last}</Col>
                                                <Col>{user.Major}</Col>
                                                <Col>{user.Semester}</Col>
                                                <Col>{user.Instrument}</Col>
                                                <Col>{user.Email}</Col>
                                            </Row>
                                            {/* <p key={index}>{user.First}</p> */}
                                         <Divider></Divider>
                                        </div>  
                                    )
                                }
                                ) : <p>No Results</p>} 
                                
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