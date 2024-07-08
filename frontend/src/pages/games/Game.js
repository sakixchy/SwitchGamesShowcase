import React from 'react'
import { Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import styles from '../../styles/Game.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContexts'
import { axiosRes } from '../../api/axiosDefaults'
import { MoreDropdown } from '../../components/MoreDropdown'
import moment from 'moment'


const Game = ({
  id,
  owner,
  profile_id,
  profile_image,
  title,
  description,
  cover_image,
  updated_at,
  like_id,
  likes_count,
  comments_count,
  genre,
  setGames
}) => {
  const currentUser = useCurrentUser()
  const isOwner = currentUser && currentUser.username === owner
  const history = useHistory()

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/games/${id}/`)
      history.push('/')
    } catch (err) {}
  }

  const handleEdit = () => {
    history.push(`/games/${id}/edit`)
  }

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { game: id })
      setGames((prevGames) => ({
        ...prevGames,
        results: prevGames.results.map((game) =>
          game.id === id
            ? { ...game, likes_count: game.likes_count + 1, like_id: data.id }
            : game
        )
      }))
    } catch (err) {}
  }

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`)
      setGames((prevGames) => ({
        ...prevGames,
        results: prevGames.results.map((game) =>
          game.id === id
            ? { ...game, likes_count: game.likes_count - 1, like_id: null }
            : game
        )
      }))
    } catch (err) {}
  }

  return (
    <Card className={styles.Game}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/profiles/${profile_id}`} className="d-flex align-items-center">
            <Avatar src={profile_image} height={55} className={styles.Avatar} />
            <div className="ml-2">{owner}</div>
          </Link>
          <span>{moment(updated_at).fromNow()}</span>
          {isOwner && (
            <div>
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          )}
        </div>
      </Card.Body>
      <Link to={`/games/${id}`}>
        <div className={styles.CoverImageContainer}>
          <Card.Img src={cover_image} alt={title} className={styles.CoverImage} />
        </div>
      </Link>
      <Card.Body>
        {title && <Card.Title className={styles.Title}>{title}</Card.Title>}
        {genre && (
          <Badge className="ml-2" variant="info">
            {genre}
          </Badge>
        )}
        {description && (
          <Card.Text className={styles.Description}>{description}</Card.Text>
        )}
        <Card.Body>
          {isOwner
            ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can&apos;t like your own game!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
              )
            : like_id
              ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
                )
              : currentUser
                ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
                  )
                : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like this game!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
                  )}
          {likes_count}
          <Link to={`/games/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </Card.Body>
      </Card.Body>
    </Card>
  )
}

export default Game
