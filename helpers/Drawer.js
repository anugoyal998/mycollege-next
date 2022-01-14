import React, { useRef } from "react";

export default function Drawer({ open, setOpen, component }) {
  const drawerRef = useRef(null);
  const handleClick = (e) => {
    if (drawerRef.current === e.target) {
      setOpen(false);
    }
  };
  if (open)
    return (
      <div
        className="bg-drawer h-screen w-screen fixed top-0 left-0 text-black z-20 overflow-y-scroll"
        ref={drawerRef}
        onClick={handleClick}
      >
        {component}
      </div>
    );
  else return null;
}
