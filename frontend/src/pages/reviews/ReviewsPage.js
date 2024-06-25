import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; 
import styles from "../../styles/ReviewsPage.module.css";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get('/reviews/');
        setReviews(data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Container>
      <h1>All Reviews</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/reviews/create" className={`d-flex align-items-center ${styles.reviewcreate}`}>
          <i className="fa-solid fa-pencil" style={{ color: 'red' }}></i>
          <span className={styles.writeReviewText}>Write a Review</span>
        </Link>
      </div>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading reviews...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <ListGroup>
                {reviews.map((review) => (
            <ListGroup.Item key={review.id} className="mb-3">
              <div className="d-flex">
                <img
                  src={review.game_cover_image}
                  alt={review.game_title}
                  style={{ width: '100px', height: '100px', marginRight: '20px' }}
                />
                <div>
                  <h5>
                    <p to={`/reviews/${review.id}`}>{review.title}</p>
                  </h5>
                  <p>{review.content}</p>
                  <small>Rating: {review.rating_display}</small>
                  <div>
                    <strong>Game:</strong> {review.game_title} <br />
                    <strong>Genre:</strong> {review.game_genre}
                  </div>
                  <div className={`d-flex align-items-center justify-content-end mt-2 ${styles.profileLink}`}>
                    <Link to={`/profiles/${review.user_id}`} className="d-flex align-items-center">
                      <img
                        src={review.profile_image} 
                        alt={review.username}
                        className={styles.avatar}
                      />
                     <span className={styles.username}>{review.username}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default ReviewsPage;
