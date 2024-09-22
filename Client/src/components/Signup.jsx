import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from "react-hot-toast"


const Signup = () => {
    const navigate = useNavigate();
    const [Userdetail, setUserdetail] = useState({
        firstname: "",
        email: "",
        password: "",
    });

    const handleclick = async (e) => {
        e.preventDefault();

        try {
            const UserResponse = await axios.post(
                'http://localhost:3001/api/v1/user/signup',
                Userdetail
            );

            if (UserResponse.data.message) {
                localStorage.setItem('token', UserResponse.data.token);
                toast.success(UserResponse.data.message)
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
                // Redirect to a desired route after signup
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Signup failed. Please try again.'

            );
        } finally {
            setUserdetail({
                firstname: '',
                email: '',
                password: '',
            });
        }
    };

    return (

        <div className="flex-col w-full max-w-md mx-auto min-h-screen">

            <div>
                <h1 className="mb-16 text-white md:text-4xl text-3xl font-bold text-center">
                    Sign up for free 🤗
                </h1>
            </div>
            <div className="p-4 flex items-center justify-center px-4">
                <div className="w-full space-y-8 bg-gray-800 p-8 rounded-lg">
                    <button
                        className="w-full flex items-center justify-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <img
                            className="h-5 w-10 mr-2"
                            src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                            alt="Google logo"
                        />
                        Sign up with Google
                    </button>

                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">
                                Or, sign up with your email
                            </span>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6" >
                        <div>
                            <label htmlFor="Firstname" className="sr-only">
                                First Name
                            </label>
                            <input
                                onChange={(e) =>
                                    setUserdetail({
                                        ...Userdetail,
                                        firstname: e.target.value,
                                    })
                                }
                                value={Userdetail.firstname}
                                id="Firstname"
                                name="Firstname"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                onChange={(e) =>
                                    setUserdetail({
                                        ...Userdetail,
                                        email: e.target.value,
                                    })
                                }
                                value={Userdetail.email}
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                onChange={(e) =>
                                    setUserdetail({
                                        ...Userdetail,
                                        password: e.target.value,
                                    })
                                }
                                value={Userdetail.password}
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleclick}
                        >
                            Sign up
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-400">
                        Already have an account?
                        <button
                            onClick={() => {
                                navigate('/signin');
                            }}
                            className="font-medium text-indigo-400 hover:text-indigo-300 ml-1"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Signup;
