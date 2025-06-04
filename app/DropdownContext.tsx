"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type DropdownContextType = {
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <DropdownContext.Provider value={{ showDropdown, setShowDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};
