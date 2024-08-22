import React, { useEffect, useState } from 'react';
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
import CalendarPage from './pages/CalendarPage';
import BoardDetail from './pages/BoardDetail';
import Clause from './pages/Clause';
import Alarm from './pages/Alarm';
import SearchPage from './pages/SearchPage';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import UpdateUser from './pages/UpdateUser';
import InsertDog from './pages/InsertDog';


const App = () => {
  let loginUser = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <div className='container'>


      <div className={`container ${!isHeaderVisible ? 'hidden' : ''}`}>
        <Headerbar />
      </div>

      <div className="app-container">
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/updateUser' element={<UpdateUser />} />
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
          <Route path='calendarPage' element={<CalendarPage />} />
          <Route path='/boardDetail/:boardNo' element={<BoardDetail />} />
          <Route path='/clause' element={<Clause />} />
          <Route path='/alarm' element={<Alarm />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/insertDog' element={<InsertDog />} />
        </Routes>
      </div>

      <div className="container navbar">
        <Navibar />
      </div>

    </div>
  );
};

export default App;
