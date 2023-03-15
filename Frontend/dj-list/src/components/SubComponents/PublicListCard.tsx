import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IPublicListCard } from '../../interfaces/UserInterfaces';

function PublicListCard({listData}:{listData:IPublicListCard}) {
  return (
    <Card className='h-100 m-2' style={{ width: '12rem' }}>
        <Card.Header>{listData.user.username}</Card.Header>
      <Card.Img className='w-100' variant="top" src="http://placekitten.com/180" />
      <Card.Body>
        <Card.Title>{listData.name}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Button size='sm' variant="primary">Watch</Button>
      </Card.Body>
    </Card>
  )
}

export default PublicListCard
