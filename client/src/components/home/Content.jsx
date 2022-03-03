import React from 'react'
import tw from 'tailwind-styled-components'

const Content = () => {
  return (
    <Wrapper>
        <p className="text-6xl">Welcome to</p>
        <p className="text-4xl">NITKKR Student Support</p>
    </Wrapper>
  )
}

const Wrapper = tw.div`
    flex items-center flex-col mt-[30vh]
`

export default Content
