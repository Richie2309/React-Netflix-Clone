import React from 'react'
import Hero from '../components/Hero'
import MovieRows from '../components/MovieRows'
import endpoints from '../services/movieServices'

function Home() {
  
  return (
    <>
      <Hero />
      <MovieRows title='upcoming' url={endpoints.upcoming} />
      <MovieRows title='trending' url={endpoints.trending} />
      <MovieRows title='topRated' url={endpoints.topRated} />
      <MovieRows title='comedy' url={endpoints.comedy} />
      <MovieRows title='popular' url={endpoints.popular} />
    </>
  )
}

export default Home
