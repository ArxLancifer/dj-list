import React from 'react'
import { IComment } from '../../interfaces/UserInterfaces'

function CommentContainer(props:{key:number, commentData:IComment}) {
  return (
    <div className="discussion bg-light border-top border-1 rounded-1">
         <div className='user-comment-container d-flex justify-content-between py-2 '>
        <div className='col-sm-1 col-2'>
            <div className='user-picture'><span className='fs-5 fw-bold'>{props.commentData.user.username[0]}</span></div>
        </div>
        <div className='text-start col-sm-11 col-10'>
            <small className='fw-bold'>{props.commentData.user.username}</small>
            <p>{props.commentData.commentText}</p>
        </div>
         </div>
        </div>
  )
}

export default CommentContainer
