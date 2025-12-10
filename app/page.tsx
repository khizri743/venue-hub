import React from 'react'
import PageWrapper from './components/PageWrapper'
import Hero from './components/Hero'
import EventCategory from './components/EventCategory'
import FeatureVenues from './components/FeatureVenues'
import Carousel from './components/Carousel'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import { mainStats, performanceStats } from './data/statsData'

// 1. Change the Type: searchParams is now a Promise
type SearchParamsProps = {
  searchParams: Promise<{ q?: string }>;
}

const Home = async ({ searchParams }: SearchParamsProps) => {
  
  // 2. Await the params before using them
  const params = await searchParams;
  const query = params?.q || "";

  return (
    <PageWrapper>
        <Hero />
        
        {/* Only show categories if NOT searching */}
        {!query && <EventCategory />}
        
        {/* Pass the query to the component */}
        <FeatureVenues query={query} />
        
        <Carousel items={mainStats}/>
        <HowItWorks />
        <Testimonials />
        <Carousel items={performanceStats}/>
    </PageWrapper>
  )
}

export default Home