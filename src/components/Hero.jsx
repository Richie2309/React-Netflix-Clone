import axios from 'axios'
import React, { useEffect, useState } from 'react'
import endpoints, { createImageUrl } from '../services/movieServices'

function Hero() {
    const [movie, setMovie] = useState({})

    useEffect(() => {
        axios.get(endpoints.popular).then((response) => {
            const movies = response.data.results;
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            setMovie(randomMovie)
        });
    }, [])
    if (!movie)
        return (
            <>
                <p>fetching movie...</p>
            </>
        )

    const { title, backdrop_path, release_date, overview } = movie

    return (
        <div className='w-full h-[550px] lg:h-[850px]'>
            <div className='w-full h-full'>
                <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
                <img
                    className='w-full h-full object-cover object-top'
                    src={createImageUrl(backdrop_path, 'original')}
                    alt={title} />
            </div>
            <div className='absolute w-full top-[20%] lg:top[30%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-6xl font-nsans-bold'>{title}</h1>
                <div className='mt-44 mb-4'>
                    <button className='bg-gray-800 bg-opacity-50 py-2 px-5 ml-4 rounded-lg'>▶️ Play</button>
                    <button className='bg-gray-800 bg-opacity-50 py-2 px-5 ml-4 rounded-lg'>+ My List</button>
                </div>
            </div>

        </div>
    )
}

export default Hero
