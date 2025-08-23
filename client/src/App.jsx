import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </>
  )
}

export default App
