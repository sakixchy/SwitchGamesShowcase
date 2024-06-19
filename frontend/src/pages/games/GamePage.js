import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Game from './Game';
import { Container, Row, Col } from 'react-bootstrap';

import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment"
import { useCurrentUser } from "../../contexts/CurrentUserContexts";

function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });
  
  
    useEffect(() => {
      const handleMount = async () => {
        try {
          const [{ data: game }, { data:comments }] = await Promise.all([
            axiosReq.get(`/games/${id}/`),
            axiosReq.get(`/comments/?games=${id}`),
          ]);
          setGame({ results: [game] });
          setComments(comments)
        } catch (err) {
          console.log(err);
        }
      };
  
      handleMount();
    }, [id]);


  return (
    <Container className="mt-4">
      <Row>
        <Col lg={8} className="mx-auto">
        <Game {...game.results[0]} setGames={setGame} gamePage />
        </Col>
        <Container >
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              game={id}
              setGame={setGame}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Row>
    </Container>
  );
}

export default GamePage;
