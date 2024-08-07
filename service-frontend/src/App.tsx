import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import BoardList from './pages/BoardList';
import Mainpage from './pages/Mainpage';
import Signup from './pages/Signup';
import Header from './components/Header';
import MainNavi from './components/MainNavi';


const App = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  return (
    <div className="app-container">
      <div style={{ paddingBottom: '50px' }}>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/boardList' element={<BoardList />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
      <MainNavi />
    </div>
  );
};

export default App;
