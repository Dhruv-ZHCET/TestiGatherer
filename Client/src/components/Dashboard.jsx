import React, { useState, useEffect } from 'react';
import { PlusIcon, Settings, X } from 'lucide-react'; // Import X icon for close button
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BACKEND_URL } from '../utils/DB';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [spaces, setSpaces] = useState([]);

    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/space-fetch`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                const userspaces = response.data.spaces.spaces;
                console.log(userspaces);
                setSpaces(userspaces);
            } catch (error) {
                console.error('Error fetching spaces:', error);
            }
        };

        fetchSpaces();
    }, []);

    const togglePopup = () => setShowPopup(!showPopup);

    const handleCreateFromScratch = () => {
        navigate('/space-creation');
        setShowPopup(false);
    };

    return (
        <div className="mt-12 w-full min-h-screen bg-slate-950 text-white relative">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold">Spaces</h1>
                    <button
                        onClick={togglePopup}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md flex items-center"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Create a new space
                    </button>
                </header>

                {spaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {spaces.map((space) => (
                            <div
                                onClick={() => {
                                    navigate(`/space/${space.space_name}`)
                                }}
                                key={space.id}
                                className="relative bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-lg p-4 w-100 h-50 flex items-center"
                            >
                                {/* Left section: logo */}
                                <img
                                    src={space.logo || "https://via.placeholder.com/150"} // Fallback to placeholder if logo is empty
                                    alt={space.space_name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                {/* Right section: space details */}
                                <div className="ml-4 flex-1">
                                    <h2 className="text-lg font-semibold truncate">
                                        {space.space_name}
                                    </h2>
                                    <p className="text-sm text-gray-500">...</p>
                                </div>
                                {/* Settings Icon */}
                                <Settings className="absolute top-2 right-2 w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <img
                            className="w-48 h-48"
                            src="https://testimonial.to/static/media/no-message.18de8749.svg"
                            alt="No spaces yet"
                        />
                        <p className="text-gray-400 text-lg">No space yet, add a new one?</p>
                    </div>
                )}
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-6 w-72 relative">
                        {/* Close Button */}
                        <button
                            onClick={togglePopup}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                        >
                            <X className="w-5 h-5" /> {/* Close icon */}
                        </button>

                        <button
                            onClick={handleCreateFromScratch}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold mt-4 py-2 px-4 rounded-md flex items-center justify-between mb-4"
                        >
                            <span>Create from scratch</span>
                            <PlusIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
