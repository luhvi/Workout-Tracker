"use client";

import { useState } from "react";

import { Navbar } from "./components/Navbar";
import { DropdownNav } from "./components/DropdownNav";

export default function Home() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div>
      <div className="fixed top-0">
        <Navbar showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
      </div>
      <div className="fixed top-21.5">
        <DropdownNav
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      </div>
    </div>
  );
}
