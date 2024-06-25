import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; 
import styles from "../../styles/ReviewsPage.module.css";
import NoResults from "../../assets/images/luigi-no-results.png";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get('/reviews/');
        setReviews(data.results);
      } catch (err) {
        console.error(err);
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
       ) : reviews.length === 0 ? (
        <div className="text-center">
          <img src={NoResults} alt="No results" style={{ width: '200px', height: '200px' }} />
          <p>No reviews found. Be the first to write one!</p>
        </div>
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
                </div>
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
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default ReviewsPage;
