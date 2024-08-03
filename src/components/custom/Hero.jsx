import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-57 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className='hover-word'>Discover</span> <span className='hover-word'>Your</span> <span className='hover-word'>Next</span> <span className='hover-word'>Adventure</span> <span className='hover-word'>with</span> <span className='hover-word'>AI:</span><br />
        <span className='hover-word'>Personalized</span> <span className='hover-word'>Itineraries</span> <span className='hover-word'>at</span> <span className='hover-word'>Your</span> <span className='hover-word'>Fingertips</span>
      </h1>
      <p className='text-xl text-gray-500 text-center'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button>Get Started, It's Free.</Button>
      </Link>
      <img src='/TripMate-Logo-BGRemoved.png' className='hero-logo'/>
    </div>
  )
}

export default Hero