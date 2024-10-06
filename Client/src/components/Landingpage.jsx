import React from 'react';
import Navbar from './Navbar';

const Landingpage = () => {
    return (
        <div className="flex-grow flex justify-center items-center p-4 mt-20"> {/* Adjusted spacing for navbar */}
            <div className="w-full max-w-4xl h-[calc(100vh-4rem)]">
                <h1 className="text-white md:text-6xl text-5xl font-bold text-center">
                    Get Testimonials from your <br /> customers with ease
                </h1>
                <p className="text-gray-400 text-center py-3 md:text-xl text-2xl font-semibold">
                    Collecting testimonials is hard, we get it. So we built Testimonial,
                    in minutes, you can collect text and video testimonials from
                    your customers with no need for a developer or website hosting
                </p>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center gap-8">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded">
                            Try FREE now
                        </button>
                        <button className="border border-blue-500 text-white py-3 px-6 rounded focus:outline-none focus:shadow-outline">
                            Talk to us
                        </button>
                    </div>
                    <p className="text-center mt-4 text-gray-400">
                        Get started with free credits on us.{' '}
                        <a href="#" className="underline text-blue-500">
                            See our pricing
                        </a>{' '}
                        →
                    </p>
                    <div className="my-4 w-full h-[1px] border-t-2 border-gray-400" />
                    <h1 className="text-white md:text-6xl text-5xl font-bold text-center">
                        Add testimonials to your website with no coding!
                    </h1>
                    <p className="text-gray-400 text-center py-3 md:text-xl text-2xl font-semibold">
                        Copy and paste our HTML code to add the Wall Of Love (👉 full version) to your website. We support any no-code platform (Webflow, WordPress, you name it!)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Landingpage;
