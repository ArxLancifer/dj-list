import React, { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'
import { IComment } from '../../interfaces/UserInterfaces'

function CommentContainer(props:{key:number, commentData:IComment}) {
  return (
    <Fragment>
         <div className='user-comment-container d-flex justify-content-between py-2'>
        <div className='col-sm-1 col-2'>
            <div className='user-picture'><img src={props.commentData.user.userimage || "http://placekitten.com/50/50"} alt="comment user avatar" /></div>
        </div>
        <div className='text-start col-sm-11 col-10'>
            <small className='fw-bold'>{props.commentData.user.username}</small>
            <p>{props.commentData.commentText}</p>
        </div>
         </div>
         <hr className='hr' />
        </Fragment>
  )
}

export default CommentContainer
