import React from 'react'

const Drawer = ({open,setOpen,children}) => {
    if(!open)return null
  return (
    <div>
        {children}
    </div>
  )
}

export default Drawer