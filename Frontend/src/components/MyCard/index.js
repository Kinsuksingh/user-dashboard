import React from 'react';
import { Card } from 'react-bootstrap';

function MyCard(props) {
  const {dataDetails, margin} = props
  const {title, count} = dataDetails
  return (
    <Card style={{ width: '18rem' }} className={`text-center ${margin}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {count}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MyCard;


