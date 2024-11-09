import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';

const FloatingHeart = () => (
	<div
		className='absolute animate-heart-float'
		style={{
			left: `${Math.random() * 100}%`,
			bottom: '0',
		}}
	>
		<div className='text-red-500 text-2xl'>❤️</div>
	</div>
);

const TestimonialCard = React.memo(
	({ testimonial, isDarkMode, showDate, showHearts }) => {
		return (
			<div
				className={`relative break-inside-avoid mb-4 p-4 rounded-lg shadow-md opacity-0 animate-fadeIn ${
					isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
				}`}
			>
				<div className='flex items-center gap-3 mb-4'>
					<img
						className='w-10 h-10 rounded-full object-cover border-2 border-gray-100'
						src={testimonial.UserImageURL || '/api/placeholder/40/40'}
						alt={testimonial.name}
					/>
					<div>
						<h3
							className={`font-semibold ${
								isDarkMode ? 'text-white' : 'text-gray-800'
							}`}
						>
							{testimonial.name}
						</h3>
						<div className='flex'>
							{[...Array(testimonial.Rating)].map((_, i) => (
								<Star
									key={i}
									className={`w-4 h-4 ${
										isDarkMode
											? 'text-yellow-400 fill-current'
											: 'text-yellow-400 fill-current'
									}`}
									fill='currentColor' // Ensures the star is filled
								/>
							))}
						</div>
					</div>
				</div>

				{testimonial.imageURL && (
					<div className='mb-3'>
						<img
							className='w-full rounded-md object-cover max-h-72'
							src={testimonial.imageURL}
							alt='Testimonial'
						/>
					</div>
				)}

				<p
					className={`text-sm leading-relaxed mb-3 ${
						isDarkMode ? 'text-gray-300' : 'text-gray-600'
					}`}
				>
					{testimonial.Content}
				</p>

				{showDate && (
					<div
						className={`text-xs border-t pt-2 ${
							isDarkMode ? 'text-gray-400 border-gray-600' : 'text-gray-500'
						}`}
					>
						{new Date(testimonial.submittedAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</div>
				)}

				{showHearts && <FloatingHeart />}
			</div>
		);
	}
);

TestimonialCard.displayName = 'TestimonialCard';


const WallOfLove_MasonryAnimated = () => {
	const [testimonials, setTestimonials] = useState([]);
	const [isScrolling, setIsScrolling] = useState(true);
	const [resetKey, setResetKey] = useState(0);
	const { spacename } = useParams();
	const containerRef = useRef(null);
	const [searchParams] = useSearchParams();
	const isDarkMode = searchParams.get('darktheme') === 'true';
	const showDate = searchParams.get('hidedate') !== 'true';
	const showHearts = searchParams.get('showheartanimation') === 'true';

	useEffect(() => {
		const fetchSpaceInfo = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/api/v1/fetchtestimonials?spacename=${spacename}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				const data = await response.json();
				// Filter testimonials to include only those that are liked
				const likedTestimonials = data.testimonials.filter(
					(testimonial) => testimonial.liked
				);
				setTestimonials(likedTestimonials);
			} catch (error) {
				console.error('Error fetching testimonials:', error);
			}
		};

		fetchSpaceInfo();
	}, [spacename]);

	useEffect(() => {
		let timeoutId;

		const handleScroll = () => {
			if (!containerRef.current) return;

			const container = containerRef.current;
			const scrollBottom = container.scrollTop + container.clientHeight;

			if (Math.ceil(scrollBottom) >= container.scrollHeight) {
				setIsScrolling(false);

				timeoutId = setTimeout(() => {
					container.scrollTop = 0;
					setResetKey((prev) => prev + 1);
					setIsScrolling(true);
				}, 2000);
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

			containerRef.current.scrollTop += 1.5;
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
			className={`fixed inset-0 overflow-hidden p-4 ${
				isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
			}`}
		>
			<div className='masonry-container columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4'>
				{testimonials.map((testimonial, index) => (
					<TestimonialCard
						key={`${testimonial.id || index}-${resetKey}`}
						testimonial={testimonial}
						isDarkMode={isDarkMode}
						showDate={showDate}
						showHearts={showHearts}
					/>
				))}
			</div>
		</div>
	);
};

export default WallOfLove_MasonryAnimated;
