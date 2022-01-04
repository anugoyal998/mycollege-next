import React from 'react'
import Navbar from '../navbars/Navbar'
import Content from './Content'
import Departments from './Departments'
import Features from './Features'


export default function Home() {
    return (
        <div className="bg-white text-black">
        <div className="bg-hero h-screen">
            <Navbar/>
            <Content/>
        </div>
        <Features/>
        <Departments/>
        </div>
    )
}
