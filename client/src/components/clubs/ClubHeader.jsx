import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import DropDown from '../../utils/DropDown'

const data = [
    {title: 'Cultural Club', onClick: () => {}},
    {title: 'Technical Club', onClick: () => {}},
]

const ClubHeader = () => {
    const [open, setOpen] = useState(false)
  return (
    <Container>
        <ClubTxt>Clubs</ClubTxt>
        <div>
            <p>Club Type</p>
            <DropDown open={open} setOpen={setOpen} data={data} title="Select Club Type" />
        </div>
    </Container>
  )
}

const Container = tw.div`
    flex justify-between items-end
`
const ClubTxt = tw.div`
    text-5xl font-semibold
`

export default ClubHeader