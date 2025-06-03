import { Dispatch, SetStateAction } from "react";

export type ShowDropdownProps = {
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
};
