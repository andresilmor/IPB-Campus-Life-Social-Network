
import React, { useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import Card from 'react-bootstrap/Card';
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { IconName } from "react-icons/bs";
import { Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import user from '../../images/user.png'
import { Container, Row, Col } from 'react-bootstrap';
import './Events.css'





export default function Events() {
  document.title = global.BASE_TITLE + " - Events"

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    location: "",
    address: "",
    event_day: "",
    event_hours: "",
    description: "",
    participants: {
      first_name: '',
      last_name: ''
    }
  });

  function createEvent() {
    navigate('new')
  }



  const [Events, setEvent] = useState(false)
  let navigate = useNavigate();
  function handleClose() {
    setEvent(false);
  }

  function onItemSelected(item) {
    setSelectedItem(item);
    setEvent(true);
    navigate('id')

  }

  useEffect(() => {
    fetch("http://localhost:8000/api/events")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>;
  }
  else {
    return (
      <>
      <Col md={9}>
        <Container >
          <Row >
            <Col md="5"><Button variant="secondary" onClick={createEvent}>Create New Event</Button></Col>

            <Col md="5">
              <form className="form-inline mt-4 mb-4">
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />

              </form>
            </Col>
          </Row>
          <Row>
            <Col>
              {items.map(item => (
                <Link to={item.id}>
                  <Card key={item.id} className='event' style={{ marginBottom: 15 }}  >
                    <Card.Header>
                      <Container>
                        <Row>
                          <Col> {item.location} </Col>
                          <Col>{item.address}</Col>
                          <Col></Col>
                          <Col>{item.event_day}</Col>
                        </Row>
                      </Container>

                    </Card.Header>

                    <Card.Body onClick={onItemSelected

                    } >
                      <h5> {item.description}</h5>
                    </Card.Body>
                  </Card></Link>

              ))

              }

            </Col>
            
          </Row>
        </Container>

        </Col>
        <Col xs={2}>

            </Col>

      </>


    )

  }



}


