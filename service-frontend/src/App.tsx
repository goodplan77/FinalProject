import React, { useEffect, useState } from 'react';
import { Route, Router, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BoardList from './pages/board/BoardList';
import UsedList from './pages/board/UsedList';
import AdoptList from './pages/board/AdoptList';
import MissingList from './pages/board/MissingList';
import InsertBoard from './pages/board/InsertBoard';
import ChatList from './pages/chat/ChatList';
import ChatRoom from './pages/chat/ChatRoom';
import PetPlace from './pages/common/PetPlace';
import Weather from './pages/common/Weather';
import Navibar from './components/Navibar';
import './App.css';
import Headerbar from './components/Headerbar';
import FindUserId from './pages/user/FindUserId';
import FindUserPassword from './pages/user/FindUserPassword';
import SuccessUserId from './pages/user/SuccessUserId';
import ChangePassword from './pages/user/ChangePassword';
import CalendarPage from './pages/common/CalendarPage';
import BoardDetail from './pages/board/BoardDetail';
import Clause from './pages/common/Clause';
import Alarm from './pages/common/Alarm';
import SearchPage from './pages/common/SearchPage';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import InsertDog from './pages/dog/InsertDog';
import DogList from './pages/dog/DogList';
import BoardHeaderbar from './components/BoardHeader';
import MainPage from './pages/common/Mainpage';
import MyPage from './pages/user/Mypage';
import UpdateUserPage from './pages/user/UpdateUser';
import LoginPage from './pages/user/Login';
import SignUpPage from './pages/user/Signup';
import ChatHeaderbar from './components/ChatHeader';
import PostedPage from './pages/user/PostedPage';
import LikedList from './pages/user/LikedList';



const App = () => {
  let loginUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const currentLocation = useLocation(); // `location` 대신 `currentLocation`으로 변경
  const [boardNo, setBoardNo] = useState<string | undefined>(undefined);
  const [chatRoomNo, setChatRoomNo] = useState<string | undefined>(undefined);
  const [userNo, setUserNo] = useState<string | undefined>(undefined);

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
        {currentLocation.pathname.includes('/boardDetail') ? (
          <BoardHeaderbar boardNo={boardNo} />
        ) : currentLocation.pathname.includes('/chatRoom') ? (
          <ChatHeaderbar chatRoomNo={chatRoomNo} />
        ) : (
          <Headerbar />
        )}
      </div>


      <div className="app-container">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/updateUser' element={<UpdateUserPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/boardList' element={<BoardList />} />
          <Route path='/usedList' element={<UsedList />} />
          <Route path='/adoptList' element={<AdoptList />} />
          <Route path='/missingList' element={<MissingList />} />
          <Route path='/insertBoard' element={<InsertBoard />} />
          <Route path='/chatlist' element={<ChatList />} />
          <Route path='/chatRoom/:chatRoomNo' element={<ChatRoom setChatRoomNo={setChatRoomNo} />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/petPlace' element={<PetPlace />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='findUserId' element={<FindUserId />} />
          <Route path='findUserPassword' element={<FindUserPassword />} />
          <Route path='successUserId' element={<SuccessUserId />} />
          <Route path='changePassword' element={<ChangePassword />} />
          <Route path='calendarPage' element={<CalendarPage />} />
          <Route path='/boardDetail/:boardNo' element={<BoardDetail setBoardNo={setBoardNo} />} />
          <Route path='/clause' element={<Clause />} />
          <Route path='/alarm' element={<Alarm />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/insertDog' element={<InsertDog />} />
          <Route path='/dogList' element={<DogList />} />
          <Route path='/postedPage/:userNo' element={<PostedPage setUserNo={setUserNo} />} />
          <Route path='/likedList/:userNo' element={<LikedList setUserNo={setUserNo} />} />
        </Routes>
      </div>

      <div className="container navbar">
        <Navibar />
      </div>

    </div>
  );
};

export default App;
