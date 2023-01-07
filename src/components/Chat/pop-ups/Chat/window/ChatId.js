import React, { useRef,useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { FormText, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { Container, Row, Col, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import * as TiIcons from 'react-icons/ti'
import * as AiIcons from 'react-icons/ai'
import './chat.css'
import SendMsg from './sendMsg'
import user from '../../../../images/user.png'
const ChatId = ({action, chat_id, user}) =>{
    const {id}= useParams();
    
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/api/chats/" + chat_id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setItems(result["messages"]);
                },
            );
    }, []);
    console.log(chat_id)
   
    return (
        <>
        <div className='chatid'>
        <Container>
            <div>
            <Row>
                <Col>
                    <Container>
                    <Row>
                    <Col xs={1}>

                    </Col>
                    <Col xs={2}>
                                    <div className='carte '>
                                        
                                            <TiIcons.TiArrowBack size={40} className='back' onClick={() => action('back')}/>
                                       
                                    </div>
                                </Col>
                    </Row>
                   
                    {items.map(item => (
                                   <div className='message'>
                                    
                                        <p className='name'>{item.date_created}</p>
                                        
                                            <Card className='rounded-pill' >
                                                <Card.Body >
                                                    {item.content}
                                            </Card.Body>
                                            </Card>
                                        
                                            </div>
                    ))}
                



                 </Container>
            </Col>
            </Row></div>
                    <div>
                    <Row><Col>
                    <SendMsg chat_id={chat_id}/></Col></Row></div>
        </Container>
        </div></>
    )
}

export default ChatId;