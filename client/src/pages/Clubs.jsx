import React from 'react'
import ClubHeader from '../components/clubs/ClubHeader'
import Card1 from '../components/shared/Card1'
import Navbar from '../components/shared/Navbar'

const Clubs = () => {
  return (
    <div>
        <Navbar rightFlag={false} />
        <div className="px-10">
        <ClubHeader/>
        <Card1/>
        </div>
    </div>
  )
}

export default Clubs
