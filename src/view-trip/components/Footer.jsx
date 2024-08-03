import React from 'react'

const Footer = () => {
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
        {' '} - AI Travel Planner App
      </h2>
    </div>
  )
}

export default Footer