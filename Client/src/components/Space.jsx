import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toast, { Toaster } from "react-hot-toast";

// Import all your existing images 
import pencil from '../assets/pencil.png';
import record from '../assets/record.png';
import yellow from '../assets/yellow.png';
import purple from '../assets/purple.jpg';
import blue from '../assets/blue.png';
import red from '../assets/red.png';
import edit from '../assets/edit.png';
import hand from '../assets/hand.png';
import walloflove from '../assets/walloflove.png';
import link from '../assets/link.png';
import widget from '../assets/widget.png';
import star from '../assets/star.png';
import search from '../assets/search.png';
import DROP from '../assets/DROP.jpg';
import redheart from '../assets/redheart.png';

import WallOfLove from './WallOfLove';
import { BACKEND_URL } from '../utils/DB';

function Space() {
	const { spacename } = useParams();
	const [isWallOfLoveModalOpen, setIsWallOfLoveModalOpen] = useState(false);
	const [spaceinfo, setSpaceinfo] = useState({
		spaceinfo: {
			space_name: '',
			logo: '',
		},
	});
	const [testimonials, setTestimonials] = useState([]);
	const [displayTestimonials, setDisplayTestimonials] = useState([]);
	const [dropdown, setDropdown] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [isReordering, setIsReordering] = useState(false);
	const navigate = useNavigate();
	const toggleDropdown = () => {
		setDropdown(!dropdown);
	};

	// Fetch Space Info
	useEffect(() => {
		const fetchSpaceInfo = async () => {
			try {
				const response = await axios.get(
					`${BACKEND_URL}/api/v1/spaceinfo`,
					{
						params: { spacename },
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem('token'),
						},
					}
				);
				setSpaceinfo(response.data);
			} catch (error) {
				console.error('Error fetching space info:', error);
			}
		};

		fetchSpaceInfo();
	}, [spacename]);

	// Fetch Testimonials with Persisted Order
	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await axios.get(
					`${BACKEND_URL}/api/v1/fetchtestimonials`,
					{
						params: { spacename },
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem('token'),
						},
					}
				);

				// Retrieve saved order from localStorage
				const savedOrder = JSON.parse(
					localStorage.getItem(`testimonial-order-${spacename}`) || '[]'
				);

				let orderedTestimonials = response.data.testimonials;

				// If saved order exists, reorder testimonials
				if (savedOrder.length > 0) {
					orderedTestimonials = savedOrder.map(savedId =>
						response.data.testimonials.find(t => t.id === savedId)
					).filter(Boolean);

					// Append any new testimonials not in saved order
					const newTestimonials = response.data.testimonials.filter(
						t => !savedOrder.includes(t.id)
					);
					orderedTestimonials = [...orderedTestimonials, ...newTestimonials];
				}

				setTestimonials(orderedTestimonials);
				applyFiltersAndSearch(orderedTestimonials);
			} catch (error) {
				console.error('Error fetching testimonials:', error);
			}
		};

		fetchTestimonials();
	}, [spacename]);

	// Handle Drag and Drop Reordering
	const onDragEnd = (result) => {
		if (!result.destination) return;

		const reorderedTestimonials = Array.from(testimonials);
		const [reorderedItem] = reorderedTestimonials.splice(result.source.index, 1);
		reorderedTestimonials.splice(result.destination.index, 0, reorderedItem);

		// Save new order to localStorage
		const newOrder = reorderedTestimonials.map(t => t.id);
		localStorage.setItem(`testimonial-order-${spacename}`, JSON.stringify(newOrder));

		setTestimonials(reorderedTestimonials);
		applyFiltersAndSearch(reorderedTestimonials);
	};

	// Apply Filters and Search
	const applyFiltersAndSearch = useCallback((testimonialsToFilter) => {
		let filteredTestimonials = testimonialsToFilter;

		// Category Filter
		filteredTestimonials = filteredTestimonials.filter(testimonial => {
			switch (selectedCategory) {
				case 'liked':
					return testimonial.liked;
				case 'text':
					return true; // Assuming all are text for now
				default:
					return true;
			}
		});

		// Search Filter
		if (searchTerm) {
			filteredTestimonials = filteredTestimonials.filter(testimonial =>
				testimonial.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
				testimonial.email.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setDisplayTestimonials(filteredTestimonials);
	}, [selectedCategory, searchTerm]);

	// Update filters when dependencies change
	useEffect(() => {
		applyFiltersAndSearch(testimonials);
	}, [testimonials, selectedCategory, searchTerm, applyFiltersAndSearch]);

	// Like Handler
	const handleLiked = async (testimonialid, isLiked) => {
		try {
			const updatedTestimonials = testimonials.map((t) =>
				t.id === testimonialid ? { ...t, liked: !t.liked } : t
			);

			await axios.post(
				`${BACKEND_URL}/api/v1/liked`,
				{
					testimonialid,
					isLiked: !isLiked,
				},
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				}
			);

			setTestimonials(updatedTestimonials);
		} catch (error) {
			console.error('Error updating like status:', error);
		}
	};

	// Render Testimonial Card
	const renderTestimonialCard = (testimonial, index) => (
		<Draggable
			key={testimonial.id}
			draggableId={testimonial.id.toString()}
			index={index}
			isDragDisabled={!isReordering}
		>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`bg-[#2f3136] w-[90%] flex flex-col justify-center px-6 pt-4 pb-10 gap-3 rounded-md ${testimonial.liked ? 'border-2 border-red-500' : ''
						}`}
				>
					<div className='flex justify-between'>
						<span className='bg-[#dbeafe] text-[#2563eb] px-5 py-1 rounded-2xl'>
							Text
						</span>
						<button
							className='relative'
							onClick={() => handleLiked(testimonial.id, testimonial.liked)}
						>
							<img className='h-6 w-6' src={walloflove} alt='' />
							{testimonial.liked && (
								<img
									className='h-5 w-6 absolute top-1.5'
									src={redheart}
									alt=''
								/>
							)}
						</button>
					</div>

					<div>
						<div className='flex'>
							{[...Array(testimonial.Rating)].map((_, i) => (
								<img key={i} className='w-10 h-10' src={star} alt='' />
							))}
						</div>
						<p className='text-base font-normal'>{testimonial.Content}</p>
					</div>
					{testimonial.imageURL && (<img
						className='w-[25%] h-2/4 rounded-md'
						src={testimonial.imageURL}
						alt=''
					/>
					)}

					<div className='flex justify-between w-[70%]'>
						<div>
							<div>
								<span className=''>Name</span>
								<div className='flex flex-row gap-2 items-center'>
									<img
										className='h-12 w-12 rounded-full'
										src={testimonial.UserImageURL}
										alt=''
									/>
									<span className='text-base font-normal'>
										{testimonial.username}
									</span>
								</div>
							</div>
							<div className='flex flex-col'>
								<span className='text-base'>Submitted At</span>
								<span className='text-base font-normal'>
									{new Date(testimonial.submittedAt).toLocaleString()}
								</span>
							</div>
						</div>
						<div>
							<p className='text-base'>Email</p>
							<p className='text-base font-normal'>{testimonial.email}</p>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);

	return (
		<div className='w-full flex flex-col justify-center text-white font-bold bg-[#151719]'>
			{/* Header Section */}
			<div className='flex justify-between py-8 items-center border-gray-500 border-2 border-x-0 border-t-0'>
				<div className='flex gap-4 ml-4'>
					<img
						className='w-24 rounded-md'
						src={spaceinfo.spaceinfo.logo || 'https://via.placeholder.com/150'}
						alt=''
					/>
					<div>
						<h1 className='text-white font-bold text-4xl'>
							{spaceinfo.spaceinfo.space_name}
						</h1>
						<p className='text-gray-400 font-semibold'>
							Space public URL :{' '}
							<a
								href={`http://localhost:5173/testimonial.to/${spaceinfo.spaceinfo.space_name}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline"
							>
								{BACKEND_URL}/testimonial.to/{spaceinfo.spaceinfo.space_name}
							</a>
						</p>
					</div>
				</div>
				<button onClick={() => {
					navigate(`/edit/${spacename}`)
				}} className='bg-white flex justify-center items-center px-3 rounded-lg gap-3 h-12 mr-6 text-black'>
					<img className='h-4 w-4' src={pencil} alt='' />
					<span className='font-normal'>Edit space</span>
				</button>
			</div>

			<div className='px-4 pb-6 flex'>
				{/* Sidebar */}
				<div className='w-1/5 flex flex-col'>
					<ul className='flex flex-col gap-1 mt-12'>
						<p className='pb-2 ml-2 text-[#c5d2dc]'>INBOX</p>
						<li>
							<button
								className={`flex gap-2 items-center hover:bg-[#33363a] w-full py-2 px-3 rounded-md ${selectedCategory === 'all' ? 'bg-[#33363a]' : ''}`}
								onClick={() => setSelectedCategory('all')}
							>
								<img className='rounded-full w-2 h-2' src={purple} alt='' />
								<span className='font-semibold'>All</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a] focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='rounded-full w-2 h-2' src={yellow} alt='' />
								<span className='font-semibold'>Video</span>
							</button>
						</li>
						<li>
							<button
								className={`flex gap-2 items-center hover:bg-[#33363a] w-full py-2 px-3 rounded-md ${selectedCategory === 'text' ? 'bg-[#33363a]' : ''}`}
								onClick={() => setSelectedCategory('text')}
							>
								<img className='rounded-full w-2 h-2' src={blue} alt='' />
								<span className='font-semibold'>Text</span>
							</button>
						</li>
						<li>
							<button
								className={`flex gap-2 items-center hover:bg-[#33363a] w-full py-2 px-3 rounded-md ${selectedCategory === 'liked' ? 'bg-[#33363a]' : ''}`}
								onClick={() => setSelectedCategory('liked')}
							>
								<img className='rounded-full w-2 h-2' src={red} alt='' />
								<span className='font-semibold'>Liked</span>
							</button>
						</li>
					</ul>

					<ul className='flex flex-col gap-1 mt-8'>
						<p className='pb-2 ml-2 text-[#c5d2dc]'>EMBEDS & METRICS</p>
						<li>
							<button
								onClick={() => setIsWallOfLoveModalOpen(true)}
								className='flex gap-2 items-center hover:bg-[#33363a] focus:bg-[#33363a] w-full py-2 px-3 rounded-md'
							>
								<img className='w-4 h-4' src={walloflove} alt='' />
								<span className='font-semibold'>Wall of Love</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a] focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='w-4 h-4' src={widget} alt='' />
								<span className='font-semibold'>Collecting widget</span>
							</button>
						</li>
					</ul>

					<ul
						className='flex flex-col gap-1 mt-8'>
						<p className='ml-2 pb-2 text-[#c5d2dc]'>LINKS</p>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a] focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='w-6 h-6' src={link} alt='' />
								<span className='font-semibold'>Public landing page</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a] focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='w-6 h-6' src={link} alt='' />
								<span
									onClick={() => {
										navigate(`/testimonialwall/${spacename}`);
									}}
									className='font-semibold'
								>
									Wall of Love page
								</span>
							</button>
						</li>
					</ul>

					<ul className='flex flex-col gap-1 mt-8'>
						<p className='ml-2 pb-2 text-[#c5d2dc]'>SPACE SETTINGS</p>
						<li>
							<button onClick={() => {
								navigate(`/edit/${spacename}`)
							}} className='flex gap-2 items-center hover:bg-[#33363a] focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='w-4 h-4' src={edit} alt='' />
								<span className='font-semibold'>Edit the space</span>
							</button>
						</li>
						<li>
							<button
								onClick={() => setIsReordering(!isReordering)}
								className='flex gap-2 items-center hover:bg-[#33363a] focus:bg-[#33363a] w-full py-2 px-3 rounded-md'
							>
								<img className='w-4 h-4' src={hand} alt='' />
								<span className='font-semibold'>
									{isReordering ? 'Done Reordering' : 'Reorder in Wall of Love'}
								</span>
							</button>
						</li>
					</ul>
				</div>

				{/* Main Content */}
				<div className='w-4/5 flex flex-col gap-10 pt-16 items-center px-32'>
					{/* Search Bar */}
					<div className='w-[90%] flex'>
						<div className='flex gap-2 items-center w-[85%]'>
							<img className='w-5 h-5' src={search} alt='' />
							<input
								className='px-3 py-2 w-4/6 bg-[#151719] font-normal focus:outline-none'
								type='text'
								placeholder='Search by name, email'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className='flex flex-col gap-3 text-black items-end w-[30%] relative'>
							<button
								className='bg-white px-6 py-2 rounded-lg font-normal text-base w-[50%] flex justify-center items-center gap-2'
								onClick={toggleDropdown}
							>
								<h1>Options</h1>
								<img className='h-4 w-4' src={DROP} alt='' />
							</button>
							{dropdown && (
								<div className='bg-white px-1 py-2 rounded-lg w-full absolute top-full mt-2'>
									<div className='flex items-center gap-1 px-4 hover:bg-gray-400 rounded-lg'>
										<img className='w-8 h-8' src={record} alt='' />
										<p className='mb-1 font-normal'>Add a video</p>
									</div>
									<div className='flex items-center gap-4 px-4 hover:bg-gray-400 rounded-lg'>
										<img className='w-5 h-5' src={pencil} alt='' />
										<p className='mb-1 font-normal'>Add a text</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Testimonials List with Drag and Drop */}
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="testimonials">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className='w-full flex flex-col items-center gap-4'
								>
									{displayTestimonials.length ? (
										displayTestimonials.map(renderTestimonialCard)
									) : (
										<p>No testimonials available.</p>
									)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</div>

			{/* Modals and Toasts */}
			<WallOfLove
				isOpen={isWallOfLoveModalOpen}
				onClose={() => setIsWallOfLoveModalOpen(false)}
			/>
			<Toaster />
		</div>
	);
}

export default Space;