import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { IPublicListCard } from '../../interfaces/UserInterfaces';
import {HandThumbsUp, HandThumbsUpFill} from 'react-bootstrap-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


function PublicListCard({listData}:{listData:IPublicListCard}) {

    const [likesCounter, setLikesCounter] = useState<number>(listData.usersLiked.length);
    
    const userId = useSelector((state:RootState)=> state.userData.userInfo.id);
    
    const userLikedThisList = listData.usersLiked.includes(userId) ?  'btn-primary' : 'btn-outline-primary' ;


    function dateFormate(date:string){
        const formatedDate = new Date(date).toLocaleDateString();
        return formatedDate;
    }

    async function removedOutline(e:React.SyntheticEvent<HTMLButtonElement>){
        const buttonClasses = e.currentTarget.classList;
        const listId = e.currentTarget.dataset.listId
        if(buttonClasses.contains("btn-outline-primary")){
           
        // console.log(e.currentTarget.classList)
            e.currentTarget.classList.remove("btn-outline-primary")
            e.currentTarget.classList.add("btn-primary")
            setLikesCounter((prevLikes) => prevLikes+1)
            await axios.post("http://localhost:5000/publiclists/likelist", {listId, userId});
           
        }else{
            e.currentTarget.classList.remove("btn-primary")
            e.currentTarget.classList.add("btn-outline-primary")
            setLikesCounter((prevLikes) => prevLikes-1)
            await axios.post("http://localhost:5000/publiclists/unlikelist", {listId, userId});
        }
    }

  return (
      <Card className='h-100 m-2' style={{ width: '14rem' }}>
        <Card.Header><small>{listData.user.username}</small></Card.Header>
      <Card.Img className='w-100 rounded-0' variant="top" src={listData.user.userimage || "http://placekitten.com/400/400"} />
      <Card.Body className=' px-2 py-1'>
        <Card.Title className='text-dark fs-6'>{listData.name}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <div className='d-flex justify-content-between'>
        <Link to={`/publiclist/trackstable/${listData._id}`}>
        <Button className='py-1 px-1' size='sm' variant="info">Watch</Button>
           
        </Link>
        <button data-list-id={listData._id} onClick={removedOutline} className={`py-1 px-1 btn btn-sm ${userLikedThisList}`} >Like<HandThumbsUp className='fs-6 mb-1 align-middle'/></button>
         </div>
        <small className="list-date text-muted">Likes: {likesCounter}</small>
        <Card.Footer className="text-muted p-0 pt-1 mt-1 bg-light bg-transparent">
        <small className="list-date text-muted">Created at : {dateFormate(listData.createdAt)}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}

export default PublicListCard
