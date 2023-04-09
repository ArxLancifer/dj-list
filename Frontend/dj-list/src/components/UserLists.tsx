import React, { useEffect, useRef, useState } from 'react'
import {Button, Container, Form, InputGroup } from 'react-bootstrap'
import ListCard from './SubComponents/ListCard';
import  {PlusSquare, Search} from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IList } from '../interfaces/UserInterfaces';
import { useSelector } from 'react-redux';
import { RootState } from './store';
function UserLists() {

    // const navigate = useNavigate();
    // const userIsAuth = useSelector((state:RootState)=>state.userData.userInfo.isAuth);
    // if(!userIsAuth){
    //     navigate('/login')
    // }

    const [userLists, setUserLists] = useState<[IList]>([ {_id: "", user: {username:"", userimage:""}, name: "", genre: "", tracks:['']}]);
    const [searchedLists, setSearchedLists] = useState<IList[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);
    const userId = useSelector((state:any)=>state.userData.userInfo.id)
    async function fetchLists(){
        try {
            const response = await axios.get(`http://localhost:5000/userlists/getlists/${userId}`)
            const listsData = response.data;
            setUserLists(listsData);
            setSearchedLists(listsData);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchLists();
    },[userId] )

    function searchList(){
        const searchParams = searchRef.current?.value.split(' ').map(word=>word.toLowerCase());
        const searchedLists = userLists?.filter((list)=>{
            const doesInclude = searchParams?.some((word)=>{
                return list.name.toLowerCase().includes(word) || list.genre.toLowerCase().includes(word)
            })
            if(doesInclude) return list || [];
        })
        setSearchedLists(searchedLists)
      }

      const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          searchList();
        }
      };

  return (
    <Container className='my-5'>
      <div className='clearfix'>
        <Link to={'/createlist'}>
          <Button  className='float-end border-0 btn-createlist'><PlusSquare className='me-1'/>New </Button>
        </Link>
      </div>
        <InputGroup className="w-50 my-5 mx-auto" size='sm'>
        <Form.Control
          ref={searchRef} 
          onKeyDown={handleEnterKey}
          placeholder="Search your list"
          aria-label="Search your list"
          type="search"
        />
        <InputGroup.Text onClick={searchList}><Search className='fs-5' role='button' /></InputGroup.Text>
      </InputGroup>
      <Container className='d-flex flex-wrap justify-content-center'>
        {searchedLists.map((list:IList, index)=>{
            return <ListCard key={index} listData={list} />
        })}
       {/* <ListCard /> */}
      </Container>
    </Container>
  )
}

export default UserLists
