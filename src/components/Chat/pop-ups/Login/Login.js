import { React } from 'react';
import classes from "./Login.module.css";
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { ButtonFilled } from '../../buttons';

export default function Login() {

  const navigate = useNavigate();
  function authenticate() {
    navigate('/home')
  }

  return (
    <>
      <div className={[classes.loginForm, "container", "mt-5"].join(' ')} >
        <div className="row mb-5">
        <h3>Connect to <br/>the community</h3>
        </div>
        
        <Form>
          <div className='row mb-4'>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control type="student" placeholder="Student ID" />
            </Form.Group>

            <Form.Group className='mb-2' controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Link to="#">Forgot password?</Link>
          </div>
          <div className="row mb-2">
            <ButtonFilled textToDisplay={"Login"} goTo="/home" ></ButtonFilled>
          </div>
          <div className='row mb-5'>
            <Link to="/signUp">Do not have an account? <span>Create now!</span></Link>
          </div>
        </Form>
      </div>
    </>
  )
}
