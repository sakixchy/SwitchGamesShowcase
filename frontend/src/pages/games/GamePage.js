import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Game from './Game';
import { Container, Row, Col } from 'react-bootstrap';


function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState({ results: [] });
  
    useEffect(() => {
      const handleMount = async () => {
        try {
          const [{ data: game }] = await Promise.all([
            axiosReq.get(`/games/${id}/`),
          ]);
          setGame({ results: [game] });
          console.log(game);
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
      </Row>
    </Container>
  );
}

export default GamePage;
