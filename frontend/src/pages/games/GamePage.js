import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import Game from './Game'
import { Container, Row, Col } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import Asset from '../../components/Asset'
import { fetchMoreData } from '../../utils/utils'

import CommentCreateForm from '../comments/CommentCreateForm'
import Comment from '../comments/Comment'
import { useCurrentUser } from '../../contexts/CurrentUserContexts'
import PopularProfiles from '../profiles/PopularProfiles'

function GamePage () {
  const { id } = useParams()
  const [game, setGame] = useState({ results: [] })

  const currentUser = useCurrentUser()
  const profileImage = currentUser?.profileImage
  const [comments, setComments] = useState({ results: [] })

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: gameData }, { data: commentsData }] = await Promise.all([
          axiosReq.get(`/games/${id}/`),
          axiosReq.get(`/comments/?game=${id}`)
        ])
        setGame({ results: [gameData] })
        setComments(commentsData)
      } catch (err) {}
    }

    handleMount()
  }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Game {...game.results[0]} setGames={setGame} />
        <Container>
          {currentUser
            ? (
            <CommentCreateForm
              profileId={currentUser.profileId}
              profileImage={profileImage}
              game={id}
              setGame={setGame}
              setComments={setComments}
            />
              )
            : comments.results.length
              ? (
            <span>Comments</span>
                )
              : null}
          {comments.results.length
            ? (
            <InfiniteScroll
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            >
              {comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setGame={setGame}
                  setComments={setComments}
                />
              ))}
            </InfiniteScroll>
              )
            : currentUser
              ? (
            <span>Share your thoughts on this game!</span>
                )
              : (
            <span>No comments have been made yet.</span>
                )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  )
}

export default GamePage
