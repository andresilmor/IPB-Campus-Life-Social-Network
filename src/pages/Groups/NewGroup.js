import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Row } from "react-bootstrap";
import ImageIcon from "@mui/icons-material/Image";
import SearchIcon from "@mui/icons-material/Search";
import {
  CardActions,
  CardContent,
  Chip,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function NewGroup() {
  const [values, setValues] = useState({
    name: "",
    avatar: "",
    description: "",
    topics: [],
  });
  const [newTopic, setSearchNewTopic] = useState("");
  const navigate = useNavigate();

  function handleNewGroup() {
    navigate("new");
  }

  async function handleSubmitNewGroup() {
    const url = `${global.BASE_API_URL}/groups`;
    const formData = new FormData();

    // Update the formData object
    formData.append("file", values.avatar, values.avatar.name);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("topics", values.topics.toString());
    await axios.post(url, formData);
    navigate(-1);
  }

  function handleCancelNewGroup() {
    navigate(-1);
  }

  function handleNewTopic(e) {
    if (e.key === "Enter") {
      if (!values.topics.includes(newTopic)) {
        values.topics.push(newTopic);
      }
      setSearchNewTopic("");
    }
  }

  function handleDeleteTopic(index) {
    values.topics.splice(index, 1);
    setValues({ ...values, topics: values.topics });
  }

  function handleClick(e) {
    console.log(e.label);
  }

  function handleFileUpload(event) {
    setValues({ ...values, avatar: event.target.files[0] });
  }

  return (
    <>
    <Col md={9}>
    <Container>
      <Row>
        <Col sm={7}>
          <OutlinedInput
            className="group-input"
            value={values.name}
            placeholder="Name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </Col>
        <Col sm={5}>
          <input type="file" onChange={handleFileUpload} />
        </Col>
        <Row>
          <TextField
            className="group-text-field"
            multiline
            value={values.description}
            rows={5}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            placeholder="Describe your group"
          />
        </Row>
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
            {values.topics.map((item, index) => {
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
        <Row
          style={{ marginTop: "1em", display: "flex", justifyContent: "end" }}
        >
          <Col sm={4}>
            <Button
              variant="secondary"
              style={{ marginRight: ".5em" }}
              onClick={handleCancelNewGroup}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitNewGroup}
              disabled={
                values.description.length === 0 || values.name.length === 0
              }
            >
              Save
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
    </Col>
    </>
  );
}
