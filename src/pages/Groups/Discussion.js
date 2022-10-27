import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import * as TiIcons from "react-icons/ti";
import {
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { style } from "@mui/system";
export default function Discussion() {
  const { id, discussionId } = useParams();
  const [commentValue, setCommentValue] = useState("");
  const navigate = useNavigate();
  const [publication, setPublication] = useState({});
  const user = useSelector((state) => state.user);

  async function fetchData() {
    const url = `${global.BASE_API_URL}/posts/${discussionId}?type=group`;
    const r = await axios.get(url);

    setPublication(r.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleBack() {
    navigate(-1);
  }
  async function handleComment() {
    const url = `${global.BASE_API_URL}/groups/${id}/publication/${discussionId}/comment`;
    const r = await axios.post(url, {
      author: {
        user_id: user._id.$oid,
        photo: user.profile_image,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      content: commentValue,
    });
    setCommentValue("");
    fetchData();
  }
  return (
    <Container>
      <Row style={{ display: "flex" }}>
        <Col sm={10}>
          <Typography sx={{ fontSize: "2.5em", fontWeight: "bold" }}>
            {publication.title}
          </Typography>
        </Col>
        <Col sm={2}>
          <IconButton onClick={handleBack}>
            <TiIcons.TiArrowBack size={40} className="back" />
          </IconButton>
        </Col>
      </Row>
      <Row>
        <Typography sx={{ fontSize: "1.5em" }} color="text.primary">
          {publication.content}
        </Typography>
      </Row>
      {publication.author && (
        <Row>
          <Typography sx={{ fontSize: "0.8em" }} color="text.primary">
            {`Author: ${publication.author.first_name} ${publication.author.last_name}`}
          </Typography>
        </Row>
      )}
      <Divider style={{ marginTop: "1em" }} />
      <Row>
        {publication.comments && publication.comments.length > 0 && (
          <Typography style={{ marginTop: "1em" }} variant="h6">
            Comments
          </Typography>
        )}
        {publication.comments &&
          publication.comments.map((comment) => {
            return (
              <Row key={comment.date_created}>
                <Typography
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                  color="text.secondary"
                  style={{ marginTop: "0.5em" }}
                  gutterBottom
                >
                  {comment.author.first_name} {comment.author.last_name}
                </Typography>
                <Card sx={{ minWidth: 275 }} style={{ borderRadius: "1em" }}>
                  <CardContent style={{ padding: "0.5em" }}>
                    <Typography variant="body2">{comment.content}</Typography>
                  </CardContent>
                </Card>
              </Row>
            );
          })}
      </Row>
      <Row style={{ marginTop: "1em" }}>
        <Col sm={10}>
          <OutlinedInput
            className="search-input"
            value={commentValue}
            placeholder="Leave your comment here."
            onChange={(e) => setCommentValue(e.target.value)}
          />
        </Col>
        <Col sm={2}>
          <IconButton size="large" onClick={handleComment}>
            <SendIcon />
          </IconButton>
        </Col>
      </Row>
    </Container>
  );
}
