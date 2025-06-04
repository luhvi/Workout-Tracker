"use client";

import { useDropdown } from "./DropdownContext";

import { Navbar } from "./ui/Navbar";
import { DropdownNav } from "./ui/DropdownNav";
import { HomePage } from "./components/HomePage";

export default function Home() {
  const { showDropdown } = useDropdown();

  return (
    <div>
      <Navbar />
      <DropdownNav />
      {!showDropdown ? <HomePage /> : null}
    </div>
  );
}
