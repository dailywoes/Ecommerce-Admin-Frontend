/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index for the sign up page of the admin panel.
 */

//libraries
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom";

//class objects
import Input from "../../components/UI/Input";
import Layout from "../../components/Layout";
import {signup} from '../../actions';


const Signup = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userSignup = (e) => {

        e.preventDefault();

        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user));
    }

    if (auth.authenticate) {
        return <Redirect to={'/admin/'}/>
    }

    if(user.loading){
        return <p>Loading...!</p>
    }


    return (
        <Layout>
            <Container>
                { user.message }
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label='First Name'
                                        placeholder='First Name'
                                        value={firstName}
                                        type='text'
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label='Last Name'
                                        placeholder='Last Name'
                                        value={lastName}
                                        type='text'
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label='Email'
                                placeholder='Email'
                                value={email}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label='Password'
                                placeholder='Password'
                                value={password}
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup