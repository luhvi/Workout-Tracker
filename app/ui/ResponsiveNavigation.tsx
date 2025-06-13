"use client";

import { useScreenSize } from "../ScreenSizeContext";
import { Navbar } from "./Navbar";
import { DropdownNav } from "./DropdownNav";
import { useEffect, useState } from "react";

export const ResponsiveNavigation = () => {
  const { isSmallScreen } = useScreenSize();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const closeDropdown = () => setShowDropdown(false);
  const setOpenDropdown = () => {
    setShowDropdown(true);
    console.error("OPENS", showDropdown)
  }

  return (
    <>
      {/* Navbar is always visible as it contains both desktop navigation and mobile menu button */}
      <Navbar showDropdown={showDropdown} setDropdown={setShowDropdown} />

      {/* Only show dropdown when on small screen and toggle is activated */}
      {showDropdown && (
        <DropdownNav
          showDropdown={showDropdown}
          closeDropdown={closeDropdown}
        />
      )}
    </>
  );
};
