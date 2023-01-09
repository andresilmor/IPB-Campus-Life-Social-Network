import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import { Link, useParams } from "react-router-dom";
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
import "./Forum.css";
import * as TiIcons from "react-icons/ti";
import * as AiIcons from "react-icons/ai";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { Chip } from "@mui/material";

export default function ForumId() {
  const { id } = useParams();

  const [item, setItem] = useState({
    author: {
      first_name: "",
    },
    id: 0,
    title: "",
    comments: [],
    topics: [],
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/forums/" + id)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setItem(result);
        setComments(result.comments);
      });
  }, []);

  const user = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  const [author, setAuthor] = useState({
    user_id: "",
    photo: "",
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const [content, setContent] = useState("");
  const [highlighted, setHighlighted] = useState(false);

  const commentSubmit = (e) => {
    e.preventDefault();
    const blog = { author, content, highlighted };
    fetch("http://localhost:8000/api/forums/comment/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log(blog);
      setContent("");
      setComments([...comments, blog]);
    });
  };
  if (user.type == "S") {


    return (
      <>
        <Col md={9}>
          <Container>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col xs={1}>
                      <Image
                        src={item.author.photo}
                        width="40"
                        height="40"
                        roundedCircle
                      />
                    </Col>
                    <Col>
                      <p className="name">
                        {" "}
                        {item.author.first_name}
                        {item.author.last_name}
                      </p>
                      <p>{user.id}</p>
                    </Col>
                    <Col xs={2}>
                      <div className="carte ">
                        <Link to={"/forum"}>
                          <TiIcons.TiArrowBack size={40} className="back" />
                        </Link>

                      </div>
                    </Col>
                  </Row>
                  <Row className="title">{item.content}</Row>
                  <Row className="attachment">
                    {item.attachement && item.attachement.endsWith(".pdf") ? (
                      <a href={item.attachement}>attachment</a>
                    ) : (
                      <Image src={item.attachement} />
                    )}
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col xs={5}>
                      <div className="side">
                        {item.topics.map((value) => (
                          <Chip label={value} />
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  {comments.length > 0 &&
                    comments.map((comment) => {
                      return (
                        <div className="commentForum">
                          <p className="name">
                            {comment.author.first_name} {comment.author.last_name}
                          </p>
                          <Card className="rounded-pill" >
                            <Card.Body>{comment.content}</Card.Body>
                          </Card>
                        </div>
                      );
                    })}
                  <Row className="comments mt-5">
                    <Form onSubmit={commentSubmit}>
                      <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            className="rounded-pill"
                            type="text"
                            placeholder="Add Comment"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={1}>
                        <button class="btn" type="submit">
                          <AiIcons.AiFillPlusCircle size={40} className="back" />
                        </button>
                      </Col>
                    </Form>
                  </Row>
                </Container>
              </Col>

            </Row>
          </Container>
        </Col>
        <Col xs={2}>
          Topics of the day
          <div className="side">
            <Chip label="art" />
            <Chip label="java" />
            <Chip label="cats" />
          </div>

        </Col>
      </>
    );
  } else {
    return (
      <>
        <Col md={9}>
          <Container>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col xs={1}>
                      <Image
                        src={item.author.photo}
                        width="40"
                        height="40"
                        roundedCircle
                      />
                    </Col>
                    <Col>
                      <p className="name">
                        {" "}
                        {item.author.first_name}
                        {item.author.last_name}
                      </p>
                      <p>{user.id}</p>
                    </Col>
                    <Col xs={2}>
                      <div className="carte ">
                        <Link to={"/ManageForum"}>
                          <TiIcons.TiArrowBack size={40} className="back" />
                        </Link>

                      </div>
                    </Col>
                  </Row>
                  <Row className="title">{item.content}</Row>
                  <Row className="attachment">
                    {item.attachement && item.attachement.endsWith(".pdf") ? (
                      <a href={item.attachement}>attachment</a>
                    ) : (
                      <Image src={item.attachement} />
                    )}
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col xs={5}>
                      <div className="side">
                        {item.topics.map((value) => (
                          <Chip label={value} />
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  {comments.length > 0 &&
                    comments.map((comment) => {
                      return (
                        <div className="commentForum">
                          <p className="name">
                            {comment.author.first_name} {comment.author.last_name}
                          </p>
                          <Card className="rounded-pill" >
                            <Card.Body>{comment.content}</Card.Body>
                          </Card>
                        </div>
                      );
                    })}
                  <Row className="comments mt-5">
                    <Form onSubmit={commentSubmit}>
                      <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            className="rounded-pill"
                            type="text"
                            placeholder="Add Comment"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={1}>
                        <button class="btn" type="submit">
                          <AiIcons.AiFillPlusCircle size={40} className="back" />
                        </button>
                      </Col>
                    </Form>
                  </Row>
                </Container>
              </Col>

            </Row>
          </Container>
        </Col>
        <Col xs={2}>
          Topics of the day
          <div className="side">
            <Chip label="art" />
            <Chip label="java" />
            <Chip label="cats" />
          </div>

        </Col>
      </>

    );
  }
}
