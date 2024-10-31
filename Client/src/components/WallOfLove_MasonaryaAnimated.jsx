import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';


const TestimonialCard = React.memo(({ testimonial }) => {
    return (
        <div className="break-inside-avoid mb-4 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                    src={testimonial.UserImageURL || '/api/placeholder/40/40'}
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
                <div className="mb-3">
                    <img
                        className="w-full rounded-md object-cover max-h-72"
                        src={testimonial.imageURL}
                        alt="Testimonial"
                    />
                </div>
            )}

            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {testimonial.Content}
            </p>

            <div className="text-xs text-gray-500 border-t pt-2">
                {new Date(testimonial.submittedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </div>
        </div>
    );
});

TestimonialCard.displayName = 'TestimonialCard';

const WallOfLove_MasonaryAnimated = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isScrolling, setIsScrolling] = useState(true);
    const [resetKey, setResetKey] = useState(0);
    const { spacename } = useParams();
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const fetchSpaceInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/fetchtestimonials?spacename=${spacename}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setTestimonials(data.testimonials);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchSpaceInfo();
    }, [spacename]);

    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            if (!containerRef.current || !contentRef.current) return;

            const container = containerRef.current;
            const content = contentRef.current;
            const scrollBottom = container.scrollTop + container.clientHeight;

            // Check if we've reached the bottom
            if (Math.ceil(scrollBottom) >= content.scrollHeight) {
                setIsScrolling(false);

                // Pause at the bottom, then reset to top and restart scrolling
                timeoutId = setTimeout(() => {
                    container.scrollTop = 0;
                    setResetKey(prev => prev + 1);
                    setIsScrolling(true);
                }, 2000); // Pause for 2 seconds before restarting
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        let animationId;
        const scrollStep = () => {
            if (!containerRef.current || !isScrolling) return;

            containerRef.current.scrollTop += 1.5; // Adjust scroll speed here (1.5 pixels per frame)
            animationId = requestAnimationFrame(scrollStep);
        };

        if (isScrolling) {
            animationId = requestAnimationFrame(scrollStep);
        }

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isScrolling, resetKey]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-gray-100 overflow-hidden"
        >
            <div
                ref={contentRef}
                className="p-4"
            >
                <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg xl:masonry-xl">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={`${testimonial.id || index}-${resetKey}`}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WallOfLove_MasonaryAnimated;
