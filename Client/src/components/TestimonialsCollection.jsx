import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import pencil from '../assets/pencil.png';
import record from '../assets/record.png';
import toast, { Toaster } from 'react-hot-toast';

const TestimonialsCollection = () => {
    const navigate = useNavigate()
    const { spacename } = useParams();
    const [spaceinfo, setSpaceinfo] = useState({
        spaceinfo: {
            space_name: "hbfhe",
            logo: "",
            header: "",
            customMessage: "",
            questions: []
        }
    });

    const [testimonial, setTestimonial] = useState({
        username: "",
        email: "",
        isTextContent: true,
        content: "",
        imageURL: "",
        UserImageURL: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    const imageInputRef = useRef(null);
    const userImageInputRef = useRef(null);

    const handlesubmit = async (e) => {
        e.preventDefault(); // Fixed the typo

        console.log(testimonial)
        console.log(rating)

        try {
            const response = await axios.post('http://localhost:3001/api/v1/sendtestimonials',
                {
                    testimonial, // Passed in the request body
                    rating,
                },
                {
                    params: { spacename }, // Sent spacename as query params
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            console.log(response.data.message); // Handle the response here

            toast.success(response.data.message)
            setTimeout(() => {
                navigate(`/space/${spacename}`)
            }, 1000);

        } catch (error) {
            console.error("Error sending testimonial:", error);
        }
    };

    useEffect(() => {
        const fetchSpaceInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/spaceinfo', {
                    params: { spacename },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setSpaceinfo(response.data);
            } catch (error) {
                console.error('Error fetching space info:', error);
            }
        };

        fetchSpaceInfo();
    }, [spacename]);

    const handleSendText = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleMouseOverStar = (value) => {
        setHoverValue(value);
    };

    const handleMouseLeaveStar = () => {
        setHoverValue(undefined);
    };

    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        if (!image) return;
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'testi_gatherer');
        data.append('cloud_name', 'dmxnc8pbu');

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dmxnc8pbu/image/upload',
                {
                    method: 'POST',
                    body: data,
                }
            );
            const uploadImageURL = await response.json();
            setTestimonial({ ...testimonial, imageURL: uploadImageURL.url });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleUserImageChange = async (e) => {
        const userImage = e.target.files[0];
        if (!userImage) return;
        const data = new FormData();
        data.append('file', userImage);
        data.append('upload_preset', 'testi_gatherer');
        data.append('cloud_name', 'dmxnc8pbu');

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dmxnc8pbu/image/upload',
                {
                    method: 'POST',
                    body: data,
                }
            );
            const uploadUserImageURL = await response.json();
            setTestimonial({ ...testimonial, UserImageURL: uploadUserImageURL.url });
        } catch (error) {
            console.error('Error uploading user image:', error);
        }
    };

    const handleUploadImage = () => {
        imageInputRef.current.click();
    };

    const handleUploadUserImage = () => {
        userImageInputRef.current.click();
    };

    const handleRemoveImage = () => {
        setTestimonial({ ...testimonial, imageURL: "" });
    };

    const handleRemoveUserImage = () => {
        setTestimonial({ ...testimonial, UserImageURL: "" });
    };

    return (
        <div className='bg-white py-5 lg:mt-20 lg:mr-6 lg:w-2/5 max-w-lg'>
            <fieldset className='border-2 py-5 px-6 flex flex-col justify-center items-center m-4 rounded-md text-center'>
                <legend className='text-sm bg-green-300 py-1 px-3 rounded-xl text-green-700 font-semibold text-center'>
                    Live preview - Testimonial page
                </legend>
                <div className='w-28 h-28 overflow-hidden'>
                    <img
                        className='w-full h-full object-cover'
                        src={spaceinfo.spaceinfo.logo || "https://via.placeholder.com/150"}
                        alt='Space logo'
                    />
                </div>
                <h2 className='font-bold text-[2rem]'>
                    {spaceinfo.spaceinfo.header}
                </h2>
                <h5 className='text-[1.15rem] my-6'>{spaceinfo.spaceinfo.customMessage}</h5>
                <span className='font-semibold text-xl tracking-wide py-1 border-b-4 border-b-violet-600'>
                    QUESTIONS
                </span>
                <ul className='list-disc font-bold text-gray-700 text-[1rem] my-4 text-left pl-6'>
                    {spaceinfo.spaceinfo.questions?.length > 0 ? (
                        spaceinfo.spaceinfo.questions.map((question, index) => (
                            <li key={index}>{question.question}</li>
                        ))
                    ) : (
                        <li>No questions available.</li>
                    )}
                </ul>
                <div className='w-full flex flex-col gap-2 my-6'>
                    <button className='flex justify-center gap-3 mix-blend-multiply bg-[#5d5dff] p-1 w-full'>
                        <img className='h-7 w-7' src={record} alt='record' />
                        <p className='text-white'>Record a video</p>
                    </button>
                    <button
                        className='flex justify-center gap-3 mix-blend-multiply bg-[#ff5d5d] p-2 w-full'
                        onClick={handleSendText}
                    >
                        <img className='h-5 w-5' src={pencil} alt='pencil' />
                        <p className='text-white'>Send a text</p>
                    </button>
                </div>
            </fieldset>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Write text testimonial to</h2>
                            <button onClick={handleCloseModal} className="text-2xl">&times;</button>
                        </div>
                        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                            <img src={spaceinfo.spaceinfo.logo || "https://via.placeholder.com/50"} alt="Logo" className="w-12 h-12 rounded-full mb-4" />
                            <h3 className="font-bold mb-2">Questions</h3>
                            <ul className="list-disc pl-5 mb-4">
                                {spaceinfo.spaceinfo.questions?.map((question, index) => (
                                    <li key={index}>{question.question}</li>
                                ))}
                            </ul>
                            <div className="flex mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleStarClick(star)}
                                        onMouseOver={() => handleMouseOverStar(star)}
                                        onMouseLeave={handleMouseLeaveStar}
                                        className="focus:outline-none"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill={(hoverValue || rating) >= star ? "gold" : "gray"}
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <textarea
                                className="w-full border p-2 mb-4"
                                rows="4"
                                value={testimonial.content}
                                onChange={(e) => setTestimonial({ ...testimonial, content: e.target.value })}
                            />
                            <div className="mb-4">
                                <input
                                    type="file"
                                    ref={imageInputRef}
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-2"
                                    onClick={handleUploadImage}
                                >
                                    Upload Image
                                </button>
                                {testimonial.imageURL && (
                                    <div className="mt-2">
                                        <img
                                            src={testimonial.imageURL}
                                            alt="Uploaded testimonial"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                            onClick={handleRemoveImage}
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border p-2 mb-4"
                                value={testimonial.username}
                                onChange={(e) => setTestimonial({ ...testimonial, username: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border p-2 mb-4"
                                value={testimonial.email}
                                onChange={(e) => setTestimonial({ ...testimonial, email: e.target.value })}
                                required
                            />
                            <div className="mb-4">
                                <p>Upload Your Photo</p>
                                <input
                                    type="file"
                                    ref={userImageInputRef}
                                    onChange={handleUserImageChange}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                                    onClick={handleUploadUserImage}
                                >
                                    Upload Photo
                                </button>
                                {testimonial.UserImageURL && (
                                    <div className="mt-2">
                                        <img
                                            src={testimonial.UserImageURL}
                                            alt="User photo"
                                            className="w-20 h-20 object-cover rounded-full"
                                        />
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                            onClick={handleRemoveUserImage}
                                        >
                                            Remove Photo
                                        </button>
                                    </div>
                                )}
                            </div>
                            <label className="flex items-center mb-4">
                                <input type="checkbox" className="mr-2" />
                                I give permission to use this testimonial across social channels and other marketing efforts
                            </label>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleCloseModal} className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
                            <button onClick={handlesubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
                        </div>
                    </div>
                    <Toaster />
                </div>
            )}
        </div>
    );
};

export default TestimonialsCollection;