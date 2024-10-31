import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

const TestimonialCard = React.memo(({ testimonial }) => {
    return (
        <div className="break-inside-avoid mb-4">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-fit">
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
                            className="w-full rounded-md mb-3 object-cover"
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

const WallOfLove_Masonary = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest');
    const { spacename } = useParams();

    // Load testimonials with saved order
    useEffect(() => {
        const fetchSpaceInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/fetchtestimonials?spacename=${spacename}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();

                const savedOrder = localStorage.getItem(`testimonialOrder-${spacename}`);
                const savedSortOrder = localStorage.getItem(`sortOrder-${spacename}`);

                if (savedOrder) {
                    const orderMap = new Map(JSON.parse(savedOrder));
                    const orderedTestimonials = [...data.testimonials].sort((a, b) => {
                        return (orderMap.get(a.id) || 0) - (orderMap.get(b.id) || 0);
                    });
                    setTestimonials(orderedTestimonials);
                } else {
                    setTestimonials(data.testimonials);
                }

                if (savedSortOrder) {
                    setSortOrder(savedSortOrder);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchSpaceInfo();
    }, [spacename]);

    // Save order whenever testimonials change
    useEffect(() => {
        if (testimonials.length > 0) {
            const order = testimonials.map((testimonial, index) => [testimonial.id, index]);
            localStorage.setItem(`testimonialOrder-${spacename}`, JSON.stringify(order));
            localStorage.setItem(`sortOrder-${spacename}`, sortOrder);
        }
    }, [testimonials, spacename, sortOrder]);

    return (
        <div className="min-h-screen w-screen bg-gray-100 p-4">
            {/* Sort Controls */}

            {/* Testimonials Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={testimonial.id || index}
                        testimonial={testimonial}
                    />
                ))}
            </div>
        </div>
    );
};

export default WallOfLove_Masonary;