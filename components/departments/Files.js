import Image from 'next/image'
import React from 'react'
import pdf from '../../img/pdf.png'
export default function Files({files}) {
    return (
        <div>
            <p className="text-center font-semibold text-lg">Files</p>
            <div className="flex flex-wrap">
                {
                    files?.map((e,index) => {
                        return <Card key={index} data={e} />
                    })
                }
            </div>
        </div>
    )
}


const Card = ({data})=> {
    const {id,mimeType,name} = data
    return(
        <div className="w-[180px] h-[230px] border m-2 rounded-md p-2 cursor-pointer">
            <div className="w-full">
            <Image src={pdf} alt=""  />
            </div>
            <p className="font-semibold truncate">{name}</p>
        </div>
    )
}