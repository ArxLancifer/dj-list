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
import CreateListForm from './components/SubComponents/CreateListForm';


function App() {

    const fetchStatus:any = useSelector((state:any) => state.userData.fetchStatus)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(fetchStatus === 'idle'){
            dispatch<any>(fetchUserThunk())
        }
    }, [dispatch])





  return (
    <BrowserRouter>
    <NavigationBar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/signup' element={<UserSingup />} />
      <Route path='/userlists' element={<UserLists />} />
      <Route path='/createlist' element={<CreateListForm />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
