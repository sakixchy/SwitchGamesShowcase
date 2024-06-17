import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Game from "./Game";
import MessageForm from "../../pages/messages/MessageForm";
import MessageList from "../../components/MessageList";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from '../../styles/GamesPage.module.css';
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/images/luigi-no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function GamesPage({ message, filter = "" }) {
  const [games, setGames] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [gameDetails, setGameDetails] = useState({ owner_name: "", title: "" });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get(`/games/?${filter}search=${query}`);
        setGames(data);
        setHasLoaded(true);
      } catch (error) {
        console.error('Error fetching games:', error);
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

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axiosReq.get(`/chats/${chatId}/messages/`);
      setMessages(data.results);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageFormOpen = async (gameId, ownerName, gameTitle) => {
    const game = games.results.find((game) => game.id === gameId);
    if (game) {
      setSelectedGame(game);
      setShowMessageForm(true);
      fetchMessages(game.id);
      setGameDetails({ owner_name: ownerName, title: gameTitle });
    }
  };

  const handleMessageSent = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleCancel = () => {
    setShowMessageForm(false);
    setSelectedGame(null);
    setGameDetails({ owner_name: "", title: "" });
  };

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
                  <Game
                    key={game.id}
                    {...game}
                    onChatOpen={handleMessageFormOpen}
                  />
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
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Favorite Renters</p>
        {showMessageForm && selectedGame && (
          <>
            <MessageList messages={messages} />
            <MessageForm 
              chatId={selectedGame.id}
              gameOwnerName={gameDetails.owner_name}
              gameTitle={gameDetails.title}
              onMessageSent={handleMessageSent}
              onCancel={handleCancel}
            />
          </>
        )}
      </Col>
    </Row>
  );
}

export default GamesPage;
