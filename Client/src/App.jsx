import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Landingpage from './components/Landingpage';
import { ToastContainer } from 'react-toastify';


function App() {


  return (

    <BrowserRouter>
      <div className="bg-slate-950 min-h-100vh w-full flex flex-col">
        <Navbar />
        <div className='flex-grow flex justify-center items-center p-4 mt-6'>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>


  )
}

export default App