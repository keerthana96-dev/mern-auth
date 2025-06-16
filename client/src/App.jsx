import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from './pagesfolder/Home';
import Login from './pagesfolder/Login';
import VerifyEmail from './pagesfolder/VerifyEmail';
import ResetPassword from './pagesfolder/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<VerifyEmail/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />

       
      </Routes>


    </div>
  )
}

export default App