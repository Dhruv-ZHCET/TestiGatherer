import React, { createContext, useState, useContext } from 'react';
import thankyouImg from '../assets/thankyou.gif';

// Create the context
const ThankYouContext = createContext();

// Create the provider component
export const ThankYouProvider = ({ children }) => {
    const [imagePreview, setImagePreview] = useState(thankyouImg);
    const [thankyouTitle, setThankyouTitle] = useState('Thank you!');
    const [thankyouMessage, setThankyouMessage] = useState('Thank you so much for your shoutout! It means a ton for us! 🙏');
    const [hideImage, setHideImage] = useState(false);
    const [redirect_url, setredirect_url] = useState("")
    const [header, setHeader] = useState('Header goes here ...');
    const [imageUrl, setImageUrl] = useState('');
    const [spacename, setspacename] = useState('');
    const [customMessage, setCustomMessage] = useState('Your custom message goes here');
    const [questions, setQuestions] = useState([
        'Who are you / what are you working on?',
        'How has [our product / service] helped you?',
        'What is the best thing about [our product / service]?',
    ]);

    return (
        <ThankYouContext.Provider
            value={{ imagePreview, setImagePreview, thankyouTitle, setThankyouTitle, thankyouMessage, setThankyouMessage, hideImage, setHideImage, redirect_url, setredirect_url, header, setHeader, imageUrl, setImageUrl, spacename, setspacename, customMessage, setCustomMessage, questions, setQuestions }}
        >
            {children}
        </ThankYouContext.Provider>
    );
};

// Custom hook to use ThankYouContext
export const useThankYouContext = () => {
    return useContext(ThankYouContext);
};
