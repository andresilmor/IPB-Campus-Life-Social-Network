import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import classes from './Home.module.css'
import { CreatePost } from '../../components/inputField';
import { HomePost } from '../../components/cards';





export default function Home() {
  document.title = global.BASE_TITLE + " - Home"

  window.history.replaceState(null, document.title, "/home")
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8000/api/posts")
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
    
    console.log(items)
    return (

      <>
        
            <Col md={8} className="ms-4">

              <CreatePost></CreatePost>

              <br />
              {items.map(item => (
                <>
                  {item.author.first_name.length > 0  &&
                  <Row className="mb-4">
                    <HomePost item={item} ></HomePost>
                  </Row>
                  }
                </>
              ))}

            </Col>
            <Col md={3}></Col>
     

      </>

    )

  }
}
