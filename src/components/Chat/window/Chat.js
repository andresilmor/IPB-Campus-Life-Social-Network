import React, { useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import user from '../../../../images/user.png'
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai'
import './chat.css'

////////////////////////////////////

const Chat = ({action}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState({
        user: {
            first_name: '',
            last_name: ''
        },

    });
    
/////////////////////////////////////


    // const [forumModal, setForumModal] = useState(false)
    // let navigate = useNavigate();
    // function handleClose() {
    //     setForumModal(false);
    // }

    // function onItemSelected() {
    //     //setSelectedItem(item)
    //     //setForumModal(true);
    // }

    useEffect(() => {
        fetch("http://localhost:8000/api/chats")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='chat' >
                
                 {items.map(item => (
                 
                    <Card key={item.id} className='chat border-0' >
                        <Card.Body onClick={() => action(item.id)}  >
                            <Container>
                                <Row>
                                    <Col xs={2}>
                                        <Image src={user} width="40" height="40" roundedCircle /></Col>
                                    <Col>
                                        <p> {item.user.first_name} {item.user.last_name}</p>
                                    </Col>
                                </Row>

                            </Container>
                        </Card.Body>
                    </Card>
                    
                    ))}
                
                <div>
                <Container>
                <Row className='chatsearch' >
                        <Col>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control className='rounded-pill' type="text" placeholder="Search" />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={2}>
                            <AiIcons.AiFillPlusCircle size={40} className='back' />
                        </Col>
                    </Row>
                </Container>
                </div>
                
                 
            </div >

        )
    }
}

export default Chat
  

/////////////////////////////////////////////
