import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import Navbar from './Navbar'



const Signin = () => {

    const [Userdetail, setUserdetail] = useState({
        email: "",
        password: "",
    })

    const handleclick = async (e) => {
        e.preventDefault()



        try {
            const Userresponse = await axios.post("http://localhost:3001/api/v1/user/signin",

                Userdetail

            )

            if (Userresponse.data.message) {
                toast.success(Userresponse.data.message)
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            }
            console.log(Userresponse.data)
        }

        catch (err) {
            toast.error(
                err.response?.data?.message || 'Signin failed. Please try again.'

            );
        }

        setUserdetail({
            email: "",
            password: "",
        })


    }

    const navigate = useNavigate()

    return (

        <div className=' flex-col w-full max-w-md mx-auto min-h-screen'>

            <div>
                <h1 className="mb-16 text-white md:text-4xl text-3xl font-bold text-center">
                    Welcome back 👋                </h1>
            </div>
            <div className="p-4 flex items-center justify-center px-4">
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg">
                    <button className="w-full flex items-center justify-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <img className="h-5 w-10 mr-2  " src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" alt="Google logo" />
                        Sign in with Google
                    </button>

                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">Or, sign in with your email</span>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input onChange={() => {
                                setUserdetail({ ...Userdetail, email: event.target.value })
                            }} value={setUserdetail.email} id="email" name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Your email" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input onChange={() => {
                                setUserdetail({ ...Userdetail, password: event.target.value })
                            }} value={setUserdetail.password} id="password" name="password" type="password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                                Forgot Password?
                            </a>
                        </div>
                        <button onClick={handleclick} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </form>


                    <div className="text-center text-sm text-gray-400">
                        Don't have an account?
                        <button onClick={() => {
                            navigate('/signup')
                        }} className="font-medium text-indigo-400 hover:text-indigo-300 ml-1">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>

    )
}

export default Signin
