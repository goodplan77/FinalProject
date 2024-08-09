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
import Navibar from './components/Navibar';
import './App.css';


const App = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  return (
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
        <Route path='/chatRoom' element={<ChatRoom />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/petPlace' element={<PetPlace />} />
      </Routes>
    </div>
  );
};

export default App;
