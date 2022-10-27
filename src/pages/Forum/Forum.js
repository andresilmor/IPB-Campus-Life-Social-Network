import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FormText, Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import user from "../../images/user.png";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import "./Forum.css";
import { Chip } from "@mui/material";

export default function Forum() {
  document.title = global.BASE_TITLE + " - Fórums";

  const navigate = useNavigate();
  function NewForum() {
    navigate("new");
  }

  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    author: {
      user_id: "",
      first_name: "",
      last_name: "",
    },
    solved: "",
    title: "",
    date_created: "",
    topics: [],
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/forums")
      .then((res) => res.json())
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
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(items);
    return (
      <>
         <Col md={9}>
        <Container>
          <Row>
            <Col>
              <Container>
                <Row>
                  <Col>
                    <Button className="forumbtn" onClick={NewForum}>
                      Create New Forum
                    </Button>
                  </Col>

                  <Col>
                    <InputGroup className="mb-3">
                      <FormControl
                        className="search"
                        placeholder="Or Search About"
                        aria-label="Or Search About"
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                      />
                      <InputGroup.Text id="basic-addon2">
                        {" "}
                        <AiIcons.AiOutlineSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
              {items
                .filter((item) => {
                  if (search == "") {
                    return item;
                  } else if (
                    item.title
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => (
                  <Link to={item.id}>
                    <Card key={item.id} className="forum">
                      <Card.Header>
                        <Container>
                          <Row>
                            <Col xs={1}>
                              <Image
                                src={item.author.photo || user}
                                width="40"
                                height="40"
                                roundedCircle
                              />
                            </Col>
                            <Col>
                              <p className="name">
                                {" "}
                                {item.author.first_name} {item.author.last_name}
                              </p>
                              {item.author.user_id}
                            </Col>
                            <Col xs={4}>
                              {item.topics.map((value) => (
                                <Chip label={value} />
                              ))}
                            </Col>
                          </Row>
                        </Container>
                      </Card.Header>
                      <Card.Body>
                        <Container>
                          <Row className="title">
                            <h5> {item.title}</h5>
                          </Row>
                        </Container>
                      </Card.Body>
                    </Card>
                  </Link>
                ))}
            </Col>
          </Row>
        </Container>
        </Col>
        <Col md={2}>
        Topics of the day
              <div className="side">
                <button type="button" class="btn btn-outline-secondary">
                  Canteen
                </button>
                <button type="button" class="btn btn-outline-secondary">
                  Help
                </button>
                <button type="button" class="btn btn-outline-secondary">
                  IPB
                </button>
              </div>
        </Col>
      </>
    );
  }
}
