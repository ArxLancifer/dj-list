import React from 'react'
import { Card } from 'react-bootstrap'
import { IList } from '../../interfaces/UserInterfaces'

function GenreCard({listData}:{listData:IList}) {
  return (
    <div >
    <Card  className='m-2 shadow' style={{ width: '18rem' }} data-list-id={listData._id} >
    <Card.Body className='d-flex flex-column justify-content-between' style={{
        backgroundImage: `url("/backgroundDark.jpg")`,
        WebkitBackgroundSize: "100% 100%",
      }}>
      <Card.Title>{listData.name}</Card.Title>
      {/* <Card.Subtitle className="m-0 p-0 text-muted">Card Subtitle</Card.Subtitle> */}
      {/* <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text> */}
      <div>
      <Card.Link className='d-block' href="#">{listData.genre}</Card.Link>
      <Card.Link className='d-block p-0 m-0' href="#">Dj <span className='djName'>{listData.user.username}</span></Card.Link>
      </div>
    </Card.Body>
  </Card>
  </div>
  )
}

export default GenreCard
