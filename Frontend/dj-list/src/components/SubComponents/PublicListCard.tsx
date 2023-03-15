import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { IPublicListCard } from '../../interfaces/UserInterfaces';

function PublicListCard({listData}:{listData:IPublicListCard}) {
  return (
      <Card className='h-100 m-2' style={{ width: '12rem' }}>
        <Card.Header><small>{listData.user.username}</small></Card.Header>
      <Card.Img className='w-100' variant="top" src={listData.user.userimage || "http://placekitten.com/400/400"} />
      <Card.Body>
        <Card.Title className='text-dark fs-6'>{listData.name}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Link to={`/trackstable/${listData._id}`}>
        <Button size='sm' variant="primary">Watch</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default PublicListCard
