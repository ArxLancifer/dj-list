import React, { useEffect, useState } from 'react'
import {Button, Container, Form, InputGroup } from 'react-bootstrap'
import ListCard from './SubComponents/ListCard';
import  {PlusSquare} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IList} from '../interfaces/UserInterfaces';
import { useSelector } from 'react-redux';
function UserLists() {

    const [userLists, setUserLists] = useState<[IList]>([ {_id: "", user: {username:""}, name: "", genre: ""}]);
    const userId = useSelector((state:any)=>state.userData.userInfo.id)
    async function fetchLists(){
        try {
            const response = await axios.get(`http://localhost:5000/userlists/getlists/${userId}`)
            const listsData = response.data;
            setUserLists(listsData);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchLists();
    },[userId] )


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
        {userLists.map((list:IList, index)=>{
            return <ListCard key={index} listData={list} />
        })}
       {/* <ListCard /> */}
      </Container>
    </Container>
  )
}

export default UserLists
