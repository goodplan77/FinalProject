import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Mainpage from './pages/Mainpage';
import Layout from './pages/Layout';
import './App.css';
import PostDetail from './pages/PostDetail';

const App = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  return (
    <div className="app-container">
      <Layout>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/boardList/detail' element={<PostDetail />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
