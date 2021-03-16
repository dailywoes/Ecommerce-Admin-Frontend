/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index for the sign in page of the admin panel.
 */

//libraries
import {Container, Form, Row, Col, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';

//class objects
import Input from "../../components/UI/Input";
import Layout from '../../components/Layout'
import {login} from '../../actions';


const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to={'/admin/'}/>
    }

    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
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

export default Signin