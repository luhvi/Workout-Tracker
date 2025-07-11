import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

type NavbarProps = {
  showDropdown: boolean;
  setDropdown: (arg: boolean) => void;
};

export const Navbar = ({ setDropdown, showDropdown }: NavbarProps) => {
  return (
    <div className="bg-[rgb(10,10,10,0.7) fixed top-0 z-50 flex h-21.5 w-full flex-row items-center border-b-2 border-neutral-800 backdrop-blur-md">
      <div className="hidden items-center md:flex">
        <button className="mr-6 ml-6 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="/">
            <FontAwesomeIcon icon={faDumbbell} />
          </Link>
        </button>
        <button className="mr-6 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="/workout-tracker">Workout Tracker</Link>
        </button>
        <button className="mr-6 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="/calorie-tracker">Calorie Tracker</Link>
        </button>
        <button className="mr-6 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
          <Link href="/weight-tracker">Weight Tracker</Link>
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
          type="reset"
          onClick={() => setDropdown(!showDropdown)}
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
