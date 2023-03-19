import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { IPublicListCard } from '../../interfaces/UserInterfaces';

function PublicListCard({listData}:{listData:IPublicListCard}) {

    function dateFormate(date:string){
        const formatedDate = new Date(date).toLocaleDateString();
        return formatedDate;
    }

  return (
      <Card className='h-100 m-2' style={{ width: '12rem' }}>
        <Card.Header><small>{listData.user.username}</small></Card.Header>
      <Card.Img className='w-100 rounded-0' variant="top" src={listData.user.userimage || "http://placekitten.com/400/400"} />
      <Card.Body className=' px-2 py-1'>
        <Card.Title className='text-dark fs-6'>{listData.name}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Link to={`/trackstable/${listData._id}`}>
        <Button className='py-0 px-1' size='sm' variant="primary">Watch</Button>
        </Link>
        <Card.Footer className="text-muted p-0 pt-1 mt-1 bg-light bg-transparent">
        <small className="list-date text-muted">Created at : {dateFormate(listData.createdAt)}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}

export default PublicListCard
