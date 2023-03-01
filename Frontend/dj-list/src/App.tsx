import React, { useEffect } from 'react';
import UserLogin from './components/UserLogin';
import UserSingup from './components/UserSignup';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserLists from './components/UserLists';
import axios, { AxiosResponse } from 'axios';
import { stat } from 'fs';


function App() {

    const userData = useSelector(state => state)
    console.log(userData)
   async function fetchUserData(){
        const token: any = JSON.parse(localStorage.getItem('userToken') || '');
        const response = await axios.post("http://localhost:5000/gatekeeper", {token:token.createdUserToken});
        console.log(token.createdUserToken)
        console.log(response.data)
   }

   useEffect(()=>{
    fetchUserData()
   }, []);


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
