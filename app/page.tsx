"use client";

import { Navbar } from "./ui/Navbar";
import { DropdownNav } from "./ui/DropdownNav";
import { HomePage } from "./components/HomePage";

export default function Home() {
  // do an api call here
  // const datas = await getInitialDatas();
  // const { navbarData, dropdownData, homePageData } = datas;
  return (
    <div>
     
      <HomePage />
    </div>
  );
}
