import React from 'react'

const Header = () => {
    return (
        <header className='container flex justify-between h-fit py-4 bg-stone-900 rounded-b-lg shadow-lg fixed'>
            <figure className='px-8'>Logo</figure>
            <div className='flex justify-evenly w-1/2'>
                <button>inicio</button>
                <button>meio</button>
                <button className='py-2 px-4 rounded-md bg-green-600 shadow-lg hover:scale-105 transition'>Login</button>

            </div>
        </header>
    )
}

export default Header
