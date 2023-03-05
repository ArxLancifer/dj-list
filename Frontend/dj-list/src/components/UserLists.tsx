import React, { useEffect, useState } from 'react'
import {Button, Container, Form, InputGroup } from 'react-bootstrap'
import GenreCard from './SubComponents/GenreCard';
import  {PlusSquare} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IList, IState, IUser } from '../interfaces/UserInterfaces';
import { useSelector } from 'react-redux';
function UserLists() {

    const [lists, setLists] = useState<[IList]>([ {_id: "", user: "", name: "", genre: ""}]);
    const userId = useSelector((state:any)=>state.userData.userInfo.id)
    console.log(userId)
    async function fetchLists(){
        try {
            const response = await axios.get<AxiosResponse>(`http://localhost:5000/userlists/getlists/user=${userId}`)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    //    .catch((err: Error | AxiosError)=>{
    //     if (axios.isAxiosError(err))  {
    //         console.log(err.status)
    //         return
    //     } else {
    //         // Stock error
    //         console.log(err)
    //         return
    //     }
    //   });
    // }
    useEffect(()=>{
        fetchLists();
    }, )


  return (
    <Container className='my-5'>
      <div className='clearfix'>
        <Link to={'/createlist'}>
          <Button variant="success" className='float-end'><PlusSquare className='me-1'/>New </Button>
        </Link>
      </div>
        <InputGroup className="w-50 my-5 mx-auto" size='sm'>
        <Form.Control
          placeholder="Search your list"
          aria-label="Search your list"
        />
      </InputGroup>
      <Container className='d-flex flex-wrap justify-content-center'>
       <GenreCard />
      </Container>
    </Container>
  )
}

export default UserLists
