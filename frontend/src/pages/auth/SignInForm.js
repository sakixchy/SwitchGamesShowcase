import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import nintendohero from "../../assets/images/signupform.png";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { useSetCurrentUser } from "../../contexts/CurrentUserContexts";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser()

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!signInData.username || !signInData.password) {
      setErrors("Both fields are required.");
      return;
    }

    setErrors(null);
   
    try {
       const {data} = await axios.post("/dj-rest-auth/login/", signInData);
       setCurrentUser(data.user)
       history.push("/");
    } catch (err) {
       setErrors("Error during sign-in. Please check your credentials.");
       console.error("Error during sign-in:", err);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign In</h1>

          {errors && (
            <Alert variant="danger" className="mt-2">
              {errors}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={signInData.username}
                onChange={handleChange}
                className={styles.Input}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={signInData.password}
                onChange={handleChange}
                className={styles.Input}
              />
            </Form.Group>
            
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign In
            </Button>
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            <span>Don't have an account?</span> Sign Up
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={nintendohero}
          alt="Nintendo hero image"
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
