import React, { useEffect, useState } from 'react'
import {Container, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { IPublicListCard } from '../interfaces/UserInterfaces';
import PublicListCard from './SubComponents/PublicListCard';

function PublicLists() {

    // const navigate = useNavigate();
    // const userIsAuth = useSelector((state:RootState)=>state.userData.userInfo.isAuth);
     // if(!userIsAuth){
        //     navigate('/login')
        // }

    const [userLists, setUserLists] = useState<[IPublicListCard]>();
    
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

    console.log(userLists)

  return (
    <Container>
        <InputGroup className="w-50 my-5 mx-auto" size='sm'>
        <Form.Control
          placeholder="Search your list"
          aria-label="Search your list"
          type="search"
        />
      </InputGroup>
      <Container className='d-flex flex-wrap justify-content-center'>
        {userLists?.map((list:IPublicListCard, index)=>{
            return <PublicListCard key={index} listData={list}/>
        })}
      </Container>
    </Container>
  )
}

export default PublicLists
