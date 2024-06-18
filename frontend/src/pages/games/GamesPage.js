import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Game from "./Game";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/GamesPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/images/luigi-no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function GamesPage({ message, filter = "" }) {
  const [games, setGames] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get(`/games/?${filter}search=${query}`);
        setGames(data);
        setHasLoaded(true);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchGames();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <p>Discover Games</p>
        <i className={`fas fa-search ${styles.Search}`}></i>
        <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search for a game..."
          />
        </Form>
        {hasLoaded ? (
          <>
            {games.results.length ? (
              <InfiniteScroll
                dataLength={games.results.length}
                next={fetchMoreData}
                hasMore={!!games.next}
                loader={<Asset spinner />}
              >
                {games.results.map((game) => (
                  <Game key={game.id} {...game} />
                ))}
              </InfiniteScroll>
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default GamesPage;
