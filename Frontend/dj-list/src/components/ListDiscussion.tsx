import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IComment } from '../interfaces/UserInterfaces';
import CommentContainer from './SubComponents/CommentContainer';
import CommentInput from './SubComponents/CommentInput';

function ListDiscussion() {

    const [comments, setComments] = useState<IComment[]>([])
    const [listInfo, setListInfo] = useState({listName:"", listGenre:"", listDescription:""});
    const {state:{listOwner},state:{ownerImage}} = useLocation();
    const params = useParams()
    async function getComments(){
        const fetchedList = await axios.get(`https://memotrack-api.onrender.com/publiclists/discussion/${params.listid}`)
        const listData = fetchedList.data;
        setListInfo({
            listName:listData.name, 
            listGenre:listData.genre, 
            listDescription:listData.description
        })
        setComments(listData.comments) 
    }
    useEffect(()=>{
        getComments();
    }, []);
  return (
    <Container>
    <Card className="text-center h-100 mt-5 bg-dark text-light">
      <Card.Header className='pb-0'><h4 className='d-inline-block'>{listInfo.listName}</h4> : <small>{listInfo.listGenre}</small></Card.Header>
      <Card.Body>
      <Card.Title className='text-dark mx-0 d-flex align-items-center'>
      <div>
       <div className='user-picture-discussion m-0 me-2'>
        <img className='w-100' src={ownerImage} alt='list owner avatar' /> 
       </div>
      </div>
       <div className='text-light'>{listOwner}</div>
      </Card.Title>
        <Card.Text className='w-75 mx-auto my-4'>
          {listInfo.listDescription ? listInfo.listDescription : "There is no any description for this list."}
        </Card.Text>
        <Link to={`/publiclist/trackstable/${params.listid}`}><Button className='mb-4' variant="primary">Go to list</Button></Link>
        <div className='p-0 rounded discussion-container'>
         {comments.map((comment, idx) => <CommentContainer key={idx} commentData={comment} />)}
        </div>
        <Card.Footer className='p-0'>
            <CommentInput setCommentState={setComments}/>
        </Card.Footer>
      </Card.Body>
        
    </Card>
    </Container>
  )
}

export default ListDiscussion
