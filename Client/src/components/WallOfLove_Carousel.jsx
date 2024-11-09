import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';

const TestimonialCard = React.memo(({ testimonial }) => {
    return (
        <div className="w-full px-4">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                            src={testimonial.UserImageURL}
                            alt={testimonial.name}
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                            <div className="flex">
                                {[...Array(testimonial.Rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 text-yellow-400 fill-current"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {testimonial.imageURL && (
                        <img
                            className="w-full rounded-md mb-3 object-cover h-48"
                            src={testimonial.imageURL}
                            alt="Testimonial"
                        />
                    )}

                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {testimonial.Content}
                    </p>

                    <div className="text-xs text-gray-500 border-t pt-2">
                        {new Date(testimonial.submittedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});

TestimonialCard.displayName = 'TestimonialCard';

const WallOfLove_Carousel = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sortOrder, setSortOrder] = useState('newest');
    const { spacename } = useParams();

    // Number of cards to show per slide based on screen size
    const cardsPerSlide = {
        sm: 1,  // Mobile
        md: 2,  // Tablet
        lg: 3   // Desktop
    };

    // Load testimonials
    useEffect(() => {
        const fetchSpaceInfo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/v1/fetchtestimonials?spacename=${spacename}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                const data = await response.json();
                // Filter testimonials to only include liked ones
                const likedTestimonials = data.testimonials.filter(testimonial => testimonial.liked);
                setTestimonials(likedTestimonials);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchSpaceInfo();
    }, [spacename]);


    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev + 1 >= Math.ceil(testimonials.length / cardsPerSlide.lg) ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev - 1 < 0 ? Math.ceil(testimonials.length / cardsPerSlide.lg) - 1 : prev - 1
        );
    };

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <div className="min-h-screen w-full bg-gray-100 p-4">
            <div className="relative max-w-6xl mx-auto">
                {/* Carousel Container */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {/* Group testimonials into slides */}
                        {Array.from({ length: Math.ceil(testimonials.length / cardsPerSlide.lg) }).map((_, slideIndex) => (
                            <div key={slideIndex} className="flex-none w-full flex">
                                {testimonials
                                    .slice(slideIndex * cardsPerSlide.lg, (slideIndex + 1) * cardsPerSlide.lg)
                                    .map((testimonial, index) => (
                                        <TestimonialCard
                                            key={testimonial.id || index}
                                            testimonial={testimonial}
                                        />
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: Math.ceil(testimonials.length / cardsPerSlide.lg) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WallOfLove_Carousel;