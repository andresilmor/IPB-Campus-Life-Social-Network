import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user_store";
import axios from "axios";

export default function EditProfil() {
  const dispatch = useDispatch();

  const [id, setID] = useState("");
  var queryID = useParams()["id"];
  if (id != useParams()["id"]) {
    setID(queryID);
    fetch("http://localhost:8000/api/users/public/" + queryID)
      .then((result) => result.json())
      .then((result) => {
        setItem(result);

        setAvatar(result.profile_image);
      });
  }
  const [item, setItem] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    birthdate: "",
    degree: "",
    nationality: "",
    school: "",
    organization: "",
  });

  const [attachement, setAttachement] = useState("");

  const {
    first_name,
    last_name,
    email_address,
    birthdate,
    degree,
    profile_image,
    nationality,
    school,
    organization,
  } = item;
  const onChange = (e) => {
    setItem((prevInputs) => ({
      ...prevInputs,
      [e.target.id]: e.target.value,
    }));
  };

  const [userAvatar, setAvatar] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/users/public/" + id)
      .then((result) => result.json())
      .then((result) => {
        setItem(result);

        setAvatar(result.profile_image);
      });
  }, []);

  const [isPending, setIsPending] = useState("false");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      first_name,
      last_name,
      email_address,
      birthdate,
      degree,
      profile_image,
      nationality,
      school,
      organization,
    };
    const formData = new FormData();
    if (attachement) {
      formData.append("file", attachement, attachement.name);
    }
    formData.append("user_info", JSON.stringify(blog));
    setIsPending(true);
    await axios.put("http://localhost:8000/api/users/public/" + id, formData);
    setIsPending(false);

    dispatch(updateUser(blog));
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="editprofil">
              <div class="container bootstrap snippets bootdey">
                <h1 class="text-primary">Edit Profile</h1>
                <hr />
                <div class="row">
                  <div class="col-md-3">
                    <div class="text-center">
                      <img
                        src={userAvatar}
                        class="avatar img-circle img-thumbnail"
                        alt="avatar"
                      ></img>
                      <h6>Upload a different photo...</h6>

                      <input
                        type="file"
                        class="form-control"
                        onChange={(e) => setAttachement(e.target.files[0])}
                      />
                    </div>
                  </div>

                  <h3>Personal info</h3>

                  <form class="form-horizontal" role="form">
                    <div class="form-group">
                      <label class="col-lg-3 control-label">First name:</label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="first_name"
                          value={item.first_name}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">Last name:</label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="last_name"
                          value={item.last_name}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-lg-3 control-label">Email:</label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="email_address"
                          value={item.email_address}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">birthdate:</label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="birthdate"
                          value={item.birthdate}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">degrees:</label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="degree"
                          value={item.degree}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">nationality:</label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="nationality"
                          value={item.nationality}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">school:</label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="school"
                          value={item.school}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">
                        organization:
                      </label>
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          id="organization"
                          value={item.organization}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                      <div>
                        <Button variant="primary" onClick={handleSubmit}>
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <hr></hr>
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </>
  );
}
