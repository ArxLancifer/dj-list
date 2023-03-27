import React, { useRef } from 'react'

function UploadImage() {
    function upload(){
        const formData = new FormData
    }
    const imgref = useRef()
  return (

    

    <div>
      <h2>With <code>"express"</code> npm package</h2>
    <form action="http://localhost:5000/uploadimage" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="userAvata" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
    </div>
  )
}

export default UploadImage
