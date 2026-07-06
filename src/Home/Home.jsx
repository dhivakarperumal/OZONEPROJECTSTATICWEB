import React from 'react'
import Hero from './Hero.jsx'
import HomeAbout from './HomeAbout.jsx'
import HomeProducts from './HomeProducts.jsx'
import OfferBanner from './OfferBanner.jsx'
import HomeReviews from './HomeReviews.jsx'

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAbout />
      <OfferBanner />
      <HomeProducts />
      <HomeReviews />
    </div>
  )
}

export default Home
