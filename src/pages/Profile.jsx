import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";
import { UserAuth } from '../context/AuthContext';
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { createImageUrl } from '../services/movieServices';

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.data()) {
          setMovies(doc.data().favShows);
        }
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlistShow = async (movie) => {
    const userDoc = doc(db, 'users', user.email);
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie)
    });
  };

  if (!user) {
    return <>fetching shows...</>;
  }

  return (
    <>
      <div>
        <img
          className='block w-full h-[500px] object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/e10ba8a6-b96a-4308-bee4-76fab1ebd6ca/IN-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_db9348f2-4d68-4934-b495-6d9d1be5917e_small.jpg" 
          alt="//" 
        />
      </div>
      <div className='bg-black/60 fixed top-0 left-0 w-full h-[500px]' />
      <div className='absolute top-[20%] p-4 md:p-8'>
        <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'>My List</h1>
        <p className='font-nsans-light text-gray-400 text-lg'>
          {user.email}
        </p>
      </div>

      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>Favorite shows</h2>
      <div className='relative flex items-center group'>

        <FaChevronLeft
          onClick={() => slide(-500)}
          className='absolute left-2 opacity-80 text-white z-10 hidden group-hover:block cursor-pointer' 
          size={40} 
        />

        <div id={`slider`} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>

          {movies.map((movie) => (
            <div
              key={movie.id}
              className='relative w-[105px] sm:w-[120px] md:w-[135px] lg:w-[155px] xl:w-[175px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
              <img src={createImageUrl(movie.poster_path, "w500")} alt={movie.title} />

              <div className='absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100'>
                <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>
                  {movie.title}
                </p>

                <p>
                  <IoCheckmarkSharp 
                    size={30} 
                    onClick={() => handleUnlistShow(movie)}
                    className='absolute top-2 right-2' 
                  />
                </p>

              </div>
            </div>
          ))}

        </div>
        <FaChevronRight
          onClick={() => slide(500)}
          className='absolute right-2 opacity-80 text-white z-10 hidden group-hover:block cursor-pointer' 
          size={40} 
        />
      </div>
    </>
  );
};

export default Profile;
