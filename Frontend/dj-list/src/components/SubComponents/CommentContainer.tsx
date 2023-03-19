import React from 'react'

function CommentContainer() {
  return (
    <div className="discussion bg-light border-top border-1 rounded-1">
         <div className='user-comment-container d-flex justify-content-between py-2 '>
        <div className='col-sm-1 col-2'>
            <div className='user-picture'><span className='fs-5 fw-bold'>U</span></div>
        </div>
        <div className='text-start col-sm-11 col-10'>
            <small>User name</small>
            <p >user comment Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi a officiis possimus eveniet hic optio commodi provident dolorem magni dolores.</p>
        </div>
         </div>
        </div>
  )
}

export default CommentContainer
