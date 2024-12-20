import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useThankYouContext } from '../context/context';
import thankyouImg from '../assets/thankyou.gif';
import record from '../assets/record.png';
import pencil from '../assets/pencil.png';
import heart from '../assets/heart.jpg';
import basic from '../assets/setting.png';
import extras from '../assets/extras.png';
import dropdown from '../assets/dropdown.jpg';
import threedots from '../assets/threedots.webp';
import dump from '../assets/dump.jpg';
import { BACKEND_URL } from '../utils/DB';

const handleFileUpload = async (e, setImageUrl) => {
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
        setImageUrl(uploadImageURL.url);
    } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image');
    }
};

function EditSpace() {
    const navigate = useNavigate();
    const { spaceName } = useParams();
    const {
        setImagePreview,
        setThankyouTitle,
        setThankyouMessage,
        setHideImage,
        setredirect_url,
        setHeader,
        setImageUrl,
        setspacename,
        setCustomMessage,
        setQuestions
    } = useThankYouContext();

    const [headerError, setHeaderError] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [basicFormData, setBasicFormData] = useState({
        spacename: '',
        imageUrl: '',
        header: '',
        customMessage: '',
        questions: [] // Simple array of strings
    });

    const [thankYouFormData, setThankYouFormData] = useState({
        imagePreview: thankyouImg,
        thankyouTitle: '',
        thankyouMessage: '',
        hideImage: false,
        redirect_url: ''
    });

    useEffect(() => {
        let mounted = true;
        const token = localStorage.getItem('token');

        const fetchSpaceData = async () => {
            if (!token) {
                navigate('/login', { replace: true });
                return;
            }

            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/spaceinfo/edit`,
                    {
                        params: { spaceName },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!mounted) return;

                const spaceData = response.data.spaceinfo;
                if (!spaceData) {
                    toast.error("Space not found");
                    navigate('/dashboard', { replace: true });
                    return;
                }

                // Transform questions to simple strings
                const formattedQuestions = spaceData.questions.map(q =>
                    typeof q === 'object' ? q.question : q
                );

                setBasicFormData({
                    spacename: spaceData.space_name || '',
                    imageUrl: spaceData.logo || '',
                    header: spaceData.header || '',
                    customMessage: spaceData.customMessage || '',
                    questions: formattedQuestions || []
                });

                setThankYouFormData({
                    imagePreview: spaceData.thankyou_img_url || thankyouImg,
                    thankyouTitle: spaceData.thankyou_title || '',
                    thankyouMessage: spaceData.thankyou_msg || '',
                    hideImage: spaceData.hide_gif || false,
                    redirect_url: spaceData.redirectPageUrl || ''
                });
            } catch (error) {
                if (!mounted) return;
                console.error("Error fetching space data:", error);
                toast.error("Error fetching space data");
                navigate('/dashboard', { replace: true });
            }
        };

        if (spaceName) {
            fetchSpaceData();
        }

        return () => {
            mounted = false;
        };
    }, [spaceName, navigate]);

    const handleQuestionChange = (index, newValue) => {
        const newQuestions = [...basicFormData.questions];
        newQuestions[index] = newValue;
        setBasicFormData(prev => ({ ...prev, questions: newQuestions }));
    };
    { console.log(basicFormData.questions) }

    const handleDeleteQuestion = (index, e) => {
        e.preventDefault();
        const newQuestions = basicFormData.questions.filter((_, qIndex) => qIndex !== index);
        setBasicFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const handleHeaderChange = (e) => {
        const value = e.target.value;
        if (value.length <= 35) {
            setBasicFormData(prev => ({ ...prev, header: value }));
            setHeaderError(false);
        } else {
            setHeaderError(true);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setBasicFormData(prev => ({ ...prev, imageUrl: '' }));
    };

    const handleUpdateSpace = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login first");
            navigate('/login', { replace: true });
            return;
        }

        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const payload = {
                spacename: basicFormData.spacename,
                imageUrl: basicFormData.imageUrl,
                header: basicFormData.header,
                customMessage: basicFormData.customMessage,
                questions: basicFormData.questions,
                hideImage: thankYouFormData.hideImage,
                redirect_url: thankYouFormData.redirect_url,
                imagePreview: thankYouFormData.imagePreview,
                thankyouTitle: thankYouFormData.thankyouTitle,
                thankyouMessage: thankYouFormData.thankyouMessage
            };

            const updateResponse = await axios.put(
                `http://localhost:3001/api/v1/edit`,
                payload,
                {
                    params: { spaceName },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            if (updateResponse.data.message) {
                toast.success(updateResponse.data.message);
                // Wait for toast to be visible before navigation
                await new Promise(resolve => setTimeout(resolve, 1000));
                navigate('/dashboard', { replace: true });
            }
        } catch (error) {
            console.error("Error updating space:", error);
            toast.error(error.response?.data?.error || "Error updating space");
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    const handleTabSwitch = (tab) => {
        if (tab === 'basic') {
            setspacename(basicFormData.spacename);
            setImageUrl(basicFormData.imageUrl);
            setHeader(basicFormData.header);
            setCustomMessage(basicFormData.customMessage);
            setQuestions(basicFormData.questions);
        } else if (tab === 'thankyou') {
            setImagePreview(thankYouFormData.imagePreview);
            setThankyouTitle(thankYouFormData.thankyouTitle);
            setThankyouMessage(thankYouFormData.thankyouMessage);
            setHideImage(thankYouFormData.hideImage);
            setredirect_url(thankYouFormData.redirect_url);
        }
        setActiveTab(tab);
    };

    return (
        <section className='lg:max-w-6xl max-w-2xl flex flex-col items-center lg:flex lg:flex-row lg:items-start rounded-xl shadow-xl bg-white'>
            {/* Preview Section */}
            <div className='py-5 lg:mt-20 lg:mr-6 lg:w-2/5 max-w-lg'>
                {activeTab === 'basic' ? (
                    <fieldset className='border-2 py-5 px-6 flex flex-col justify-center items-center m-4 rounded-md text-center'>
                        <legend className='text-sm bg-green-300 py-1 px-3 rounded-xl text-green-700 font-semibold text-center'>
                            Live preview-Testimonial page
                        </legend>
                        <div className='w-28 h-28 overflow-hidden'>
                            <img
                                className='w-full h-full object-cover'
                                src={basicFormData.imageUrl === '' ? 'https://testimonial.to/static/media/just-logo.040f4fd2.svg' : basicFormData.imageUrl}
                                alt='Space logo'
                            />
                        </div>
                        <h2 className='font-bold text-[2rem]'>
                            {basicFormData.header === '' ? 'Header goes here ...' : basicFormData.header}
                        </h2>
                        <h5 className='text-[1.15rem] my-6'>{basicFormData.customMessage}</h5>
                        <span className='font-semibold text-xl tracking-wide py-1 border-b-4 border-b-violet-600'>
                            QUESTIONS
                        </span>
                        <ul className='list-disc font-bold text-gray-700 text-[1rem] my-4 text-left pl-6'>

                            {basicFormData.questions.map((question, index) => (
                                // { console.log(question) }
                                <li key={index}>   {question}</li>
                            ))}
                        </ul>
                    </fieldset>
                ) : (
                    <fieldset className='border-2 py-8 px-6 flex flex-col justify-center items-center m-4 rounded-md text-center lg:w-full'>
                        <legend className='text-sm bg-green-300 py-1 px-3 rounded-xl text-green-700 font-semibold text-center'>
                            Live preview - Thank you page
                        </legend>
                        {!thankYouFormData.hideImage && (
                            <img className='w-full rounded-md' src={thankYouFormData.imagePreview} alt='thankyou' />
                        )}
                        <h2 className='font-bold text-[2.25rem] mt-4 text-[#55595f]'>
                            {thankYouFormData.thankyouTitle || 'Thank you!'}
                        </h2>
                        <h5 className='text-[1.05rem] mt-3 mb-9 text-[#878a8d]'>
                            {thankYouFormData.thankyouMessage || 'Thank you so much for your shoutout! It means a ton for us! 🙏'}
                        </h5>
                    </fieldset>
                )}
            </div>

            {/* Form Section */}
            <div className='lg:mt-7 lg:ml-8 lg:mb-14 flex flex-col items-center lg:w-3/5 px-6 w-[90%]'>
                <nav className='flex py-5 border-b-2'>
                    <button
                        className={`flex gap-3 px-5 py-1 justify-center items-center ${activeTab === 'basic' ? 'bg-red-600' : 'bg-gray-200'} rounded-e-none rounded-lg border-2 border-rose-50`}
                        onClick={() => handleTabSwitch('basic')}
                    >
                        <img className='h-5 w-5' src={basic} alt='basic' />
                        <span className='text-black text-center py-1 md:text-base text-sm'>
                            Basic
                        </span>
                    </button>
                    <button
                        className={`flex gap-3 px-5 py-1 justify-center items-center ${activeTab === 'thankyou' ? 'bg-red-600' : 'bg-gray-200'} rounded-none border-2 border-rose-50`}
                        onClick={() => handleTabSwitch('thankyou')}
                    >
                        <img className='h-5 w-5 mix-blend-multiply' src={heart} alt='thanks' />
                        <span className='text-black text-center py-1 md:text-base text-sm'>
                            Thank you page
                        </span>
                    </button>
                    <button className='flex gap-3 px-5 py-1 justify-center items-center bg-gray-200 rounded-s-none rounded-lg border-2 border-rose-50'>
                        <img className='h-6 w-6' src={extras} alt='extras' />
                        <span className='text-black text-center py-1 md:text-base text-sm'>
                            Extra setting
                        </span>
                    </button>
                </nav>

                <h1 className='text-3xl sm:text-4xl font-bold my-5 text-center'>
                    {activeTab === 'basic' ? 'Edit Space' : 'Customize Thank You Page'}
                </h1>

                <form className='flex flex-col gap-3 w-full'>
                    {activeTab === 'basic' ? (
                        <>
                            <div className='flex flex-col gap-1 mt-12'>
                                <label className='text-base' htmlFor='Space name'>
                                    Space name
                                </label>
                                <input
                                    className='text-lg p-2 rounded-md border-2'
                                    type='text'
                                    name='Space name'
                                    id='Space name'
                                    value={basicFormData.spacename}
                                    onChange={(e) => setBasicFormData(prev => ({ ...prev, spacename: e.target.value }))}
                                />
                                <h5 className='text-xs text-gray-500'>
                                    Public URL is: testimonial.to/
                                    {basicFormData.spacename === '' ? 'your-space' : basicFormData.spacename}
                                </h5>
                            </div>

                            <div>
                                <div className='mt-3 flex gap-3'>
                                    <span>Space logo</span>
                                    <span>
                                        <input type='checkbox' /> <span>square?</span>
                                    </span>
                                </div>
                                <div className='mt-2 flex gap-4 items-center'>
                                    <div className='w-16 h-16 overflow-hidden'>
                                        <img
                                            src={
                                                basicFormData.imageUrl ||
                                                'https://testimonial.to/static/media/just-logo.040f4fd2.svg'
                                            }
                                            alt='logo'
                                            className='w-full h-full object-cover'
                                        />
                                    </div>

                                    <label
                                        className='flex gap-3 px-3 py-1 justify-center items-center bg-violet-100 w-fit h-10 rounded-lg'
                                        htmlFor='myfile'
                                    >
                                        <img
                                            className='h-5 w-5 mix-blend-multiply'
                                            src={dropdown}
                                            alt='add'
                                        />
                                        <span className='text-violet-500 text-base font-semibold'>
                                            Upload
                                        </span>
                                    </label>
                                    <input
                                        id='myfile'
                                        className='hidden'
                                        type='file'
                                        onChange={(e) => handleFileUpload(e, (url) => setBasicFormData(prev => ({ ...prev, imageUrl: url })))}
                                    />

                                    {basicFormData.imageUrl && (
                                        <button
                                            onClick={handleRemoveImage}
                                            className='text-red-500 font-semibold'
                                        >
                                            Remove Image
                                        </button>
                                    )}
                                </div>
                            </div>

                            < div className='flex flex-col gap-1 mt-12'>
                                <label className='text-base' htmlFor='Header title'>
                                    Header title *
                                </label>
                                <input
                                    className='text-lg font-semibold p-2 rounded-md border-2'
                                    type='text'
                                    name='Header title'
                                    id='Header title'
                                    value={basicFormData.header}
                                    onChange={handleHeaderChange}
                                    maxLength={35}
                                />
                                {headerError && (
                                    <h5 className='text-xs text-red-500'>
                                        Header title cannot exceed 35 characters.
                                    </h5>
                                )}
                                <h5 className='text-xs text-gray-500'>Recommended: 35 characters</h5>
                            </div>
                            <div className='flex flex-col gap-1 mt-3'>
                                <label htmlFor='Your custom message *'>Your custom message</label>
                                <textarea
                                    className='text-med font-medium p-2 rounded-md border-2'
                                    name='Your custom message '
                                    id='Your custom message '
                                    rows={5}
                                    placeholder='Write a warm message to your customers, and give them simple directions on how to make the best testimonial.'
                                    value={basicFormData.customMessage}
                                    onChange={(e) => setBasicFormData(prev => ({ ...prev, customMessage: e.target.value }))}
                                ></textarea>
                                <h5 className='text-xs text-gray-500'>Markdown supported</h5>
                            </div>

                            <div>
                                <label htmlFor='Space name'>Questions?</label>
                                <ul className='mt-2 px-2 flex flex-col gap-3'>
                                    {basicFormData.questions.map((question, index) => (
                                        <li className='flex gap-1 items-center' key={index}>
                                            <img className='w-7 h-7' src={threedots} alt='threedots' />
                                            <input
                                                className='w-4/5 p-2 text-base border-2 rounded-md'
                                                type='text' id={`question-${index}`}
                                                value={question}
                                                onChange={(e) =>
                                                    handleQuestionChange(index, e.target.value)
                                                }
                                            />
                                            <button onClick={() => handleDeleteQuestion(index)}>
                                                <img className='w-7 h-7' src={dump} alt='delete' />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <div className='lg:mt-16 lg:flex lg:gap-3 mt-9 flex gap-2'>
                                    <span>Image</span>
                                    <span>
                                        <input
                                            type='checkbox'
                                            checked={thankYouFormData.hideImage}
                                            onChange={() => setThankYouFormData(prev => ({ ...prev, hideImage: !prev.hideImage }))}
                                        />
                                        <span className='text-sm text-[#646565]'>Hide the image?</span>
                                    </span>
                                </div>
                                <div className='mt-2 flex gap-4 items-center'>
                                    <img
                                        className='w-18 h-12 rounded-md'
                                        src={thankYouFormData.imagePreview == '/src/assets/thankyou.gif' ? thankyouImg : thankYouFormData.imagePreview}
                                        alt='logo'
                                    />
                                    <label className='flex gap-3 px-3 py-1 justify-center items-center border-gray-400 border-1 text-gray-600 h-8 text-center cursor-pointer'>
                                        <input
                                            type='file'
                                            onChange={(e) => handleFileUpload(e, (url) => setThankYouFormData(prev => ({ ...prev, imagePreview: url })))}
                                            className='hidden'
                                        />
                                        Change
                                    </label>
                                </div>
                            </div>

                            <div className='flex flex-col gap-1 mt-3'>
                                <label htmlFor='Thank you title'>Thank You Title</label>
                                <input
                                    className='text-base p-2 rounded-md border-2'
                                    type='text'
                                    name='Thank you title'
                                    id='Thank you title'
                                    placeholder='Thank you!'
                                    value={thankYouFormData.thankyouTitle}
                                    onChange={(e) => setThankYouFormData(prev => ({ ...prev, thankyouTitle: e.target.value }))}
                                />
                            </div>

                            <div className='flex flex-col gap-1 mt-3'>
                                <label htmlFor='Thank you message'>Thank You Message</label>
                                <textarea
                                    className='text-med font-medium p-2 rounded-md border-2'
                                    name='Thank you message'
                                    id='Thank you message'
                                    rows={4}
                                    placeholder='Thank you so much for your shoutout! It means a ton for us! 🙏'
                                    value={thankYouFormData.thankyouMessage}
                                    onChange={(e) => setThankYouFormData(prev => ({ ...prev, thankyouMessage: e.target.value }))}
                                ></textarea>
                                <h5 className='text-xs text-gray-500'>Markdown supported</h5>
                            </div>

                            <div className='flex flex-col gap-1 mt-3'>
                                <label htmlFor='Redirect'>Redirect to Your Own Page</label>
                                <input
                                    onChange={(e) => setThankYouFormData(prev => ({ ...prev, redirect_url: e.target.value }))}
                                    className='text-base p-2 rounded-md border-2'
                                    type='text'
                                    name='redirect'
                                    id='redirect'
                                    placeholder='Enter URL to redirect'
                                    value={thankYouFormData.redirect_url}
                                />
                            </div>
                        </>
                    )}

                    <button
                        type='submit'
                        className={`bg-[#5d5dff] p-2 my-3 text-lg text-white rounded-none ${isLoading ? 'cursor-not-allowed' : ''}`}
                        onClick={handleUpdateSpace}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            'Update Space'
                        )}
                    </button>
                </form>
            </div>
            <Toaster />
        </section >
    );
}
export default EditSpace;