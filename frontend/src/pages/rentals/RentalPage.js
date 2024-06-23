import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { Card, Button } from 'react-bootstrap';

const RentalPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [rental, setRental] = useState(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const { data } = await axiosRes.get(`/rentals/${id}/`);
        setRental(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRental();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/rentals/${id}/`);
      history.push('/rentals');
    } catch (err) {
      console.error(err);
    }
  };

  if (!rental) return <p>Loading...</p>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{rental.game.title}</Card.Title>
        <Card.Text>Status: {rental.status}</Card.Text>
        <Card.Text>Start Date: {rental.rental_start_date}</Card.Text>
        <Card.Text>End Date: {rental.rental_end_date}</Card.Text>
        <Button variant="danger" onClick={handleDelete}>Delete Rental</Button>
      </Card.Body>
    </Card>
  );
};

export default RentalPage;
