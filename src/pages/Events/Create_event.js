import React, { useState, useEffect, forwardRef } from 'react'
import useFetch from "react-fetch-hook";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { IconName } from "react-icons/bs";
import { Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import user from '../../images/user.png'
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from "react-redux";
import axios from "axios";

import './Events.css';

export default function CreateEvent() {
  const [type, setType] = useState("E");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user);
  const [author, setAuthor] = useState({
    user_id: user.email_address.split("@")[0],
    photo: user.profile_image,
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [event_day, setEvent_day] = useState("");
  const [event_hours, setEvent_hours] = useState("");
  const [official, setOfficial] = useState(false);
  const [checked, setChecked] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   const blog = { author, type, title, content, description, organization, location, address, event_day, event_hours, official };
  //   formData.append("blog", JSON.stringify(blog));
  //   console.log(blog);
  //   console.log(formData);
  //   await axios.post("http://localhost:8000/api/events", formData);

  //   navigate("/events");
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(checked ? "Bragança" : "Mirandela")
    const blog = { author, type, title, content, description, organization, location, address, event_day, event_hours, official };
    fetch("http://localhost:8000/api/events", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log(blog);
      navigate('/events')
    })
  }



  return (
    <>
    <Col md={9}>
      <Container>
        <Row>
          <Col ><h1><p>Create Event</p></h1></Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Control type="text" placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Control type="textarea" placeholder="Introduce your Event"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Control as="textarea" rows={3} placeholder="Speak more about Event"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>  <h2><p>Event specification</p></h2></Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' >
                <Form.Control type="text" placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Check
                type="switch"
                value={location}
                onChange={
                  (e) => {

                    setChecked(e.target.checked)
                    setLocation(checked ? "Bragança" : "Mirandela")
                  }}
                label={checked ? "Bragança" : "Mirandela"}
              />

            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Control
                  type="date"
                  value={event_day}
                  onChange={(e) => setEvent_day(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Control
                  type="time"
                  value={event_hours}
                  onChange={(e) => setEvent_hours(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Select
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Organization"
                >
                  <option disabled>Published by</option>
                  <option value="Student organization">Student organization</option>
                  <option value="IPB Administration">IPB Administration</option>
                  <option value="estig">ESTiG</option>
                </Form.Select>
              </Form.Group>
            </Col>

          </Row>
          <div className='text-center'>
            <Button variant='secondary' type='submit' >ADD </Button>
          </div>

        </Form>
      </Container>
      </Col>

    </>
  )

}
