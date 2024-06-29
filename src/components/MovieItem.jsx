import React, { useState } from 'react'
import { createImageUrl } from '../services/movieServices'
import { FaPlus } from 'react-icons/fa'
import { IoCheckmarkSharp } from "react-icons/io5";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { db } from '../services/firebase';

const MovieItem = ({ movie }) => {
    const [list, setList] = useState(false)
    const {user}=UserAuth()


    const { title, backdrop_path, poster_path } = movie

    const markFavShow = async () => {
        const userEmail = user?.email;

        if (userEmail) {
            const userDoc = doc(db, 'users', userEmail)
            setList(!list)
            await updateDoc(userDoc, {
                favShows: arrayUnion({ ...movie })
            })
        }
        else{
            alert("Signin to save a movie")
        }
    }

    return (
        <div className='relative w-[105px] sm:w-[120px] md:w-[135px] lg:w-[155px] xl:w-[175px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
            <img src={createImageUrl(poster_path, "w500")} alt={title} />

            <div className='absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100'>
                <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>
                    {movie.title}
                </p>

                <p onClick={markFavShow} className='cursor-pointer'>
                    {list ?
                    < IoCheckmarkSharp
                        size={20} className='absolute top-2 right-2 text-gray-300' /> :
                    <FaPlus
                        size={20} className='absolute top-2 right-2 text-gray-300' />
                }
                </p>
            </div>
        </div>
    )
}

export default MovieItem
