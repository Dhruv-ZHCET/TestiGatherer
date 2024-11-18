import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BACKEND_URL } from '../utils/DB';


const Signin = () => {
    const navigate = useNavigate();

    const [userDetail, setUserDetail] = useState({
        email: "",
        password: "",
    });
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!userDetail.email || !userDetail.password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signin`,
                userDetail
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message || 'Successfully signed in');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            }
        } catch (err) {
            toast.error(
                err.response?.data?.error || 'Signin failed. Please try again.'
            );
            console.error('Signin error:', err);
        }
    };

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            // Decode the token locally to get the user's info
            const decodedToken = jwt_decode(credentialResponse.credential); // use jwt-decode library

            const { email, name } = decodedToken;

            // Send email and name to the server
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/google-signin`,
                { email, name }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success('Successfully signed in with Google');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            }
        } catch (error) {
            console.error('Google Sign-In failed:', error);
            toast.error('Google sign-in failed. Please try again.');
        }
    };

    return (
        <div className="flex-col w-full max-w-md mx-auto min-h-screen">
            <Toaster position="top-center" />

            <div>
                <h1 className="mb-16 text-white md:text-4xl text-3xl font-bold text-center">
                    Welcome back 👋
                </h1>
            </div>

            <div className="p-4 flex items-center justify-center px-4">
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg">
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <div className="flex flex-col gap-4">
                            {/* <button className="w-full flex items-center justify-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                <img
                                    className="h-5 w-10 mr-2"
                                    src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                                    alt="Google logo"
                                />
                                Sign in with Google
                            </button> */}
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    axios.post(`${BACKEND_URL}/api/v1/user/google-signin`, {
                                        token: credentialResponse.credential
                                    })
                                        .then((response) => {
                                            if (response.data.token) {
                                                localStorage.setItem("token", response.data.token);
                                                toast.success("Successfully signed in with Google");
                                                setTimeout(() => {
                                                    navigate("/dashboard");
                                                }, 1000);
                                            }
                                        })
                                        .catch((error) => {
                                            console.error("Google Sign-In failed:", error);
                                            toast.error("Google sign-in failed. Please try again.");
                                        });
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                    toast.error("Google Sign-In failed.");
                                }}
                            />
                        </div>
                    </GoogleOAuthProvider>

                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">
                                Or, sign in with your email
                            </span>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleClick}>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                onChange={handleChange}
                                value={userDetail.email}
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                onChange={handleChange}
                                value={userDetail.password}
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <button
                                    type="button"
                                    className="font-medium text-indigo-400 hover:text-indigo-300"
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="font-medium text-indigo-400 hover:text-indigo-300 ml-1"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;