import axios from 'axios';
import React, { useRef } from 'react';
import {Button, Form}  from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../store';

function CommentInput({setCommentState}:any) {
    const username = useSelector((state:RootState)=> state.userData.userInfo.name)
    const userId = useSelector((state:RootState)=> state.userData.userInfo.id)
    const userImage = useSelector((state:RootState)=> state.userData.userInfo.userImage)
    const userComment = useRef<HTMLTextAreaElement>(null);
    // const {state:{listId}} = useLocation(); 
    const params = useParams() 
    async function postComment(){
        const commentText:string = userComment.current?.value || ""
        if(commentText.length <= 0) return;
        await axios.post(`https://memotrack-api.onrender.com/publiclists/discussion/${params.listid}`, {userId, userComment:commentText})
        setCommentState((prevState:[{}]) => [...prevState, {commentText:commentText, user:{username:username}}])
    }

  return (
    <>
    <div className='comment-input d-flex flex-wrap justify-content-between py-2'>
        <div className='col-sm-1 col-2'>
            <div className='user-picture ms-3'>
            <img src={userImage || "http://placekitten.com/50/50"} alt="comment user avatar" />
            </div>
        </div>
        <div className='text-start col-sm-11 col-10'>
        <small className='fw-bold'>{username}</small>
        <Form.Control
        ref={userComment}
        className='mt-2'
        as="textarea"
        placeholder='Comment here'
        id="userID"
      />
        </div>
    <Button onClick={postComment} className='col-11 ms-auto' size='sm' variant='success'>Comment</Button>
    </div>
    </>
  )
}

export default CommentInput
