import { React, useState } from "react";
import classes from "./Login.module.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ButtonFilled } from "../../buttons";
import { VpnLock } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/user_store";

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email_address: "",
    password: "",
  });

  function authenticate(event) {
    event.preventDefault();
    fetch("http://localhost:8000/api/users/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((result) => {
        if ("token" in result) {
          dispatch(setUser(result));
          navigate("/home");
        }
      });
  }

  return (
    <>
      <div className={[classes.loginForm, "container", "mt-5"].join(" ")}>
        <div className="row mb-5">
          <h3>
            Connect to <br />
            the community
          </h3>
        </div>

        <Form onSubmit={authenticate}>
          <div className="row mb-4">
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                type="student"
                placeholder="Student ID"
                value={values.email_address}
                onChange={(e) =>
                  setValues({ ...values, email_address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </Form.Group>
            <Link to="#">Forgot password?</Link>
          </div>
          <div className="row mb-2">
            <input type="submit" value="Login" />
            {/* <Button onClick={authenticate}>Login</Button> */}
          </div>
          <div className="row mb-5">
            <Link to="/signUp">
              Do not have an account? <span>Create now!</span>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
