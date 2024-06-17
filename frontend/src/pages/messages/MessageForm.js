import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from '../../styles/GamesPage.module.css';
import btnStyles from "../../styles/Button.module.css";

const MessageForm = ({ chatId, onMessageSent, gameOwnerName, gameTitle, onCancel }) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Chat ID:", chatId); 
      const formData = new FormData();
      formData.append("content", content);
      console.log('formData: ', formData)
  
      const { data } = await axiosReq.post(`/chats/${chatId}/messages/`, formData);
      console.log("Message sent successfully:", data);
      
      // Append the new message to the existing messages
      onMessageSent(prevMessages => [...prevMessages, data]);
      
      setContent(""); // Clear form on success
      setErrors({}); // Clear previous errors
    } catch (error) {
      console.error("Error sending message:", error.response);
      setErrors(error.response?.data || { detail: "Something went wrong. Please try again." });
    }
  };

  return (
    <Card className={`${styles.ChatFormContainer} ${styles.StickyBottom}`}>
      <Card.Body>
        <Card.Title>Chat with {gameOwnerName}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{gameTitle}</Card.Subtitle>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="content">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={handleChange}
              isInvalid={!!errors.content}
            />
            {errors.content && errors.content.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button type="submit" className={`${btnStyles.Button} ${btnStyles.Blue}`}>Send</Button>
            <Button type="button" className={`${btnStyles.Button} ${btnStyles.Red}`} onClick={onCancel}>Cancel</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MessageForm;
