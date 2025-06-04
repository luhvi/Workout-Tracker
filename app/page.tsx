"use client";

import { useDropdown } from "./DropdownContext";

import { Navbar } from "./ui/Navbar";
import { DropdownNav } from "./ui/DropdownNav";
import { LandingPageMain } from "./components/LandingPage";

export default function Home() {
  const { showDropdown } = useDropdown();

  return (
    <div>
      <Navbar />
      <DropdownNav />
      {!showDropdown ? <LandingPageMain /> : null}
    </div>
  );
}
