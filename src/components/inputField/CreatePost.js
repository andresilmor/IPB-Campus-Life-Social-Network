import React, { useState } from 'react'
import classes from "./CreatePost.module.css"
import { Avatar } from "@mui/material"
import { Row, Card, Container, Col, InputGroup, FormControl, Form } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextWithImage from './TextWithImage';

const CreatePost = () => {

  const [type, setType] = useState('P')
  const [content, setContent] = useState('')
  const [attachment, setAttachment] = useState('')
  const user = useSelector((state) => state.user);


 
  const [author, setAuthor] = useState({
    user_id: user.email_address.split("@")[0],
    photo: user.profile_image,
    first_name: user.first_name,
    last_name: user.last_name
  })

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { type, content, attachment, author };
    setAttachment("")
    console.log(JSON.stringify(blog))
 
    fetch("http://localhost:8000/api/posts", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log(blog);
      navigate('/home');
    })
  }

  console.log(attachment)
  return (
    <>
      <Row className={classes.createPost}>
        <div></div>
        <Card style={{ width: '100%' }} >
          <Card.Body style={{padding: '0'}}>
            <Form onSubmit={handleSubmit}>
              <Container>
                <Row>
                  <Col className={classes.inputGroup}>
                    <TextWithImage setContent={setContent} content={content} setAttachment={setAttachment} attachment={attachment}  ></TextWithImage>
                  </Col>
              
                </Row>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </>
  )
}

export default CreatePost