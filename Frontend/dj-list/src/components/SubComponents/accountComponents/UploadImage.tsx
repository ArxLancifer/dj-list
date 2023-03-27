import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import {CloudArrowUpFill} from 'react-bootstrap-icons'
function UploadImage() {
    
    const [fileName, setFileName] = useState<string>('');

    function fileNameHandler(e:React.ChangeEvent<HTMLInputElement>){
        const {files} = e.target;
        const filename = files as FileList
        setFileName(filename[0].name)
    }

  return (

    

    <div className='text-light'>
      <h4 >Upload profile picture</h4>
    <form action="http://localhost:5000/accountsettings/uploadavatar" encType="multipart/form-data" method="post">
      <label htmlFor="file-upload" className="custom-file-upload">
      <CloudArrowUpFill className='fs-5'/>
      <span className='ms-2'>Upload</span>
      </label>
      <i className='ms-2'>{fileName}</i>
      <input onChange={fileNameHandler} id="file-upload" name="userAvatar" type="file" accept="image/x-png,image/gif,image/jpeg"/>
      <Button className='d-block my-2' size='sm' variant='success' type="submit">Submit</Button>
    </form>
    </div>
  )
}

export default UploadImage
