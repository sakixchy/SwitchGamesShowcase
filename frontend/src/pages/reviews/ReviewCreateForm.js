import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; 
import { useRedirect } from "../../hooks/useRedirect";

function ReviewCreateForm() {
  useRedirect('loggedOut')
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    game: "",
    title: "",
    content: "",
    rating: 3,
  });
  const { game, title, content, rating } = postData;

  const [games, setGames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get('/games/');
        setGames(data.results);
      } catch (err) {
  
      }
    };

    fetchGames();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post('/reviews/', postData);
      history.push(`/reviews/${data.id}`);
    } catch (err) {

      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleRatingChange = (event) => {
    setPostData({
      ...postData,
      rating: parseInt(event.target.value),
    });
  };

  return (
    <Container>
      <h1>Create a Review</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGameSelect">
          <Form.Label>Select Game</Form.Label>
          <Form.Control
            as="select"
            name="game"
            value={game}
            onChange={handleChange}
          >
            <option value="">Select a game</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </Form.Control>
          {errors?.game && (
            <Alert variant="warning">
              {errors.game.map((message, idx) => (
                <span key={idx}>{message}</span>
              ))}
            </Alert>
          )}
        </Form.Group>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
          {errors?.title && (
            <Alert variant="warning">
              {errors.title.map((message, idx) => (
                <span key={idx}>{message}</span>
              ))}
            </Alert>
          )}
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="content"
            value={content}
            onChange={handleChange}
          />
          {errors?.content && (
            <Alert variant="warning">
              {errors.content.map((message, idx) => (
                <span key={idx}>{message}</span>
              ))}
            </Alert>
          )}
        </Form.Group>
        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            name="rating"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value={1}>1 - Awful</option>
            <option value={2}>2 - Not Great</option>
            <option value={3}>3 - Average</option>
            <option value={4}>4 - Good</option>
            <option value={5}>5 - Excellent</option>
          </Form.Control>
          {errors?.rating && (
            <Alert variant="warning">
              {errors.rating.map((message, idx) => (
                <span key={idx}>{message}</span>
              ))}
            </Alert>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>
    </Container>
  );
}

export default ReviewCreateForm;
