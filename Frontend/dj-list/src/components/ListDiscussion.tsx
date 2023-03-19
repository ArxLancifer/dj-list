import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CommentContainer from './SubComponents/CommentContainer';
import CommentInput from './SubComponents/CommentInput';

function ListDiscussion() {
  return (
    <Container>
    <Card className="text-center h-100 mt-5">
      <Card.Header className='pb-0'><h4 className='d-inline-block'>List name</h4> : <small>List category</small></Card.Header>
      <Card.Body>
      <Card.Title className='text-dark mx-0 d-flex align-items-center'>
      <div>
       <div className='user-picture-discussion m-0 me-2'><span className='fs-4 fw-bold'>A</span></div>
      </div>
       <div>user name</div>
      </Card.Title>
        <Card.Text className='w-75 mx-auto my-4'>
          Some list description and Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos facilis tempora ex distinctio saepe deleniti minus nobis corrupti nam sed!
        </Card.Text>
        <Button className='mb-4' variant="primary">Go to list</Button>
         <CommentContainer />
        <Card.Footer className='p-0'>
            <CommentInput />
        </Card.Footer>
      </Card.Body>
        
    </Card>
    </Container>
  )
}

export default ListDiscussion
