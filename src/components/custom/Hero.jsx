import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import './Hero.css'; // Make sure this file exists with the styles we created earlier

function Hero() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center mx-57 gap-9">
        <h1 className="font-extrabold text-[50px] text-center mt-16">
          <span className='hover-word'>Discover</span> <span className='hover-word'>Your</span> <span className='hover-word'>Next</span> <span className='hover-word'>Adventure</span> <span className='hover-word'>with</span> <span className='hover-word'>AI:</span><br />
          <span className='hover-word'>Personalized</span> <span className='hover-word'>Itineraries</span> <span className='hover-word'>at</span> <span className='hover-word'>Your</span> <span className='hover-word'>Fingertips</span>
        </h1>
        <p className='text-xl text-gray-500 text-center'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <button className="animated-button">
            <span>Get Started, It's Free</span>
          </button>
        </Link>
        <img src='/TripMate-Logo-BGRemoved.png' className='hero-logo'/>
      </div>
      <Footer />
    </div>
  )
}

function Footer() {
  const people = [
    { id: 1, name: 'Nandinee Patel', github: 'https://github.com/Geeky-Nandinee' },
    { id: 2, name: 'Smit Modi', github: 'https://github.com/MojoSmit07' }
  ]

  const handleClick = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className='my-6'>
      <h2 className='text-gray-400 text-center'>
        Created by{' '}
        {people.map((person, index) => (
          <React.Fragment key={person.id}>
            <span 
              className='cursor-pointer text-blue-500 hover:underline'
              onClick={() => handleClick(person.github)}
            >
              {person.name}
            </span>
            {index === 0 && ' and '}
          </React.Fragment>
        ))}
        {' '} - TripMate
      </h2>
    </div>
  )
}

export default Hero;