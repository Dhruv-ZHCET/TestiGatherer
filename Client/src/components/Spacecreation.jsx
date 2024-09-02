// import '../.css';
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
import { useState } from 'react';

function Spacecreation() {
	const [header, setHeader] = useState('Header goes here ...');
	
	const navigate = useNavigate();
	return (
		<section className='form flex flex-row align-center rounded-xl shadow-xl bg-white'>
			<div className=' py-5 mr-6 '>
				<fieldset className='border-2 py-5 px-6 flex flex-col justify-center items-center m-4 rounded-md text-center'>
					<legend className='text-sm bg-green-300 py-1 px-3 rounded-xl text-green-700 font-semibold text-center'>
						Live preview-Testimonial page
					</legend>
					<img
						className='h-28 w-28'
						src='https://testimonial.to/static/media/just-logo.040f4fd2.svg'
						alt=''
					/>
					<h2 className='font-bold text-[2rem]'>{header}</h2>
					<h5 className='text-[1.15rem] my-6'>Your custom message goes here</h5>
					<span className='font-semibold text-xl tracking-wide  py-1 border-b-4 border-b-violet-600 '>
						QUESTIONS
					</span>
					<ul className='list-disc font-bold  text-gray-700 text-[1rem] my-4 text-left pl-6'>
						<li>Who are you / what are you working on?</li>
						<li>How has [our product / service] helped you?</li>
						<li>What is the best thing about [our product / service]</li>
					</ul>
					<div className='w-full flex flex-col gap-2 my-6'>
						<button className='flex justify-center gap-3 mix-blend-multiply bg-[#5d5dff] p-1 w-full '>
							<img className='h-7 w-7' src={record} alt='record' />
							<p className='text-white'>Record a video</p>
						</button>
						<button className='flex justify-center gap-3 mix-blend-multiply bg-[#ff5d5d] p-2 w-full '>
							<img className='h-5 w-5' src={pencil} alt='record' />
							<p className='text-white'>Send a text</p>
						</button>
					</div>
				</fieldset>
			</div>
			<div className=' m-6 flex flex-col items-center'>
				{/* nav bar buttons */}
				<nav className='flex py-5 border-b-2'>
					<button
						className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-tr-none rounded-br-none border-2 border-rose-50 '
						onClick={() => {
							navigate('/space-creation');
						}}
					>
						<img className='h-5 w-5' src={basic} alt='basic' />
						<span className='text-black text-center py-1'> Basic </span>
					</button>
					<button
						className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-none border-2 border-rose-50'
						onClick={() => {
							navigate('/thank-you');
						}}
					>
						<img
							className='h-5 w-5 mix-blend-multiply'
							src={heart}
							alt='thanks'
						/>
						<span className='text-black text-center py-1'>Thank you page</span>
					</button>
					<button className='flex gap-3 px-5 py-1 justify-center items-center bg-red-600 rounded-tl-none rounded-bl-none border-2 border-rose-50'>
						<img className='h-6 w-6' src={extras} alt='extras' />
						<span className='text-black text-center py-1'>Extra setting</span>
					</button>
				</nav>
				<h1 className='text-4xl font-bold my-5'>Create a new Space </h1>
				<h5 className='text-lg text-center text-gray-500'>
					After the Space is created, it will generate a dedicated page for
					collecting testimonials.
				</h5>
				<form className='flex flex-col gap-3 w-full'>
					{/* name of the space */}
					<div className='flex flex-col gap-1 mt-12'>
						<label className='text-base' htmlFor='Space name'>
							Space name
						</label>
						<input
							className='text-lg p-2 rounded-md border-2'
							type='text'
							name='Space name'
							id='Space name'
						/>
						<h5 className='text-xs text-gray-500'>
							Public URL is: testimonial.to/your-space
						</h5>
					</div>

					{/* space logo */}
					<div>
						<div className='mt-3 flex gap-3'>
							<span>Space logo</span>
							<span>
								<input type='checkbox' /> <span>square?</span>
							</span>
						</div>
						{/* logo upload button/undo */}
						<div className='mt-2 flex gap-4 mb-'>
							<img src='' alt='logo' />
							<button
								className='flex gap-3 px-3 py-1 justify-center items-center border-gray-400 border-2 text-gray-600 text-justify rounded-lg'
								>Change</button>
							<input type="file" className='hidden' />
						</div>
					</div>

					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Header title *'>Header title </label>
						<input
							className='text-base p-2 rounded-md border-2 font-semibold'
							type='text'
							name='Header title *'
							id='Header title *'
							placeholder='Would you like to give a shoutout to xyz?'
							onChange={(e) => setHeader(e.target.value)}
						/>
					</div>

					{/* custom message */}
					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Your custom message *'>Your custom message </label>
						<textarea
							className='text-med font-medium p-2  rounded-md border-2'
							name='Your custom message '
							id='Your custom message '
							rows={5}
							placeholder='Write a warm message to your customers, and give them simple directions on how to make the best testimonial.'
						></textarea>
						<h5 className='text-xs text-gray-500'>Markdown supported</h5>
					</div>

					{/* Questions? */}
					<div>
						<label htmlFor='Space name'>Questions?</label>
						<ul className=' mt-2  px-2 flex flex-col gap-3'>
							<li className='flex gap-1 items-center'>
								<img className='w-7 h-7' src={threedots} alt='threedots' />
								<input
									className='w-4/5 p-2 text-base border-2 rounded-md'
									type='text'
									id='question 1'
									value='Who are you / what are you working on?'
								/>
								<img className='w-7 h-7 hover:' src={dump} alt='dump' />
							</li>
							<li className='flex gap-1 items-center'>
								<img className='w-7 h-7' src={threedots} alt='threedots' />
								<input
									className='w-4/5 p-2 text-base border-2 rounded-md'
									type='text'
									id='question 1'
									value='How has [our product / service] helped you?'
								/>
								<img className='w-7 h-7' src={dump} alt='dump' />
							</li>
							<li className='flex gap-1 items-center'>
								<img className='w-7 h-7' src={threedots} alt='threedots' />
								<input
									className='w-4/5 p-2 text-base border-2 rounded-md'
									type='text'
									id='question 1'
									value='What is the best thing about [our product / service]'
								/>
								<img className='w-7 h-7' src={dump} alt='dump' />
							</li>
						</ul>
					</div>
					{/* questions add button */}
					<div className='flex gap-1'>
						<button>
							<img
								className='w-5 h-5 mix-blend-multiply rounded-full'
								src={addbutton}
								alt='add'
							/>
						</button>
						<span> Add one (up to 5)</span>
					</div>

					<div className='flex flex-col gap-2'>
						<label htmlFor='Collect extra information'>
							Collect extra information
						</label>
						<button className='max-w-fit flex p-3 border-2 border-gray-300 justify-between'>
							<span>Name,email,title,social,link,etc.</span>
							<img className=' mr-0 w-6 h-1/5' src={dropdown} alt='dropdown' />
						</button>
					</div>

					{/* collect information */}
					<div className='flex flex-col gap-3'>
						<label htmlFor='collection type'>Collection type</label>
						<select className='w-1/4 p-3 bg-white border-2 rounded-md'>
							<option selected>Text and video</option>
							<option>Text only</option>
							<option>Text only</option>
						</select>
					</div>

					{/* language */}
					<div className='flex flex-col gap-3'>
						<label htmlFor='language'>Language</label>
						<select className='w-2/4 p-3 bg-white border-2 rounded-md'>
							<option selected>English</option>
							<option>Hindi</option>
							<option>Japanese</option>
							<option>Swedish</option>
							<option>Nigerian</option>
						</select>
					</div>

					{/* create space button */}
					<button className='bg-[#5d5dff] p-2 my-3 text-lg text-white rounded-none'>
						Create new Space
					</button>
				</form>
			</div>
		</section>
	);
}

export default Spacecreation;
