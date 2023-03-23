import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { IPublicListCard } from '../../interfaces/UserInterfaces';
import {HandThumbsUp, StarFill, Star, HandThumbsUpFill} from 'react-bootstrap-icons';
import {addFavorite, removeFavorite} from '../store/userState';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';


function PublicListCard({listData}:{listData:IPublicListCard}) {

    
    const [likesCounter, setLikesCounter] = useState<number>(listData.usersLiked.length);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const userId = useSelector((state:RootState)=> state.userData.userInfo.id);
    const favoritesList:string[] = useSelector((state:RootState)=> state.userData.userInfo.favoriteLists);
    const dispatch = useDispatch();
    

    useEffect(()=>{
        setIsFavorite(()=> favoritesList.includes(listData._id))
    },[])

    // const userLikedThisList = listData.usersLiked.includes(userId) ?  'btn-primary' : 'btn-outline-primary' ; // Change this to Array Set for performance

    const usersLiked = new Set(listData.usersLiked);

    const userLikedThisList = usersLiked.has(userId) ?  'btn-primary' : 'btn-outline-primary' ;



    function dateFormate(date:string){
        const formatedDate = new Date(date).toLocaleDateString();
        return formatedDate;
    }
    // Like button request and logic
    async function removedOutline(e:React.SyntheticEvent<HTMLButtonElement>){
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
      <Card className='h-100 m-2' style={{ width: '14rem' }}>
        <Card.Header><small>{listData.user.username}</small></Card.Header>
      <Card.Img className='w-100 rounded-0' variant="top" src={listData.user.userimage || "http://placekitten.com/400/400"} />
      <Card.Body className=' px-2 py-1'>
        <Card.Title className='text-dark fs-6'>{listData.name}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <div className='d-flex justify-content-between my-1'>
        <Link to={`/publiclist/trackstable/${listData._id}`}>
        <Button className='py-1 px-1' size='sm' variant="info">Watch</Button>
           
        </Link>
        <button data-list-id={listData._id} onClick={removedOutline} className={`py-1 px-1 btn btn-sm ${userLikedThisList}`} >Like<HandThumbsUp className='fs-6 mb-1 align-middle'/></button>
         </div>
        <small className="list-date text-muted">Likes: {likesCounter}</small>
        <div onClick={addToFavorites} role="button" className='float-end text-end' data-list-id={listData._id} >{ isFavorite ? <StarFill className='text-warning fs-5 me-1 isfavorite'/>:<Star className='text-warning fs-5 me-1'/>}</div>
        <Card.Footer className="text-muted p-0 pt-1 mt-1 bg-light bg-transparent">
        <small className="list-date text-muted">Created at : {dateFormate(listData.createdAt)}</small>
        <Link to={"/listdiscussion"} state={{ listId: listData._id }} >
        <Button className='p-0 px-1 float-end' size='sm' variant="outline-secondary">Comments</Button>
           
        </Link>
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}

export default PublicListCard
