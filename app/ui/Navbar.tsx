import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

import { useDropdown } from "../DropdownContext";

export const Navbar = () => {
  const { showDropdown, setShowDropdown } = useDropdown();

  return (
    <div className="flex h-21.5 w-[100vw] flex-row items-center border-b-2 border-neutral-800">
      <div className="hidden items-center md:flex">
        <button
          onClick={() => setShowDropdown(false)}
          className="mr-6 ml-6 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white"
        >
          <Link href="/">
            <FontAwesomeIcon icon={faDumbbell} />
          </Link>
        </button>
        <button className="mr-6 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="/weight-tracker">Weight Tracker</Link>
        </button>
        <button className="mr-6 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="/workout-tracker">Workout Tracker</Link>
        </button>
        <button className="cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="https://github.com/luhvi/Workout-Tracker">GitHub</Link>
        </button>
      </div>
      <div className="flex items-center md:hidden">
        <button className="ml-6 flex cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="/">
            <FontAwesomeIcon icon={faDumbbell} />
          </Link>
        </button>
        <button
          className="absolute right-0 mr-8 ml-8 flex w-[21px] cursor-pointer items-center justify-center"
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
    </div>
  );
};
