import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { ShowDropdownProps } from "../types/ShowDropdownProps";

export const Navbar = ({
  showDropdown,
  setShowDropdown,
}: ShowDropdownProps) => {
  return (
    <div className="flex w-[100vw] items-center justify-end border-b-2 border-neutral-800 py-6">
      <button
        className="mr-8 flex cursor-pointer items-center justify-center text-center"
        type="button"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {!showDropdown ? (
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl text-white transition-colors duration-150 hover:text-neutral-600"
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            className="text-2xl text-white transition-colors duration-150 hover:text-neutral-600"
          />
        )}
      </button>
    </div>
  );
};
