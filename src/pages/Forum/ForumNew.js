import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./Forum.css";
import * as TiIcons from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Chip, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ForumNew() {
  const [type, setType] = useState("F");
  const [attachement, setAttachement] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);
  const user = useSelector((state) => state.user);
  const [author, setAuthor] = useState({
    user_id: user.email_address.split("@")[0],
    photo: user.profile_image,
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const blog = { author, type, title, content, topics };
    formData.append("file", attachement, attachement.name);
    formData.append("blog", JSON.stringify(blog));
    await axios.post("http://localhost:8000/api/forums", formData);
    navigate("/forum");
  };
  //
  const [newTopic, setSearchNewTopic] = useState("");
  //
  function handleNewTopic(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!topics.includes(newTopic)) {
        topics.push(newTopic);
      }
      setSearchNewTopic("");
      return false;
    }
  }
  //
  function handleDeleteTopic(index) {
    topics.splice(index, 1);
    setTopics([...topics]);
  }
  return (
    <>
<Col md={9}>
      <Container>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h4>Add New Forum</h4>
                </Col>
                <Col xs={1}>
                  <div className="carte ">
                    <Link to={"/forum"}>
                      <TiIcons.TiArrowBack size={40} className="back" />
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={(e) => setAttachement(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="txt"
                  placeholder="Enter title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  placeholder="What do you want to ask?"
                  rows={3}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Row style={{ marginTop: "1em" }}>
                <Col sm={4}>
                  <OutlinedInput
                    className="search-input"
                    value={newTopic}
                    placeholder="Define your topics"
                    onChange={(e) => setSearchNewTopic(e.target.value)}
                    onKeyDown={handleNewTopic}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1em" }}>
                <Stack direction="row" spacing={1} style={{ flexWrap: "wrap" }}>
                  {topics.map((item, index) => {
                    return (
                      <Chip
                        key={index}
                        label={item}
                        onDelete={() => handleDeleteTopic(index)}
                        style={{ marginTop: "0.5em" }}
                      />
                    );
                  })}
                </Stack>
              </Row>
              <Row className="comments mt-5">
                <Col> </Col>
                <Col xs={1}>
                  <button class="btn" type="submit">
                    <AiIcons.AiFillPlusCircle size={40} className="back" />
                  </button>
                </Col>
              </Row>
              {/* This is
                            also a comment
                            <Button variant="text" type="submit">
                                submit
                            </Button>
    */}
            </Form>
          </Col>
       
        </Row>
      </Container>
      </Col>
      <Col xs={2}>
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
