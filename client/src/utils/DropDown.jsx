import React from "react";
import { FaChevronDown } from "react-icons/fa";

const DropDown = (props) => {
  const { title, data, open, setOpen } = props;

  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="flex justify-center space-x-2 items-center w-full rounded-md shadow-sm px-4 py-2 bg-bgTertiary text-sm font-medium text-white focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
        >
          <span className="bg-bgTertiary">{title}</span>
          <FaChevronDown className="bg-bgTertiary" />
        </button>
      </div>
      {open && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div className="py-1 bg-bgTertiary rounded-md shadow-md" role="none">
            {data?.map((item, index) => {
              return (
                <a
                  href="#"
                  className="block px-4 py-2 text-sm bg-bgTertiary hover:bg-[#4a4646] "
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  key={index}
                  onClick={item?.onClick}
                >
                  {item?.title}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
