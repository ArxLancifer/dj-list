import React, { useEffect, useRef, useState } from 'react'
import {Container, Form, InputGroup } from 'react-bootstrap'
import {Search} from 'react-bootstrap-icons'
import axios from 'axios';
import { IPublicListCard } from '../interfaces/UserInterfaces';
import PublicListCard from './SubComponents/PublicListCard';

function PublicLists() {

    // const navigate = useNavigate();
    // const userIsAuth = useSelector((state:RootState)=>state.userData.userInfo.isAuth);
     // if(!userIsAuth){
        //     navigate('/login')
        // }

    const [userLists, setUserLists] = useState<IPublicListCard[]>([]);
    const [searchedLists, setSearchedLists] = useState<IPublicListCard[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);
    async function fetchLists(){
        try {
            const response = await axios.get(`http://localhost:5000/publiclists/getlists`)
            const listsData = response.data;
            setUserLists(listsData);
            setSearchedLists(listsData);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchLists();
       
    },[] )

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

    <Container >
        <InputGroup className="w-50 my-5 mx-auto" size='sm'>
        <Form.Control
          ref={searchRef} 
          onKeyDown={handleEnterKey}
          placeholder="Search your list"
          aria-label="Search your list"
          type="search"
        />
        <InputGroup.Text onClick={()=>console.log(searchList())}><Search className='fs-5' role='button' /></InputGroup.Text>
      </InputGroup>
      <Container className='d-flex flex-wrap justify-content-center'>
        
        {searchedLists.map((list:IPublicListCard, index)=>{
            return <PublicListCard key={index} listData={list}/>
        })}
      </Container>
    </Container>
  )
}

export default PublicLists
