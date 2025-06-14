"use client";

import { Navbar } from "./Navbar";
import { DropdownNav } from "./DropdownNav";
import { useState } from "react";

export const ResponsiveNavigation = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const closeDropdown = () => setShowDropdown(false);

  return (
    <>
      <Navbar showDropdown={showDropdown} setDropdown={setShowDropdown} />

      {showDropdown ? (
        <DropdownNav
          showDropdown={showDropdown}
          closeDropdown={closeDropdown}
        />
      ) : null}
    </>
  );
};
