import React, { useState } from 'react'
import { Col, Container, Row, Button, FormControl, InputGroup } from 'react-bootstrap'
import * as AiIcons from 'react-icons/ai'
import Form from 'react-bootstrap/Form'
import * as TiIcons from 'react-icons/ti'
import { Link, useNavigate } from "react-router-dom";
import './Chat.css'
import { useSelector } from 'react-redux'


export default function SendMsg({chat_id, exist}) {

    const user = useSelector((state) => state.user);

    const [sender_id, setType] = useState(user.user_id)
    const [content, setContent] = useState('')

    const [chatID, setChatID] = useState(chat_id)
    const [chatExists, setChatExists] = useState(exist)


    const [newChat, setNewChat] = useState({
        messages: [{
            content: content,
            sender_id: sender_id
        }],
        user: {
            user_id: chatID,
            photo: "",
            first_name: "",
            last_name: ""
        },
        user_creator: {
            user_id: user.user_id,
            photo: "",
            first_name: user.first_name,
            last_name: user.last_name
        }
    })

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        var myHeader= new Headers();
        myHeader.append("Content-Type", "application/json");
        myHeader.append("access-control-allow-origin", "http://localhost:8000" );
        myHeader.append("Access-Control-Allow-Headers","X-Requested-With" );
    

        if (chatExists) {
    console.log(chatID)
            const blog = { content,sender_id};
            fetch("http://localhost:8000/api/chats/" + chatID, {
                method: 'POST',
                headers: myHeader,
                body: JSON.stringify(blog)
            }).then(() => {
                console.log("sent");
                
            })
        } else {
            
            newChat.messages[0].content = content;
            console.log( JSON.stringify(newChat));
            fetch("http://localhost:8000/api/chats", {
                method: 'POST',
                headers: myHeader,
                body: JSON.stringify(newChat)
            }).then(res => res.json())
            .then(
                (result) => {
                    setChatID(result['chat_id'])
                    setChatExists(false)
                },
            );
        }
    }
 

        
    return (
        
        
        
                <Container >
                <Form onSubmit={handleSubmit}>
                <Row className='MessageSend' >
                        <Col>
                            
                                <Form.Group className="mb-3" controlId="formBasictext">
                                    <Form.Control className='rounded-pill' type="text" placeholder="Send"
                                    value={content}
                                    onChange={(e) => { setContent(e.target.value)}} />
                                </Form.Group>
                        
                        </Col>
                        <Col xs={1}>
                        <button class="btn" type="submit" style={{position:'fixed',right:'20px',bottom:'128px'}} ><AiIcons.AiFillPlusCircle size={40} className='back' /></button>

                        </Col>
                    </Row>
                    </Form>
                </Container>
        
    )
    }