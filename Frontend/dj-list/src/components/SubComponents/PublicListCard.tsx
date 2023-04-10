import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { IPublicListCard } from '../../interfaces/UserInterfaces';
import {HandThumbsUp, StarFill, Star, ChatLeftText} from 'react-bootstrap-icons';
import {addFavorite, removeFavorite} from '../store/userState';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Badge} from 'react-bootstrap';


function PublicListCard({listData}:{listData:IPublicListCard}) {

    const [likesCounter, setLikesCounter] = useState<number>(listData.usersLiked.length);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const userId = useSelector((state:RootState)=> state.userData.userInfo.id);
    const favoritesList:string[] = useSelector((state:RootState)=> state.userData.userInfo.favoriteLists);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        setIsFavorite(()=> favoritesList.includes(listData._id))
    },[])

   
    const usersLiked = new Set(listData.usersLiked);

    const userLikedThisList = usersLiked.has(userId) ?  'btn-primary' : 'btn-outline-primary' ;



    function dateFormate(date:string){
        const formatedDate = new Date(date).toLocaleDateString();
        return formatedDate;
    }
    // Like button request and logic
    async function removedOutline(e:React.SyntheticEvent<HTMLButtonElement>){
        e.preventDefault();
        const buttonClasses = e.currentTarget.classList;
        const listId = e.currentTarget.dataset.listId
        if(buttonClasses.contains("btn-outline-primary")){
           
        
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
    // Star button "favorite" request logic
    async function addToFavorites(e:React.MouseEvent<HTMLElement>){
        e.preventDefault()
        console.log(e.currentTarget.children[0].classList)
        try {
            const listId:string = e.currentTarget.dataset.listId || "";
            if(!e.currentTarget.children[0].classList.contains('isfavorite')){
                console.log("favorite added")
                setIsFavorite(true)
                const payload:string[] = [...favoritesList,listId];
                dispatch(addFavorite({favorites:payload}))
              await axios.post("http://localhost:5000/userlists/addfavorite", {listId, userId})
              return;
            }
            console.log("favorite removed")
            setIsFavorite(false)
            const payload:string[] = favoritesList.filter(id => id !== listId);
            dispatch(removeFavorite({favorites:payload}))
            await axios.post("http://localhost:5000/userlists/removefavorite", {listId, userId})
           
        } catch (error) {
            console.log(error)
        }
       

    }

  return (
  <Link className='h-100' to={`/publiclist/trackstable/${listData._id}`}>
      <Card className='h-100 m-3 pt-2 bg-dark text-light shadow border-0 public-list-card' style={{ width: '14rem' }}>
       
        <div className='w-100 cardImage my-2'>
      <img className='d-block mx-auto rounded-circle' src={listData.user.userimage || "http://placekitten.com/400/400"} alt="user avatar" />
      <Card.Header className='text-center'><h5>{listData.user.username}</h5></Card.Header>
        </div>
      <Card.Body className=' px-2 py-1'>
      <Badge className='mb-2 card-badge' pill bg="success" text="light">{listData.genre}</Badge>{' '}
          
      
        
        <Card.Title className=' fs-6'>{listData.name}</Card.Title>
           
        
        <div className='my-1'>
        <div className='d-flex justify-content-between'>
        <Link to={`/listdiscussion/${listData._id}`} state={{ listId: listData._id , listOwner:listData.user.username, ownerImage:listData.user.userimage}} >
        <Button className='d-block rounded-pill' size='sm' variant="outline-secondary">Comment<ChatLeftText className='mx-1'/></Button>
        </Link>
        <button data-list-id={listData._id} onClick={removedOutline} className={`d-block rounded-pill btn btn-sm ${userLikedThisList}`} >Like <HandThumbsUp className='fs-6 mb-1 align-middle'/></button>
        </div>
         </div>
         <div className='d-flex justify-content-between'>
            <small className="smallText mx-1 text-muted">Comments: {listData.comments.length}</small>
            <small className="smallText mx-1 text-muted">Likes: {likesCounter}</small>
         </div>
        <div onClick={addToFavorites} role="button" className='position-absolute top-0 end-0 m-1' data-list-id={listData._id} >
            { isFavorite ? <StarFill className='text-warning fs-5 me-1 isfavorite'/>:<Star className='text-secondary fs-5 me-1'/>}
        </div>
        <Card.Footer className="text-muted p-0 pt-1 mt-1 bg-light bg-transparent">
        <small className="smallText text-muted">Created at : {dateFormate(listData.createdAt)}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
    </Link>
  )
}

export default PublicListCard
