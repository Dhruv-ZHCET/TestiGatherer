import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Landingpage from './components/Landingpage';
import { ToastContainer } from 'react-toastify';
import Spacecreation from './components/Spacecreation';
import Thankyou from './components/Thankyou';
import Dashboard from './components/Dashboard';
import MergedSpaceCreation from './components/MergedSpaceCreation';
import Space from './components/Space';

function App() {
	return (
		<BrowserRouter>
			<div className='bg-slate-950 min-h-100vh w-full flex flex-col'>
				<Navbar />
				<div className='flex-grow flex justify-center items-center '>
					<Routes>
						<Route path='/' element={<Landingpage />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/signin' element={<Signin />} />
						<Route path='/space-creation' element={<MergedSpaceCreation />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/space/:spacename' element={<Space />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
