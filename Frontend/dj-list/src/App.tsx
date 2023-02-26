import React from 'react';
import UserLogin from './components/UserLogin';
import UserSingup from './components/UserSignup';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserLists from './components/UserLists';


function App() {
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
