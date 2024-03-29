import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CreateListForm() {

    const [error, setError] = useState<string>('');
    const userId = useSelector<any>((state) => state.userData.userInfo.id);
    const listName = useRef<any>();
    const listGenre = useRef<any>();
    const listPrivate = useRef<any>();
    const listDescription = useRef<any>();
    const navigate = useNavigate();

    function inputValidity(name:string, genre:string):boolean{
        return name.length > 3 && genre.length > 3
    }
 

    async function createList(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        const name = listName.current.value;
        const genre = listGenre.current.value;
        const description = listDescription.current.value;
        const isPrivate = listPrivate.current.checked;
        const inputsAreValid = inputValidity(name, genre);
        if(!inputsAreValid){
            setError('Inputs must have 3 or more characters');
            return;
        } 
        const requestCreateList = await axios.post(`https://memotrack-api.onrender.com/userlists/createlist`, {name, genre, isPrivate, description , userId}, {
        headers: {
          'Content-Type': 'application/json'
      }
      }).catch((err: Error | AxiosError)=>{
        if (axios.isAxiosError(err))  {
          // Access to config, request, and response
          setError("Failed to create list please check you internet");
          return;
        } else {
            // Stock error
            setError("Failed to create list please check you internet");
            return;
        }
      });
      navigate('/userlists')
    }

  return (
    <Container>
    <Form className='col-12 col-sm-6 mx-auto mt-5 text-light p-4 border border-secondary rounded'>
        {error && <Alert variant='danger'>{error}</Alert>}
      <Form.Group className="mb-3" >
        <Form.Label>List name</Form.Label>
        <Form.Control  ref={listName} type="text" placeholder="Name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>List genre</Form.Label>
        <Form.Control ref={listGenre} type="text" placeholder="Genre" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control ref={listDescription} as="textarea" placeholder='Type list description here' rows={3} />
      </Form.Group>
      <Form.Group className="mb-3 fw-bold">
        <Form.Check ref={listPrivate} type="checkbox" label="Private" />
      </Form.Group>
      <div className='text-end'>
      <Button className='btn-createlist border-0' onClick={createList}  variant="primary">
        Create
      </Button>
      </div>
    </Form>
    </Container>
  )
}

export default CreateListForm
