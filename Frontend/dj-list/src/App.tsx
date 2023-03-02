import React, { useEffect } from 'react';
import UserLogin from './components/UserLogin';
import UserSingup from './components/UserSignup';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserLists from './components/UserLists';
import { useDispatch } from 'react-redux';
import {fetchUserThunk} from './components/store/userState'
import axios, { AxiosResponse } from 'axios';
import { stat } from 'fs';


function App() {
    // @ts-ignore
    const userData:any = useSelector(state => state.userData.userInfo.name)
    const fetchStatus:any = useSelector((state:any) => state.userData.fetchStatus)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(fetchStatus === 'idle'){
            dispatch<any>(fetchUserThunk())
        }
    }, [dispatch])



    // console.log(userData)
//    async function fetchUserData(){
//         const token: any = JSON.parse(localStorage.getItem('userToken') || '');
//         const response = await axios.post("http://localhost:5000/gatekeeper", {token:token.createdUserToken});
//         console.log(token.createdUserToken)
//         console.log(response.data)
//    }


  return (
    <BrowserRouter>
    <NavigationBar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/signup' element={<UserSingup />} />
      <Route path='/userlists' element={<UserLists />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
