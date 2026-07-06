import React from 'react'
import Hero from './Hero'
import HomeAbout from './HomeAbout'
import HomeProducts from './HomeProducts'
// import OfferBanner from './OfferBanner'
import HomeFeatures from './HomeFeatures'
import HomeServices from './HomeServices'
import HomeReviews from './HomeReviews'
import HomeGallery from './HomeGallery'
import CompanyLogos from './CompanyLogos'

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAbout />
      {/* <OfferBanner /> */}
      <HomeProducts />
      <HomeFeatures />
      <HomeServices />
      <HomeGallery />
      <HomeReviews />
      <CompanyLogos />
    </div>
  )
}

export default Home
