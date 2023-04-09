import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation, useParams } from 'react-router-dom';
import { IComment } from '../interfaces/UserInterfaces';
import CommentContainer from './SubComponents/CommentContainer';
import CommentInput from './SubComponents/CommentInput';

function ListDiscussion() {

    const [comments, setComments] = useState<IComment[]>([])
    const [listInfo, setListInfo] = useState({listName:"", listGenre:"", listDescription:""});
    const {state:{listOwner}} = useLocation()
    const params = useParams()
    async function getComments(){
        
        const fetchedList = await axios.get(`http://localhost:5000/publiclists/discussion/${params.listid}`)
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
    <Card className="text-center h-100 mt-5">
      <Card.Header className='pb-0'><h4 className='d-inline-block'>{listInfo.listName}</h4> : <small>{listInfo.listGenre}</small></Card.Header>
      <Card.Body>
      <Card.Title className='text-dark mx-0 d-flex align-items-center'>
      <div>
       <div className='user-picture-discussion m-0 me-2'><span className='fs-4 fw-bold'>A</span></div>
      </div>
       <div>{listOwner}</div>
      </Card.Title>
        <Card.Text className='w-75 mx-auto my-4'>
          {listInfo.listDescription ? listInfo.listDescription : "There is no any description for this list."}
        </Card.Text>
        <Button className='mb-4' variant="primary">Go to list</Button>
         {comments.map((comment, idx) => <CommentContainer key={idx} commentData={comment} />)}
        <Card.Footer className='p-0'>
            <CommentInput setCommentState={setComments}/>
        </Card.Footer>
      </Card.Body>
        
    </Card>
    </Container>
  )
}

export default ListDiscussion
