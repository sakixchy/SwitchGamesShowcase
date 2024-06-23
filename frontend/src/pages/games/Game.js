import React from "react";
import { Card, Badge, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Game.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";
import { axiosRes } from "../../api/axiosDefaults";

const Game = ({
  id,
  owner,
  profile_id,
  profile_image,
  title,
  description,
  cover_image,
  is_available,
  updated_at,
  like_id,
  likes_count,
  comments_count,
  genre,
  setGames,

}) => {
  const currentUser = useCurrentUser();
  const isOwner = currentUser && currentUser.username === owner;
  const history = useHistory();

  const handleRequestToRent = async () => {
    try {
      if (!currentUser) {
        history.push('/signin'); 
      } else {
        const { data } = await axiosRes.post('/rentals/', { game: id });
        alert('Rental request sent successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send rental request.');
    }
  };
  

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/games/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { game: id });
      setGames(prevGames => ({
        ...prevGames,
        results: prevGames.results.map((game) => {
          return game.id === id
            ? { ...game, likes_count: game.likes_count + 1, like_id: data.id }
            : game;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setGames(prevGames => ({
        ...prevGames,
        results: prevGames.results.map(game =>
          game.id === id
            ? { ...game, likes_count: game.likes_count - 1, like_id: null }
            : game
        )
      }));
    } catch (err) {
      console.log(err);
    }
  };
  


  return (
    <Card className={styles.Game}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/profiles/${profile_id}`} className="d-flex align-items-center">
            <Avatar src={profile_image} height={55} className={styles.Avatar} />
            <div className="ml-2">{owner}</div>
          </Link>
          <span>{new Date(updated_at).toLocaleDateString()}</span>
        </div>
      </Card.Body>
      <Link to={`/games/${id}`}>
        <div className={styles.CoverImageContainer}>
          <Card.Img src={cover_image} alt={title} className={styles.CoverImage} />
        </div>
      </Link>
      <Card.Body>
        {title && <Card.Title className={styles.Title}>{title}</Card.Title>}
        {genre && <Badge className="ml-2" variant="info">{genre}</Badge>}
        {description && <Card.Text className={styles.Description}>{description}</Card.Text>}
        <div className={styles.Availability}>
          {is_available ? (
            <Badge variant="success">Available</Badge>
          ) : (
            <Badge variant="secondary">Rented</Badge>
          )}
        </div>
        {isOwner && (
          <div>
            <Link to={`/games/${id}/edit`} className="btn btn-warning mt-2">
              Edit Game
            </Link>
            <button className="btn btn-danger mt-2 ml-2"
             onClick={handleDelete}>
              Delete Game
            </button>
          </div>
        )}
        {!isOwner && (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="request-to-rent-tooltip">
                {currentUser ? "Request to rent this game" : "Log in to request to rent!"}
              </Tooltip>
            }
          >
            <Button
              className={btnStyles.Button}
              onClick={handleRequestToRent}
              style={{ fontSize: '10px' }}
            >
              <i className="fa-solid fa-hand"></i> Request to Rent
            </Button>
          </OverlayTrigger>
        )}
      {isOwner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own game!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
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
    </Card>
  );
};

export default Game;

