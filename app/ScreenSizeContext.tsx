"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ScreenSizeContextType = {
  isSmallScreen: boolean;
};

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(
  undefined
);

export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Function to check if screen is small (typically under 425px for mobile)
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 425);
    };

    // Set the initial value
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isSmallScreen }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};
