import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heart from '../assets/heart.jpg';
import basic from '../assets/setting.png';
import extras from '../assets/extras.png';
import thankyouImg from '../assets/thankyou.gif';
import sidearrow from '../assets/sidearrow.png';
import { useThankYouContext } from '../context/context';

function Thankyou() {
	const navigate = useNavigate();
	const { imagePreview, setImagePreview, thankyouTitle, setThankyouTitle, thankyouMessage, setThankyouMessage, hideImage, setHideImage, redirect_url, setredirect_url } = useThankYouContext()

	// State for form inputs
	// const [imagePreview, setImagePreview] = useState(thankyouImg);
	// const [thankyouTitle, setThankyouTitle] = useState('Thank you!');
	// const [thankyouMessage, setThankyouMessage] = useState('Thank you so much for your shoutout! It means a ton for us! 🙏');
	// const [hideImage, setHideImage] = useState(false);


	// Handle file change for image
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
			setImagePreview(uploadImageURL.url);
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	// Handle checkbox for hiding the image
	const handleHideImage = () => {
		setHideImage(!hideImage);
	};

	return (
		<section className='lg:max-w-full max-w-2xl flex flex-col items-center lg:flex lg:flex-row lg:items-start rounded-xl shadow-xl bg-white'>
			<div className='py-5 lg:mt-20 lg:mr-6 lg:w-2/5 flex flex-col items-start max-w-lg'>
				<fieldset className='border-2 py-8 px-6 flex flex-col justify-center items-center m-4 rounded-md text-center lg:w-full'>
					<legend className='text-sm bg-green-300 py-1 px-3 rounded-xl text-green-700 font-semibold text-center'>
						Live preview - Thank you page
					</legend>

					{/* Live Preview Image */}
					{!hideImage && (
						<img className='w-full rounded-md' src={imagePreview} alt='thankyou' />
					)}

					{/* Live Preview Title */}
					<h2 className='font-bold text-[2.25rem] mt-4 text-[#55595f]'>
						{thankyouTitle || 'Thank you!'}
					</h2>

					{/* Live Preview Message */}
					<h5 className='text-[1.05rem] mt-3 mb-9 text-[#878a8d]'>
						{thankyouMessage || 'Thank you so much for your shoutout! It means a ton for us! 🙏'}
					</h5>
				</fieldset>

				<button
					className='flex gap-3 border-2 border-gray-200 px-3 py-1 justify-between items-center mx-4'
					onClick={() => navigate('/space-creation')}
				>
					<img className='w-5 h-4' src={sidearrow} alt='sidearrow' />
					<span>Go back</span>
				</button>
			</div>

			{/* Main Panel Start */}
			<div className='lg:mt-7 lg:ml-8 lg:mb-14 flex flex-col justify-center items-center lg:w-3/5 px-6 pb-5 w-full'>
				<nav className='flex py-5 border-b-2'>
					<button
						className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-e-none rounded-lg border-2 border-rose-50'
						onClick={() => navigate('/space-creation')}
					>
						<img className='h-5 w-5' src={basic} alt='basic' />
						<span className='text-black text-center py-1 md:text-base text-sm'>
							Basic
						</span>
					</button>
					<button
						className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-none border-2 border-rose-50'
						onClick={() => navigate('/thank-you')}
					>
						<img className='h-5 w-5 mix-blend-multiply' src={heart} alt='thanks' />
						<span className='text-black text-center py-1 md:text-base text-sm'>
							Thank you page
						</span>
					</button>
					<button className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-s-none rounded-lg border-2 border-rose-50'>
						<img className='h-6 w-6' src={extras} alt='extras' />
						<span className='text-black text-center py-1 md:text-base text-sm'>
							Extra setting
						</span>
					</button>
				</nav>

				<h1 className='text-4xl font-bold my-5'>Customize Thank You Page</h1>

				<form className='flex flex-col gap-1 w-full'>
					{/* Space Logo */}
					<div>
						<div className='lg:mt-16 lg:flex lg:gap-3 mt-9 flex gap-2'>
							<span>Image</span>
							<span>
								<input type='checkbox' checked={hideImage} onChange={handleHideImage} />{' '}
								<span className='text-sm text-[#646565]'>Hide the image?</span>
							</span>
						</div>

						{/* Logo upload button/undo */}
						<div className='mt-2 flex gap-4 items-center'>
							<img className='w-18 h-12 rounded-md' src={imagePreview} alt='logo' />
							<label className='flex gap-3 px-3 py-1 justify-center items-center border-gray-400 border-1 text-gray-600 h-8 text-center cursor-pointer'>
								<input type='file' onChange={handleImageChange} className='hidden' />
								Change
							</label>
						</div>
					</div>

					{/* Thank You Title */}
					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Header title'>Thank You Title</label>
						<input
							className='text-base p-2 rounded-md border-2'
							type='text'
							name='Header title'
							id='Header title'
							placeholder='Thank you!'
							value={thankyouTitle}
							onChange={(e) => setThankyouTitle(e.target.value)}
						/>
					</div>

					{/* Custom Message */}
					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Thank you message'>Thank You Message</label>
						<textarea
							className='text-med font-medium p-2 rounded-md border-2'
							name='Thank you message'
							id='Thank you message'
							rows={4}
							placeholder='Thank you so much for your shoutout! It means a ton for us! 🙏'
							value={thankyouMessage}
							onChange={(e) => setThankyouMessage(e.target.value)}
						></textarea>
						<h5 className='text-xs text-gray-500'>Markdown supported</h5>
					</div>

					{/* Redirect */}
					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Redirect'>Redirect to Your Own Page</label>
						<input
							onChange={(e) => {
								setredirect_url(e.target.value);
							}}
							className='text-base p-2 rounded-md border-2'
							type='text'
							name='redirect'
							id='redirect'
							placeholder='Enter URL to redirect'
						/>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Thankyou;
