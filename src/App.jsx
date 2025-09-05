import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';

function App() {
  const [blogs, setBlogs] = useState([]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs blogs={blogs} />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route
          path='/dashboard'
          element={<Dashboard blogs={blogs} setBlogs={setBlogs} />}
        />
      </Routes>
    </>
  );
}

export default App;
