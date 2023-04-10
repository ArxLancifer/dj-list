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
import TracksTable from './components/SubComponents/TracksTable';
import AddTrackForm from './components/SubComponents/AddTrackForm';
import Footer from './components/Footer';
import PublicLists from './components/PublicLists';
import PublicTracksTable from './components/SubComponents/PublicTracksTable';
import ListDiscussion from './components/ListDiscussion';
import UploadImage from './components/SubComponents/accountComponents/UploadImage';
import AccountInformation from './components/SubComponents/accountComponents/AccountInformation';
import AccountSetting from './components/AccountSetting';
import ListCollection from './components/SubComponents/accountComponents/ListCollection';
import { RootState } from './components/store';


function App() {
    
    const fetchStatus:string = useSelector((state:RootState) => state.userData.fetchStatus)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(fetchStatus === 'idle'){
            dispatch<any>(fetchUserThunk())
        }
    }, [])






  return (
    <BrowserRouter>
    <NavigationBar />
    <main className='bg-dark-linear pt-4 px-1'>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/signup' element={<UserSingup />} />
      <Route path='/userlists' element={<UserLists />} />
      <Route path='/createlist' element={<CreateListForm />} />
      <Route path='/trackstable/:listid' element={<TracksTable />} />
      <Route path='/pushtrack-form'  element={<AddTrackForm />} />
      <Route path='/publiclists' element={<PublicLists />} />
      <Route path='/publiclist/trackstable/:listid' element={<PublicTracksTable />} />
      <Route path='/listdiscussion/:listid' element={<ListDiscussion />} />
      <Route path='/accountsettings' element={<AccountSetting />}>
            <Route path='accountinformation' element={<AccountInformation />} />
            <Route path='uploadavatar' element={<UploadImage />} />
            <Route path='listcollection' element={<ListCollection />} />
      </Route>
    </Routes>
    </main>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
