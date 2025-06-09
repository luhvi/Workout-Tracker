"use client";

import { Navbar } from "./ui/Navbar";
import { DropdownNav } from "./ui/DropdownNav";
import { HomePage } from "./components/HomePage";

export default function Home() {
  return (
    <div>
      <Navbar />
      <DropdownNav />
      <HomePage />
    </div>
  );
}
