import React, { useEffect, useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RentalsPage = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const { data } = await axiosRes.get('/rentals/');
        setRentals(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRentals();
  }, []);

  return (
    <Container>
      <h1>My Rentals</h1>
      <Row>
        {rentals.map((rental) => (
          <Col key={rental.id} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                  <Link to={`/rentals/${rental.id}`}>{rental.game.title}</Link>
                </Card.Title>
                <Card.Text>Status: {rental.status}</Card.Text>
                <Card.Text>Start Date: {rental.rental_start_date}</Card.Text>
                <Card.Text>End Date: {rental.rental_end_date}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RentalsPage;
