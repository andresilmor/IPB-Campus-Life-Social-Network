import React, { useState } from 'react'
import { Col, Container, Row, Button, FormControl, InputGroup } from 'react-bootstrap'
import * as AiIcons from 'react-icons/ai'
import Form from 'react-bootstrap/Form'
import * as TiIcons from 'react-icons/ti'
import { Link, useNavigate } from "react-router-dom";
import './chat.css'
export default function SendMsg({chat_id}) {
    const [sender_id, setType] = useState('a454')
    const [content, setContent] = useState('')
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { content,sender_id};
        var myHeader= new Headers();
        myHeader.append("Content-Type", "application/json");
        myHeader.append("access-control-allow-origin", "http://localhost:8000" );
        myHeader.append("Access-Control-Allow-Headers","X-Requested-With" );
    

        fetch("http://localhost:8000/api/chats/" + chat_id, {
            method: 'POST',
            headers: myHeader,
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("sent");
            
        })}
 

        
    return (
        
        
        <div style={{position:'fixed',bottom:'112px',right:'80px'}}>
                <Container>
                <Form onSubmit={handleSubmit}>
                <Row className='MessageSend' >
                        <Col>
                            
                                <Form.Group className="mb-3" controlId="formBasictext">
                                    <Form.Control className='rounded-pill' type="text" placeholder="Send"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)} />
                                </Form.Group>
                        
                        </Col>
                        <Col xs={2}>
                        <button class="btn" type="submit"><AiIcons.AiFillPlusCircle size={40} className='back' /></button>

                        </Col>
                    </Row>
                    </Form>
                </Container>
        </div>
    )
    }