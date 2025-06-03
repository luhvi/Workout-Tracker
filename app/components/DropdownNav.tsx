import { ShowDropdownProps } from "../types/ShowDropdownProps";

export const DropdownNav = ({ showDropdown }: ShowDropdownProps) => {
  return (
    <>
      {showDropdown ? (
        <div className="flex h-[100vh] w-[100vw] flex-col gap-2 pt-6 pl-6">
          <div>
            <button className="mb-4 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
              Weight Tracker
            </button>
          </div>
          <div>
            <button className="mb-4 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
              Workout Tracker
            </button>
          </div>
          <div>
            <button className="cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white">
              GitHub
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
