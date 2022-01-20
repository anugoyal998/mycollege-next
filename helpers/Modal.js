import React from 'react';
import {MdCancel} from 'react-icons/md'

export default function Modal({open,setOpen,component}) {
    if(open)
  return (
      <div className="bg-drawer h-screen w-screen fixed top-0 left-0 text-black z-20 overflow-y-scroll flex justify-center items-center">
          <div className="w-[400px] h-[250px] bg-white p-2 rounded-md shadow-lg">
              <div className="flex justify-end">
                  <MdCancel className="text-2xl text-gray-700 cursor-pointer" onClick={()=> setOpen(!open)} />
              </div>
              {component}
          </div>
      </div>
  )
  else return null
}
