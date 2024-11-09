import React, { useState, useEffect } from 'react';
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
	({
		testimonial,
		showHearts = false,
		isDarkMode = false,
		showDate = true,
	}) => {
		return (
			<div
				className={`break-inside-avoid mb-4 relative overflow-hidden ${
					isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
				}`}
			>
				<div
					className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-fit ${
						isDarkMode ? 'bg-gray-800' : 'bg-white'
					}`}
				>
					<div className='p-4'>
						<div className='flex items-center gap-3 mb-4'>
							<img
								className='w-10 h-10 rounded-full object-cover border-2 border-gray-100'
								src={testimonial.UserImageURL}
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
													: 'text-yellow-400'
											}`}
											fill={isDarkMode ? 'currentColor' : 'none'}
										/>
									))}
								</div>
							</div>
						</div>

						{testimonial.imageURL && (
							<img
								className='w-full rounded-md mb-3 object-cover'
								src={testimonial.imageURL}
								alt='Testimonial'
							/>
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
					</div>
				</div>

				{showHearts && <FloatingHeart />}
			</div>
		);
	}
);

TestimonialCard.displayName = 'TestimonialCard';

const WallOfLove_Masonary = () => {
	const [testimonials, setTestimonials] = useState([]);
	const [sortOrder, setSortOrder] = useState('newest');
	const [searchParams] = useSearchParams();
	const { spacename } = useParams();

	// Initialize dark mode and showDate based on the query parameters
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
				console.log(data);

				const likedTestimonials = data.testimonials.filter(
					(testimonial) => testimonial.liked
				);

				const savedOrder = localStorage.getItem(
					`testimonialOrder-${spacename}`
				);
				const savedSortOrder = localStorage.getItem(`sortOrder-${spacename}`);

				if (savedOrder) {
					const orderMap = new Map(JSON.parse(savedOrder));
					const orderedTestimonials = [...likedTestimonials].sort((a, b) => {
						return (orderMap.get(a.id) || 0) - (orderMap.get(b.id) || 0);
					});
					setTestimonials(orderedTestimonials);
				} else {
					setTestimonials(likedTestimonials);
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

	useEffect(() => {
		if (testimonials.length > 0) {
			const order = testimonials.map((testimonial, index) => [
				testimonial.id,
				index,
			]);
			localStorage.setItem(
				`testimonialOrder-${spacename}`,
				JSON.stringify(order)
			);
			localStorage.setItem(`sortOrder-${spacename}`, sortOrder);
		}
	}, [testimonials, spacename, sortOrder]);

	return (
		<div
			className={`min-h-screen w-screen p-4 ${
				isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
			}`}
		>
			<div className='columns-1 sm:columns-2 lg:columns-3 gap-4'>
				{testimonials.map((testimonial, index) => (
					<TestimonialCard
						key={testimonial.id || index}
						testimonial={testimonial}
						showHearts={showHearts}
						isDarkMode={isDarkMode}
						showDate={showDate}
					/>
				))}
			</div>
		</div>
	);
};

export default WallOfLove_Masonary;
