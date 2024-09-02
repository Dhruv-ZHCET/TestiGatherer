// import '../App.css';
import heart from '../assets/heart.jpg';
import basic from '../assets/setting.png';
import extras from '../assets/extras.png';
import thankyou from '../assets/thankyou.gif';
import sidearrow from '../assets/sidearrow.png';
import { useNavigate } from 'react-router-dom';

function Thankyou() {
	const navigate = useNavigate();
	return (
		<section className='form flex flex-row align-center rounded-xl shadow-xl bg-white'>
			<div className=' py-6 mr-6   w-2/5 flex flex-col items-start'>
				<fieldset className='border-2 py-8 px-6 flex flex-col justify-center items-center m-4 rounded-md text-center w-full '>
					<legend className='text-sm bg-green-300 py-1 px-3 rounded-xl text-green-700 font-semibold text-center'>
						Live preview-Thank you page
					</legend>
					<img className=' w-full rounded-md' src={thankyou} alt='thankyou' />
					<h2 className='font-bold text-[2.25rem] mt-4 text-[#55595f]'>
						Thank you!
					</h2>
					<h5 className='text-[1.05rem] mt-3 mb-9 text-[#878a8d]'>
						Thank you so much for your shoutout! It means a ton for us!
						<span> &#128591;</span>
					</h5>
				</fieldset>

				<button className='flex gap-3 border-2 border-gray-200 px-3 py-1 justify-between items-center mx-4'>
					<img
						className='w-5 h-4 mix-blend-saturation'
						src={sidearrow}
						alt='sidearrow'
					/>
					<span>Go back</span>
				</button>
			</div>

			{/* main panel start */}
			<div className=' mt-7 ml-8 mb-14 flex flex-col items-center w-3/5 px-6'>
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
				<h1 className='text-4xl font-bold my-5'>Customize thank you page </h1>
				<form className='flex flex-col gap-1 w-full '>
					{/* name of the space */}

					{/* space logo */}
					<div>
						<div className='mt-16 flex gap-3'>
							<span>Image</span>
							<span>
								<input type='checkbox' />{' '}
								<span className='text-sm text-[#646565]'>hide the image?</span>
							</span>
						</div>
						{/* logo upload button/undo */}
						<div className='mt-2 flex gap-4 items-center'>
							<img className='w-18 h-12 rounded-md' src={thankyou} alt='logo' />
							<button className='flex gap-3 px-3 py-1 justify-center items-center  border-gray-400 border-1 text-gray-600 h-8 text-center'>
								Change
							</button>
						</div>
					</div>

					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Header title *'>Thank you title </label>
						<input
							className='text-base p-2 rounded-md border-2 '
							type='text'
							name='Header title *'
							id='Header title *'
							placeholder='Thank you!'
						/>
					</div>

					{/* custom message */}
					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Thank you message'>Thank you message </label>
						<textarea
							className='text-med font-medium p-2  rounded-md border-2'
							name='Your custom message '
							id='Your custom message '
							rows={4}
							placeholder='Thank you so much for your shoutout! It means a ton for us! &#128591;'
						></textarea>
						<h5 className='text-xs text-gray-500'>Markdown supported</h5>
					</div>

					<div className='flex flex-col gap-1 mt-3 items-start'>
						<span>Allow to share on social media</span>
						<button className='flex gap-3 px-4 pt-1 pb-2 justify-center items-center  border-gray-400 border-1 text-gray-600 h-8 text-center'>
							Click
						</button>
					</div>
					{/* redirect */}
					<div className='flex flex-col gap-1 mt-3'>
						<label htmlFor='Redirect *'>Redirect to your own page</label>
						<input
							className='text-base p-2 rounded-md border-2 '
							type='text'
							name='redirect'
							id='redirect '
						/>
					</div>
				</form>
			</div>
		</section>
	);
}
export default Thankyou;
