import React from 'react'
import Hero from './Hero'
import HomeAbout from './HomeAbout'
import HomeProducts from './HomeProducts'
// import OfferBanner from './OfferBanner'
import HomeReviews from './HomeReviews'
import HomeGallery from './HomeGallery'

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAbout />
      {/* <OfferBanner /> */}
      <HomeProducts />
      <HomeReviews />
      <HomeGallery />
    </div>
  )
}

export default Home
