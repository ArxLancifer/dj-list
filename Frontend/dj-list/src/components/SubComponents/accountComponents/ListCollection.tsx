import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IPublicListCard } from '../../../interfaces/UserInterfaces';
import { RootState } from '../../store';

function ListCollection() {

    const [userLists, setUserLists] = useState<[any]>();
    
    const userId = useSelector((state:RootState)=>state.userData.userInfo.id)
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
    <div >
      <ListGroup variant="flush" className='rounded'>
      
      {userLists?.map((list) => {
        return <ListGroup.Item as="li" className='bg-dark text-light d-flex' key={list._id}>
            <div className="ms-2 me-auto">{list.name}</div>
            <small className='smallText lh-lg me-1'>Tracks</small>
        <Badge bg="secondary lh-sm" pill>
          {list.tracks.length}
        </Badge>
        </ListGroup.Item>
      })}
    </ListGroup>
    </div>
  )
}

export default ListCollection
