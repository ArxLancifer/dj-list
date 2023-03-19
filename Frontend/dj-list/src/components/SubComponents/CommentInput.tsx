import React from 'react';
import {Button, Form}  from 'react-bootstrap';
function CommentInput() {
  return (
    <>
    <div className='comment-input d-flex flex-wrap justify-content-between py-2'>
        <div className='col-sm-1 col-2'>
            <div className='user-picture'><span className='fs-5 fw-bold'>C</span></div>
        </div>
        <div className='text-start col-sm-11 col-10'>
        <small>Dj Mparmpa Giannis</small>
        <Form.Control
        className='mt-2'
        as="textarea"
        placeholder='Comment here'
        id="userID"
      />
        </div>
    <Button className='col-10 ms-auto' size='sm' variant='success'>Comment</Button>
    </div>
    </>
  )
}

export default CommentInput
