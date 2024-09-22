import React, { useState } from 'react';
import { PlusIcon, Code, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);

    const handleCreateFromScratch = () => {
        // Implement the logic for creating a space from scratch
        navigate('/space-creation')
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

                <div className="flex flex-col items-center justify-center space-y-6">
                    <img
                        className="w-48 h-48"

                        src="https://testimonial.to/static/media/no-message.18de8749.svg"
                    >

                    </img>
                    <p className="text-gray-400 text-lg">No space yet, add a new one?</p>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-6  w-72">
                        <button
                            onClick={handleCreateFromScratch}

                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-between mb-4"
                        >
                            <span>Create from scratch</span>
                            <Code className="w-5 h-5" />
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;