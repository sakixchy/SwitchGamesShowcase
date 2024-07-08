import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import { Container, Card, Badge } from 'react-bootstrap'
import Asset from '../../components/Asset'
import { useCurrentUser } from '../../contexts/CurrentUserContexts'
import { DeleteDropdown } from '../../components/MoreDropdown'
import Avatar from '../../components/Avatar'
import styles from '../../styles/ReviewsPage.module.css'

function ReviewPage () {
  const { id } = useParams()
  const [review, setReview] = useState(null)
  const currentUser = useCurrentUser()
  const history = useHistory()

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/${id}/`)
        setReview(data)
      } catch (err) {
        console.error('Error fetching review:', err)
      }
    }

    fetchReview()
  }, [id])

  const handleDeleteReview = async () => {
    try {
      await axiosReq.delete(`/reviews/${id}/`)
      history.goBack()
    } catch (err) {
      console.error('Error deleting review:', err)
    }
  }

  return (
    <Container className="py-4">
      {review
        ? (
        <Card className={styles.ReviewCard}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Avatar
                  src={review.profile_image}
                  height={55}
                  className={styles.Avatar}
                />
                <div className="ml-2">{review.owner}</div>
              </div>
              {currentUser && currentUser.username === review.owner && (
                <div>
                  <DeleteDropdown handleDelete={handleDeleteReview} />
                </div>
              )}
            </div>
            <hr />
            <Card.Title className={styles.Title}>{review.title}</Card.Title>
            <Card.Text className={styles.Content}>{review.content}</Card.Text>
            <Badge variant="info">{review.rating_display}</Badge>
            <Card.Text>Genre: {review.game_genre}</Card.Text>
            <Card.Text>Game: {review.game_title}</Card.Text>
          </Card.Body>
        </Card>
          )
        : (
        <Asset spinner />
          )}
    </Container>
  )
}

export default ReviewPage
