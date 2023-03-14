import React, { useEffect, useState } from 'react'
import {Container, Form, InputGroup } from 'react-bootstrap'
import ListCard from './SubComponents/ListCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IList} from '../interfaces/UserInterfaces';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Input } from '@mui/material';
function PublicLists() {

    const navigate = useNavigate();
    const userIsAuth = useSelector((state:RootState)=>state.userData.userInfo.isAuth);
    if(!userIsAuth){
        navigate('/login')
    }

    const [userLists, setUserLists] = useState<[IList]>([ {_id: "", user: {username:""}, name: "", genre: "", userImage: "http://placekitten.com/200/300"}]);
    
    async function fetchLists(){
        try {
            const response = await axios.get(`http://localhost:5000/publiclists/getlists`)
            const listsData = response.data;
            setUserLists(listsData);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchLists();
    },[] )


  return (
    <Container className='my-5'>
        <InputGroup className="w-50 my-5 mx-auto" size='sm'>
        <Form.Control
          placeholder="Search your list"
          aria-label="Search your list"
          type="search"
        />
      </InputGroup>
      <Container className='d-flex flex-wrap justify-content-center'>
        {userLists.map((list:IList, index)=>{
            return <ListCard key={index} listData={list} />
        })}
       {/* <ListCard /> */}
      </Container>
    </Container>
  )
}

export default PublicLists
