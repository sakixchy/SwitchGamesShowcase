import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Link } from 'react-router-dom'
import { axiosReq, axiosRes } from '../../api/axiosDefaults'
import styles from '../../styles/ReviewsPage.module.css'
import NoResults from '../../assets/images/luigi-no-results.png'
import { useCurrentUser } from '../../contexts/CurrentUserContexts'
import { DeleteDropdown } from '../../components/MoreDropdown'

function ReviewsPage () {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const currentUser = useCurrentUser()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get('/reviews/')
        setReviews(data.results)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axiosRes.delete(`/reviews/${id}/`)
      setReviews(reviews.filter((review) => review.id !== id))
    } catch (err) {}
  }

  return (
    <Container>
      <h1>All Reviews</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {currentUser
          ? (
          <Link
            to="/reviews/create"
            className={`d-flex align-items-center ${styles.reviewcreate}`}
          >
            <i className="fa-solid fa-pencil" style={{ color: 'red' }}></i>
            <span className={styles.writeReviewText}>Write a Review</span>
          </Link>
            )
          : (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-top">
                You must login to create a review!
              </Tooltip>
            }
          >
            <div
              className={`d-flex align-items-center ${styles.reviewcreate}`}
              style={{ cursor: 'not-allowed' }}
            >
              <i className="fa-solid fa-pencil" style={{ color: 'red' }}></i>
              <span className={styles.writeReviewText}>Write a Review</span>
            </div>
          </OverlayTrigger>
            )}
      </div>
      {loading
        ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading reviews...</p>
        </div>
          )
        : reviews.length === 0
          ? (
        <div className="text-center">
          <img
            src={NoResults}
            alt="No results"
            style={{ width: '200px', height: '200px' }}
          />
          <p>No reviews found. Be the first to write one!</p>
        </div>
            )
          : (
        <ListGroup>
          {reviews.map((review) => (
            <Link
              key={review.id}
              to={`/reviews/${review.id}`}
              className={`${styles.reviewLink}`}
            >
              <ListGroup.Item className={`mb-3 ${styles.reviewItem}`}>
                <div className="d-flex">
                  <img
                    src={review.game_cover_image}
                    alt={review.game_title}
                    style={{
                      width: '100px',
                      height: '100px',
                      marginRight: '20px'
                    }}
                  />
                  <div>
                    <h5>{review.title}</h5>
                    <p>{review.content}</p>
                    <small>Rating: {review.rating_display}</small>
                    <div>
                      <strong>Game:</strong> {review.game_title} <br />
                      <strong>Genre:</strong> {review.game_genre}
                    </div>
                  </div>
                  {currentUser && currentUser.username === review.owner && (
                    <DeleteDropdown
                      handleDelete={() => handleDelete(review.id)}
                    />
                  )}
                </div>
                <div
                  className={`d-flex align-items-center justify-content-end mt-2 ${styles.profileLink}`}
                >
                  <img
                    src={review.profile_image}
                    alt={review.username}
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{review.owner}</span>
                </div>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
            )}
    </Container>
  )
}

export default ReviewsPage
