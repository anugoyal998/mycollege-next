import Image from 'next/image'
import React from 'react'
import feature1 from '../../img/feature1.png'
import feature2 from '../../img/feature2.png'
import feature3 from '../../img/feature3.png'

const arr = [
    {
        id: 0,
        img: feature1,
        title: 'Study Material',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste laborum eaque dicta fuga sapiente nulla officiis rem deleniti esse, necessitatibus quas, illo ut neque? Ut magni cupiditate commodi quibusdam non.'
    },
    {
        id: 1,
        img: feature2,
        title: 'Updates from NIT KKR',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste laborum eaque dicta fuga sapiente nulla officiis rem deleniti esse, necessitatibus quas, illo ut neque? Ut magni cupiditate commodi quibusdam non.'
    },
    {
        id: 2,
        img: feature3,
        title: `Senior's Guidance`,
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste laborum eaque dicta fuga sapiente nulla officiis rem deleniti esse, necessitatibus quas, illo ut neque? Ut magni cupiditate commodi quibusdam non.'
    }
]

export default function Features() {
    return (
        <div className="px-4 mt-8">
            <p className="text-darkBlue text-2xl font-semibold text-center">Features</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-1">
                {
                    arr.map((e)=> {
                        return <Card key={e?.id} data={e}  />
                    })
                }
            </div>
        </div>
    )
}

const Card = (props)=> {
    const {data} = props
    const {img,title,desc} = data
    return (
        <div className="p-3 border-2 shadow-md m-4 rounded-md flex flex-col items-center">
            <Image src={img} alt={title} className="animation transform hover:scale-110 cursor-pointer"/>
            <p className="font-semibold text-darkBlue text-2xl">{title}</p>
            <p className="text-sm text-center font-semibold">{desc}</p>
        </div>
    )
}