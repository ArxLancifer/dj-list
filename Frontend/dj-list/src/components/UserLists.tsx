import React from 'react'
import {Container, Form, InputGroup } from 'react-bootstrap'
import GenreCard from './SubComponents/GenreCard'

function UserLists() {
  return (
    <Container className='my-5'>
        <h1 className='text-center'>asdsd</h1>
        <InputGroup className="w-50 my-5 mx-auto" size='sm'>
        <Form.Control
          placeholder="Search your list"
          aria-label="Search your list"
        />
      </InputGroup>
      <Container className='d-flex flex-wrap justify-content-center'>
       <GenreCard />
       <GenreCard />
       <GenreCard />
       <GenreCard />
       <GenreCard />
       <GenreCard />
       <GenreCard />
       <GenreCard />
       <GenreCard />
       <GenreCard />
      </Container>
    </Container>
  )
}

export default UserLists
