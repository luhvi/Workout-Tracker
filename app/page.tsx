"use client";

import { useDropdown } from "./DropdownContext";

import { Navbar } from "./ui/Navbar";
import { DropdownNav } from "./ui/DropdownNav";

export default function Home() {
  const { showDropdown, setShowDropdown } = useDropdown();

  return (
    <div>
      <Navbar />
      <DropdownNav />
      {!showDropdown ? <LandingPageMain /> : null}
    </div>
  );
}

export const LandingPageMain = () => {
  return (
    <div className="mt-60 flex h-full w-[100vw] flex-col text-center">
      <h1 className="mb-2 px-24 font-[family-name:var(--font-geist-mono)] text-3xl font-bold md:text-4xl">
        Workout Tracker
      </h1>
      <p className="md:text-md px-24 font-[family-name:var(--font-geist-mono)] text-sm">
        Welcome to my Workout Tracker. This app is designed for those who wish
        to take their fitness journey to the next level. It helps track your
        lifts alongside your bodyweight to make sure you're always progressing!
      </p>
    </div>
  );
};
