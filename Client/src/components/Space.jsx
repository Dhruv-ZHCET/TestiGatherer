import pencil from '../assets/pencil.png';
import sample from '../assets/sample.jpg';
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
import profile from '../assets/profile.png';
import DROP from '../assets/DROP.jpg';
import redheart from '../assets/redheart.png';
import record from '../assets/record.png';
import { useState } from 'react';

function Space() {
	const [dropdown, setDropdown] = useState(false);
	const [love, setLove] = useState(false)
	const toggleDropdown = () => {
		setDropdown(!dropdown);
	};

	const toggleLove = () => {
		setLove(!love);
	};

	return (
		<div className='w-full flex-column justify-center text-white font-bold bg-[#151719]'>
			<div className='flex justify-between py-8 items-center  border-gray-500 border-2 border-x-0 border-t-0'>
				<div className='flex gap-4 ml-4'>
					<img className='w-24 rounded-md' src={sample} alt='' />
					<div>
						<h1 className='text-white font-bold text-4xl'>kush</h1>
						<p className='text-gray-400 font-semibold'>
							Space public URL : <u>https://testimonial.to/kush</u>
						</p>
					</div>
				</div>

				<button className='bg-white flex justify-center items-center px-3 rounded-lg gap-3 h-12 mr-6 text-black'>
					<img className='h-4 w-4' src={pencil} alt='' />
					<span className='font-normal'>Edit space</span>
				</button>
			</div>
			<div className='px-4 pb-6 flex'>
				{/* menu section  */}
				<div className='w-1/5  flex flex-col justify-center'>
					{/* inbox */}

					<ul className='flex flex-col gap-1 mt-12'>
						<p className='pb-2 ml-2 text-[#c5d2dc]'>INBOX</p>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='rounded-full w-2 h-2' src={purple} alt='' />
								<span className='font-semibold'>All</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full  py-2 px-3 rounded-md'>
								<img className='rounded-full w-2 h-2' src={yellow} alt='' />
								<span className='font-semibold'>Video</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='rounded-full w-2 h-2' src={blue} alt='' />
								<span className='font-semibold'>Text</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className='rounded-full w-2 h-2' src={red} alt='' />
								<span className='font-semibold'>Liked</span>
							</button>
						</li>
					</ul>

					{/* embeds */}
					<ul className='flex flex-col gap-1 mt-12'>
						<p className='pb-2 ml-2 text-[#c5d2dc]'>EMBEDS & METRICS</p>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className=' w-4 h-4' src={walloflove} alt='' />
								<span className='font-semibold'>Wall of Love</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full  py-2 px-3 rounded-md'>
								<img className=' w-4 h-4' src={widget} alt='' />
								<span className='font-semibold'>Collecting widget</span>
							</button>
						</li>
					</ul>

					{/* links */}
					<ul className='flex flex-col gap-1 mt-12'>
						<p className='pb-2 ml-2 text-[#c5d2dc]'>LINKS</p>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className=' w-6 h-6' src={link} alt='' />
								<span className='font-semibold'>Public landing page</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full  py-2 px-3 rounded-md'>
								<img className=' w-6 h-6 ' src={link} alt='' />
								<span className='font-semibold'>Wall of Love page</span>
							</button>
						</li>
					</ul>
					{/* space settings */}
					<ul className='flex flex-col gap-1 mt-12'>
						<p className='ml-2 pb-2 text-[#c5d2dc]'>SPACE SETTINGS</p>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full py-2 px-3 rounded-md'>
								<img className=' w-4 h-4' src={edit} alt='' />
								<span className='font-semibold'>Edit the space</span>
							</button>
						</li>
						<li>
							<button className='flex gap-2 items-center hover:bg-[#33363a]  focus:bg-[#33363a] w-full  py-2 px-3 rounded-md'>
								<img className=' w-4 h-4' src={hand} alt='' />
								<span className='font-semibold'>Reorder in Wall of Love</span>
							</button>
						</li>
					</ul>
				</div>

				{/* main section */}
				<div className='w-4/5  flex flex-col gap-10 pt-16 items-center px-32'>
					{/* search bar */}
					<div className='w-[90%] flex'>
						<div className='flex gap-2 items-center w-[85%]'>
							<img className='w-5 h-5 ' src={search} alt='' />
							<input
								className='px-3 py-2 w-4/6 bg-[#151719] font-normal focus:outline-none'
								type='text'
								placeholder='Search by name,email'
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
										<img className='  w-8 h-8' src={record} alt='' />
										<p className='mb-1 font-normal'>Add a video</p>
									</div>
									<div className='flex items-center gap-4 px-4 hover:bg-gray-400 rounded-lg'>
										<img className='  w-5 h-5' src={pencil} alt='' />
										<p className='mb-1 font-normal'>Add a text</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* testimonials */}
					<div className='bg-[#2f3136] w-[90%] flex flex-col justify-center px-6 pt-4 pb-10 gap-3 rounded-md'>
						<div className='flex justify-between'>
							<span className='bg-[#dbeafe] text-[#2563eb] px-5 py-1 rounded-2xl'>
								Text
							</span>
							<button className=' relative ' onClick={toggleLove}>
								<img className='  h-6 w-6' src={walloflove} alt='' />
								{love && (
									<img
										className=' h-5 w-6 absolute top-1.5'
										src={redheart}
										alt=''
									/>
								)}
							</button>
						</div>

						{/* star rating  */}
						<div>
							<div className='flex'>
								<img className='w-10 h-10' src={star} alt='' />
								<img className='w-10 h-10' src={star} alt='' />
								<img className='w-10 h-10' src={star} alt='' />
								<img className='w-10 h-10' src={star} alt='' />
								<img className='w-10 h-10' src={star} alt='' />
							</div>
							<p className='text-base font-normal'>testimonial text</p>
						</div>
						<img className='w-[25%] h-2/4 rounded-md' src={sample} alt='' />

						{/* details */}
						<div className='flex justify-between w-[70%]'>
							<div>
								{/* name waala div */}
								<div>
									<span className=''>Name</span>
									<div className='flex flex-row gap-2  items-center'>
										<img
											className='h-12 w-12 rounded-full'
											src={profile}
											alt=''
										/>
										<span className='text-base font-normal'>Kushagra</span>
									</div>
								</div>
								<div className='flex flex-col'>
									<span className='text-base '>Submitted At</span>
									<span className='text-base font-normal'>
										1 October,2024,8:20:50 PM{' '}
									</span>
								</div>
							</div>
							<div>
								<p className='text-base'>Email</p>
								<p className='text-base font-normal'>kushruchi2004@gmail.com</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Space;
