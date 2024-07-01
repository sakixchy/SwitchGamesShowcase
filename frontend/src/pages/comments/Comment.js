import React, { useState } from "react";
import { Button, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";
import CommentEditForm from "./CommentEditForm";
import moment from 'moment';

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setGame,
    setComments,
  } = props;


  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setGame((prevGame) => ({
        results: [
          {
            ...prevGame.results[0],
            comments_count: prevGame.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
  
    }
  };

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className={styles.CommentContainer}>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <div className={styles.CommentHeader}>
            <span className={styles.Owner}>{owner}</span>
            <span>{moment(updated_at).fromNow()}</span> 
          </div>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
      </Media>
      {isOwner && !showEditForm && (
        <div className={styles.ButtonContainer}>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowEditForm(true)}
            className={styles.EditButton}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleDelete}
            className={styles.DeleteButton}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Comment;
