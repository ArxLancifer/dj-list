import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useRef } from 'react';
function CreateListForm() {

    const listName = useRef<any>();
    const listGenre = useRef<any>();
    const listPublic = useRef<any>();


  return (
    <Container>

    <Form className='w-50 mx-auto mt-5'>
      <Form.Group className="mb-3" >
        <Form.Label>List name</Form.Label>
        <Form.Control  ref={listName} type="text" placeholder="Name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>List genre</Form.Label>
        <Form.Control ref={listGenre} type="text" placeholder="Genre" />
      </Form.Group>
      <Form.Group className="mb-3 fw-bold">
        <Form.Check ref={listPublic} type="checkbox" label="Private" />
      </Form.Group>
      <div className='text-end'>
      <Button variant="primary" type="submit">
        Create
      </Button>
      </div>
    </Form>
    </Container>
  )
}

export default CreateListForm
