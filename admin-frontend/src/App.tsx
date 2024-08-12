import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className='container'>
        <Routes>
          <Route path='/' element={<AdminLoginPage />} />
          <Route path='/adminPage/*' element={<AdminPage />} />
        </Routes>
    </div>
  );
}

export default App;
