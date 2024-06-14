import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Game.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContexts';

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
}) => {
  const currentUser = useCurrentUser();  

  const isOwner = currentUser && currentUser.username === owner;

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
            <button className="btn btn-danger mt-2 ml-2" >
              Delete Game
            </button>
          </div>
        )}
        {!isOwner && (
          <button className="btn btn-primary mt-2">
            Request to Rent
          </button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Game;
