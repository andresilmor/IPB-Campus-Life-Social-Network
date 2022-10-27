import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Row } from "react-bootstrap";
import ImageIcon from "@mui/icons-material/Image";
import FileIcon from "@mui/icons-material/FileCopy";
import { useSelector } from "react-redux";
import {
  CardActions,
  CardContent,
  Chip,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function NewDiscussion() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [values, setValues] = useState({
    author: {
      user_id: user._id.$oid,
      photo: user.profile_image,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  async function handleNewDiscussion() {
    const url = `${global.BASE_API_URL}/groups/${id}/publications`;
    await axios.post(url, values);
    navigate(-1);
  }

  function handleCancelButton() {
    navigate(-1);
  }

  return (
    <Container>
      <Row>
        <Col sm={10}>
          <OutlinedInput
            className="group-input"
            value={values.title}
            placeholder="Title"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Col>
        <Col sm={2}>
          <ImageIcon />
          <FileIcon />
        </Col>
        <Row>
          <TextField
            className="group-text-field"
            multiline
            value={values.content}
            rows={5}
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            placeholder="What you want to talk about?"
          />
        </Row>
        <Row
          style={{ marginTop: "1em", display: "flex", justifyContent: "end" }}
        >
          <Col sm={4}>
            <Button
              variant="secondary"
              style={{ marginRight: ".5em" }}
              onClick={handleCancelButton}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleNewDiscussion}>
              Save
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
