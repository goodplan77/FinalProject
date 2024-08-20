import React from 'react';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import BoardList from './pages/BoardList';
import Mainpage from './pages/Mainpage';
import Signup from './pages/Signup';
import UsedList from './pages/UsedList';
import AdoptList from './pages/AdoptList';
import MissingList from './pages/MissingList';
import InsertBoard from './pages/InsertBoard';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import PetPlace from './pages/PetPlace';
import Weather from './pages/Weather';
import Navibar from './components/Navibar';
import './App.css';
import Headerbar from './components/Headerbar';
import FindUserId from './pages/FindUserId';
import FindUserPassword from './pages/FindUserPassword';
import SuccessUserId from './pages/SuccessUserId';
import ChangePassword from './pages/ChangePassword';
import BoardDetail from './pages/BoardDetail';


const App = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  return (

    <div className='container'>

      <Headerbar />

      <div className="app-container">
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/boardList' element={<BoardList />} />
          <Route path='/usedList' element={<UsedList />} />
          <Route path='/adoptList' element={<AdoptList />} />
          <Route path='/missingList' element={<MissingList />} />
          <Route path='/insertBoard' element={<InsertBoard />} />
          <Route path='/chatlist' element={<ChatList />} />
          <Route path='/chatRoom/:chatRoomNo' element={<ChatRoom />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/petPlace' element={<PetPlace />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='findUserId' element={<FindUserId />} />
          <Route path='findUserPassword' element={<FindUserPassword />} />
          <Route path='successUserId' element={<SuccessUserId />} />
          <Route path='changePassword' element={<ChangePassword />} />
          <Route path='/boardDetail/:boardNo' element={<BoardDetail />} />
        </Routes>
      </div>

      <Navibar />

    </div>
  );
};

export default App;
