import { useState } from 'react';
import record from '../assets/record.png';
import pencil from '../assets/pencil.png';
import heart from '../assets/heart.jpg';
import basic from '../assets/setting.png';
import extras from '../assets/extras.png';
import dropdown from '../assets/dropdown.jpg';
import threedots from '../assets/threedots.webp';
import dump from '../assets/dump.jpg';
import addbutton from '../assets/addbutton.jpg';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useThankYouContext } from '../context/context';


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
	}
};



function SpaceCreation() {

	const { imagePreview, setImagePreview, thankyouTitle, setThankyouTitle, thankyouMessage, setThankyouMessage, hideImage, setHideImage, redirect_url, setredirect_url,
		header, setHeader, imageUrl, setImageUrl, spacename, setspacename, customMessage, setCustomMessage, questions, setQuestions } = useThankYouContext()




	const [headerError, setHeaderError] = useState(false);

	const navigate = useNavigate();

	const handlespacecreation = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token'); // Retrieve the token from local storage

		const SpaceCreationResponse = await axios.post(
			"http://localhost:3001/api/v1/space-creation",
			{
				space_name: spacename,
				logo: imageUrl,
				header: header,
				customMessage: customMessage,
				questions: questions,
				/* hide_gif    Boolean @default(false)
			  thankyou_img_url  String
			  thankyou_msg  String
				thankyou_title String

			  redirectPageUrl  String */
				hide_gif: hideImage,
				thankyou_img_url: imagePreview,
				thankyou_msg: thankyouMessage,
				redirectPageUrl: redirect_url,
				thankyou_title: thankyouTitle
			},
			{
				headers: {
					'Authorization': `Bearer ${token}`, // Add the authorization header
				},
			}
		);

		/* hide_gif    Boolean @default(false)
  thankyou_img_url  String
  thankyou_msg  String
  redirectPageUrl  String */


		if (SpaceCreationResponse.data.message) {
			toast.success(SpaceCreationResponse.data.message)
			// setTimeout(() => {
			// 	navigate('/dashboard');
			// }, 1000);
		}
		console.log(SpaceCreationResponse.data)
	}




	// Handle the change of individual questions
	const handleQuestionChange = (index, newValue) => {
		const newQuestions = [...questions];
		newQuestions[index] = newValue;
		setQuestions(newQuestions);
	};

	// Delete a question from the list
	const handleDeleteQuestion = (index) => {
		const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
		setQuestions(newQuestions);
	};

	const handleHeaderChange = (e) => {
		const value = e.target.value;
		if (value.length <= 35) {
			setHeader(value);
			setHeaderError(false); // Remove error if within limit
		} else {
			setHeaderError(true); // Show error if limit exceeded
		}
	};

	// Handle removing uploaded image
	const handleRemoveImage = () => {
		setImageUrl('');
	};




	return (
		<section className='lg:max-w-6xl max-w-2xl flex flex-col items-center lg:flex lg:flex-row lg:items-start rounded-xl shadow-xl bg-white'>
			<div className='py-5 lg:mt-20 lg:mr-6 lg:w-2/5 max-w-lg'>
				<fieldset className='border-2 py-5 px-6 flex flex-col justify-center items-center m-4 rounded-md text-center'>
					<legend className='text-sm bg-green-300 py-1 px-3 rounded-xl text-green-700 font-semibold text-center'>
						Live preview-Testimonial page
					</legend>
					<div className='w-28 h-28 overflow-hidden'>
						<img
							className='w-full h-full object-cover'
							src={
								imageUrl === ''
									? 'https://testimonial.to/static/media/just-logo.040f4fd2.svg'
									: imageUrl
							}
							alt='Space logo'
						/>
					</div>
					<h2 className='font-bold text-[2rem]'>
						{header === '' ? 'Header goes here ...' : header}
					</h2>
					<h5 className='text-[1.15rem] my-6'>{customMessage}</h5>
					<span className='font-semibold text-xl tracking-wide py-1 border-b-4 border-b-violet-600'>
						QUESTIONS
					</span>
					<ul className='list-disc font-bold text-gray-700 text-[1rem] my-4 text-left pl-6'>
						{questions.map((question, index) => (
							<li key={index}>{question}</li>
						))}
					</ul>
					<div className='w-full flex flex-col gap-2 my-6'>
						<button className='flex justify-center gap-3 mix-blend-multiply bg-[#5d5dff] p-1 w-full'>
							<img className='h-7 w-7' src={record} alt='record' />
							<p className='text-white'>Record a video</p>
						</button>
						<button className='flex justify-center gap-3 mix-blend-multiply bg-[#ff5d5d] p-2 w-full'>
							<img className='h-5 w-5' src={pencil} alt='record' />
							<p className='text-white'>Send a text</p>
						</button>
					</div>
				</fieldset>
			</div>
			<div className='lg:mt-7 lg:ml-8 lg:mb-14 flex flex-col items-center lg:w-3/5 px-6 w-[90%]'>
				<nav className='flex py-5 border-b-2'>
					<button
						className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-e-none rounded-lg border-2 border-rose-50'
						onClick={() => {
							navigate('/space-creation');
						}}
					>
						<img className='h-5 w-5' src={basic} alt='basic' />
						<span className='text-black text-center py-1 md:text-base text-sm'>
							Basic
						</span>
					</button>
					<button
						className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-none border-2 border-rose-50'
						onClick={() => {
							navigate('/thank-you');
						}}
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
				<h1 className='text-3xl sm:text-4xl font-bold my-5 text-center'>
					Create a new Space{' '}
				</h1>
				<h5 className='text-md sm:text-lg space text-center text-gray-500'>
					After the Space is created, it will generate a dedicated page for
					collecting testimonials.
				</h5>
				<form className='flex flex-col gap-3 w-full'>
					<div className='flex flex-col gap-1 mt-12'>
						<label className='text-base' htmlFor='Space name'>
							Space name
						</label>
						<input
							className='text-lg p-2 rounded-md border-2'
							type='text'
							name='Space name'
							id='Space name'
							onChange={(e) => {
								setspacename(e.target.value);
							}}
						/>
						<h5 className='text-xs text-gray-500'>
							Public URL is: testimonial.to/
							{spacename === '' ? 'your-space' : spacename}
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
										imageUrl ||
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
								onChange={(e) => handleFileUpload(e, setImageUrl)}
							/>

							{/* Add Remove Button for Image */}
							{imageUrl && (
								<button
									onClick={handleRemoveImage}
									className='text-red-500 font-semibold'
								>
									Remove Image
								</button>
							)}
						</div>
					</div>

					<div className='flex flex-col gap-1 mt-12'>
						<label className='text-base' htmlFor='Header title'>
							Header title *
						</label>
						<input
							className='text-lg font-semibold p-2 rounded-md border-2'
							type='text'
							name='Header title'
							id='Header title'
							value={header}
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
							value={customMessage}
							onChange={(e) => setCustomMessage(e.target.value)}
						></textarea>
						<h5 className='text-xs text-gray-500'>Markdown supported</h5>
					</div>

					<div>
						<label htmlFor='Space name'>Questions?</label>
						<ul className='mt-2 px-2 flex flex-col gap-3'>
							{questions.map((question, index) => (
								<li className='flex gap-1 items-center' key={index}>
									<img className='w-7 h-7' src={threedots} alt='threedots' />
									<input
										className='w-4/5 p-2 text-base border-2 rounded-md'
										type='text'
										id={`question-${index}`}
										value={question}
										onChange={(e) =>
											handleQuestionChange(index, e.target.value)
										}
									/>
									{/* Delete button to remove the question */}
									<button onClick={() => handleDeleteQuestion(index)}>
										<img className='w-7 h-7' src={dump} alt='delete' />
									</button>
								</li>
							))}
						</ul>
					</div>

					<button
						type='submit'
						className='bg-[#5d5dff] p-2 my-3 text-lg text-white rounded-none'
						onClick={handlespacecreation}
					>
						Create new Space
					</button>
				</form>
			</div>
			<Toaster></Toaster>
		</section>
	);
}

export default SpaceCreation;
