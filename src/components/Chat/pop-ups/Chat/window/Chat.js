import React, { useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import user from '../../../../images/user.png'
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai'
import './chat.css'
import { Input } from "antd";
////////////////////////////////////

const Chat = ({action,onChange, onSearch, ...props}) => {
    const [search, setSearch] = useState('');
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

    const [values, setValues] = useState({
        user_id: "62aa1a6e4ec1f2cb1aab5aef",
      });
    useEffect(() => {
        fetch("http://localhost:8000/api/chats/list/62aa1a6e4ec1f2cb1aab5aef")
      .then(res => res.json())
            .then((result) => {
                setItems(result);
              
            });

    }, [])
console.log(items)

        return (

            <div className='chat' >
                {items.filter((item)=>{
                                if (search==""){
                                    return item
                                }else if (item.user.first_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                                    return item
                                }
                            }).map(item => (
                 
                 <Card key={item.id} className='chat border-0' >
                     <Card.Body onClick={() => action(item.id,item.user)}  >
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
            
                <div style={{position:'fixed',bottom:'112px',right:'80px'}}>
                <Container>
                <Row className='chatsearch' >
                        <Col>
                            <div {...props}>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control className='rounded-pill' type="text"
                                     placeholder="Search" onChange={(event)=>{
                                        setSearch(event.target.value)
                                     }} />
                                </Form.Group>
                            </Form>
                            </div>
                            
            
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


export default Chat
  

/////////////////////////////////////////////
