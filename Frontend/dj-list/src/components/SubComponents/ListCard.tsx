import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { IList, IToken } from '../../interfaces/UserInterfaces'
import {Link, useNavigate} from 'react-router-dom';
import {Trash} from 'react-bootstrap-icons'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function ListCard({listData}:{listData:IList}) {
    const navigate = useNavigate();
    const userToken = useSelector((state:RootState)=> state.userData.userInfo.userTokens as IToken);
   async function handleDelete(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        const userChoice= window.confirm("Are you sure you want to delete this list?")

        if(userChoice){
            try {
            const deleteResponse = await axios.delete<AxiosResponse>(`${process.env.REACT_APP_API_BASE_URL}/userlists/deletelist/${listData._id}`, 
            {headers:{
                Authorization:`Bearer ${userToken.createdUserToken}`,
            }})
            navigate(0);
        } catch (error) {
            console.log(error)
        }
        } else return;
    }

    

  return (
    <Link className='list-card' to={`/trackstable/${listData._id}`}>
        <div >
    <Card  className='m-2 shadow' style={{ width: '18rem' }} data-list-id={listData._id} >
        <Button onClick={handleDelete} size='sm'  variant="outline-danger border-0 position-absolute top-0 end-0 m-2 text-light"><Trash /></Button>
    <Card.Body className='d-flex flex-column justify-content-between' style={{
        backgroundImage: `url("/backgroundDark.jpg")`,
        WebkitBackgroundSize: "100% 100%",
      }}>
      <Card.Title>{listData.name}</Card.Title>
      <div>
      <Card.Subtitle className='d-block text-light'>{listData.genre}</Card.Subtitle>
      <Card.Subtitle className='d-block p-0 m-0 text-primary'>Dj {listData.user.username}</Card.Subtitle>
      </div>
    </Card.Body>
  </Card>
  </div>
  </Link>
  )
}

export default ListCard
