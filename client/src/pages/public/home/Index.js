import React from 'react'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Hero from './Hero'
import Slider from './Slider'
import Service from './Service'
import Project from './Project'
import Review from './Review'
import Portfolio from './Portfolio'

const Home = () => {    
    return (
        <>
            <Header />
            <Hero />
            <Slider />
            <Service />
            <Project />
            <Review />
            <Portfolio />
            <Footer />
        </>
    )
}

export default Home
