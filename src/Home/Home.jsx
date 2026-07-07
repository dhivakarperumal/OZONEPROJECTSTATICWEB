import React from 'react'
import Hero from './Hero'
import HomeAbout from './HomeAbout'
import HomeProducts from './HomeProducts'
// import OfferBanner from './OfferBanner'
import HomeFeatures from './HomeFeatures'
import HomeStats from './HomeStats'
import HomeServices from './HomeServices'
import HomeReviews from './HomeReviews'
import HomeGallery from './HomeGallery'
import HomeFAQ from './HomeFAQ'
import CompanyLogos from './CompanyLogos'
import InstagramReels from './InstagramReels'

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAbout />
      {/* <OfferBanner /> */}
      <HomeProducts />
      <HomeFeatures />
      <HomeStats />
      <HomeServices />
      <HomeGallery />
      <InstagramReels />
      <HomeFAQ />
      <HomeReviews />
      {/* <CompanyLogos /> */}
    </div>
  )
}

export default Home
