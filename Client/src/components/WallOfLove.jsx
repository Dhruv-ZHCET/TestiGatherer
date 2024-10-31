import React, { useState } from 'react';
import { X, ChevronLeft, ChevronDown, Copy } from 'lucide-react';

const WallOfLoveCustomization = ({ selectedLayout, onClose, showContent }) => {
	const [showBasic, setShowBasic] = useState(true);
	const [scrollDirection, setScrollDirection] = useState('Vertical');
	const [scrollSpeed, setScrollSpeed] = useState('Normal');
	const [settings, setSettings] = useState({
		removeTestimonialBranding: false,
		darkTheme: false,
		hideDate: false,
		hideSourceIcons: false,
		showHeartAnimation: false,
		pauseOnHover: true,
	});

	const updateSetting = (key) => {
		setSettings((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const embedCode = `<iframe
    src="https://embed-v2.testimonial.to/w/https-medium-app-5wjn-vercel-app-tag-all-light-animated"
    frameborder="0"
    scrolling="yes"
    width="100%"
    height="800px">
  </iframe>`;

	return (
		<div className='bg-white rounded-lg min-w-3xl max-h-[90vh] overflow-y-auto text-gray-800'>
			{/* Header */}
			<div className='p-4 flex items-center gap-3'>
				<button
					onClick={showContent}
					className='hover:bg-gray-100 p-1 rounded-md'
				>
					<ChevronLeft className='w-5 h-5' />
				</button>
			</div>

			{/* Content */}
			<div className='px-12'>
				{/* Step Indicator */}
				<div className='mb-6 flex flex-col items-center gap-3'>
					<h1 className='text-4xl'>Embed a Wall of Love</h1>
					<div className='flex gap-2 justify-center text-center'>
						<p className='text-purple-600 font-medium bg-[#f4f4ff] px-3 pt-1.5 rounded-2xl'>
							Step 2
						</p>
						<h5 className='text-lg font-medium mb-2 px-3 pt-1'>
							Customize your Wall of Love
						</h5>
					</div>
					<div className='flex items-center gap-2'>
						<span className='text-gray-400 text-lg font-medium'>
							{selectedLayout}
						</span>
					</div>
				</div>

				{/* Preview Area */}
				<div className='border rounded-lg mb-6'>
					<div className='p-4 bg-[#1e1e1e]'>
						<pre className='text-sm text-orange-400 overflow-auto h-20'>
							{embedCode}
						</pre>
					</div>
				</div>

				{/* Toggle Buttons */}
				<div className='flex gap-2 mb-6'>
					<button
						className={`px-4 py-2 rounded-md border-2 border-[#a8b5bd] transition ${
							showBasic ? 'bg-[#ebf1f5]' : 'hover:bg-gray-50'
						}`}
						onClick={() => setShowBasic(true)}
					>
						Basic
					</button>
					<button
						className={`px-4 py-2 rounded-md border-2 border-[#a8b5bd] transition ${
							!showBasic ? 'bg-[#ebf1f5]' : 'hover:bg-gray-50'
						}`}
						onClick={() => setShowBasic(false)}
					>
						More customization
					</button>
				</div>

				{/* Settings */}
				<div className='space-y-6'>
					{/* Scroll Direction */}
					<div className='flex gap-3 items-center'>
						<label className='block mb-2 font-medium'>Scroll direction:</label>
						<div className='relative w-40'>
							<select
								value={scrollDirection}
								onChange={(e) => setScrollDirection(e.target.value)}
								className='w-full p-2 pr-8 border font-normal rounded-md appearance-none bg-white cursor-pointer'
							>
								<option>Vertical</option>
								<option>Horizontal</option>
							</select>
							<ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none' />
						</div>
					</div>

					{/* Checkboxes */}
					<div className='space-y-3'>
						{Object.entries(settings).map(([key, value]) => (
							<label
								key={key}
								className='flex items-center gap-2 cursor-pointer'
							>
								<input
									type='checkbox'
									checked={value}
									onChange={() => updateSetting(key)}
									className='rounded accent-purple-600 border-gray-300'
								/>
								<span className='font-medium'>
									{key
										.split(/(?=[A-Z])/)
										.join(' ')
										.replace(/^\w/, (c) => c.toUpperCase())}
								</span>
							</label>
						))}
					</div>

					{/* Scroll Speed */}
					<div className='flex gap-3 items-center'>
						<label className='block mb-2 font-medium'>Scroll speed:</label>
						<div className='w-25'>
							<select
								value={scrollSpeed}
								onChange={(e) => setScrollSpeed(e.target.value)}
								className='w-full p-2 pr-8 font-normal border rounded-md bg-white cursor-pointer'
							>
								<option>Normal</option>
								<option>Slow</option>
								<option>Fast</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className='pb-4 mt-10 flex justify-between px-12 gap-3'>
				<button
					onClick={onClose}
					className='px-6 py-2 w-[50%] border-2 border-gray-400 rounded-md hover:bg-gray-50 transition'
				>
					Close
				</button>
				<button
					className='px-6 py-2 w-[50%] bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center justify-center gap-2'
					onClick={() => navigator.clipboard.writeText(embedCode)}
				>
					<Copy className='w-4 h-4' />
					Copy code
				</button>
			</div>
		</div>
	);
};

const WallOfLove = ({ isOpen, onClose }) => {
	const [selectedLayout, setSelectedLayout] = useState('animated');
	const [showCustomization, setShowCustomization] = useState(false);
	const handleLayoutSelect = (layoutId) => {
		setSelectedLayout(layoutId);
		setShowCustomization(true);
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
			{!showCustomization ? (
				<div className='w-full max-w-4xl bg-white rounded-2xl shadow-lg px-4 flex flex-col gap-2'>
					{/* Header */}
					<div className='flex justify-end items-center p-8 pb-0'>
						<button
							onClick={onClose}
							className='text-gray-400 hover:text-gray-600 p-2'
						>
							<X size={20} />
						</button>
					</div>

					{/* Step indicator */}
					<div className='mb-6 flex flex-col items-center gap-4 '>
						<h1 className='text-4xl text-black'>Embed a Wall of Love</h1>
						<div className='flex gap-2 justify-center text-center'>
							<p className='text-purple-600 font-medium bg-[#f4f4ff] px-3 pt-1.5 rounded-2xl'>
								Step 1
							</p>
							<h5 className='text-lg font-medium mb-2 px-3 pt-1 text-black'>
								Choose a Layout
							</h5>
						</div>
					</div>

					{/* Layout options */}
					<div className='px-8 grid grid-cols-3 gap-6'>
						<div
							className='h-64 rounded-lg border-2 border-[#a8b5bd] text-black text-center flex flex-col justify-center py-2 hover:shadow-xl'
							onClick={() => handleLayoutSelect('Animated')}
						>
							<img src='' alt='' />
							<span>Animated</span>
						</div>
						<div
							className='h-64 rounded-lg border-2 border-[#a8b5bd] text-black text-center flex flex-col justify-center py-2 hover:shadow-xl'
							onClick={() => handleLayoutSelect('Fixed')}
						>
							<img src='' alt='' />
							<span>Fixed</span>
						</div>
						<div
							className=' h-64 rounded-lg border-2 border-[#a8b5bd] text-black text-center flex flex-col justify-center py-2 hover:shadow-xl'
							onClick={() => handleLayoutSelect('Slider')}
						>
							<img src='' alt='' />
							<span>Slider</span>
						</div>
					</div>

					{/* Footer */}
					<div className='px-8 pb-8 text-center text-gray-600 text-md font-normal mb-3 mt-2'>
						Check out our{' '}
						<a href='#' className='text-gray-900 underline hover:text-gray-700'>
							Wall of Love embed guide
						</a>{' '}
						for more help.
					</div>
				</div>
			) : (
				<WallOfLoveCustomization
					selectedLayout={selectedLayout}
					onClose={() => {
						setShowCustomization(false);
						onClose();
					}}
					showContent={() => setShowCustomization(false)}
				/>
			)}
		</div>
	);
};

export default WallOfLove;
