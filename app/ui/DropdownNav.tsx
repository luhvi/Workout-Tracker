import Link from "next/link";

type DropdownNavProps = {
  showDropdown: boolean;
  closeDropdown: () => void;
};

export const DropdownNav = ({
  showDropdown,
  closeDropdown,
}: DropdownNavProps) => {
  return (
    <>
      {showDropdown ? (
        <div className="fixed top-21.5 z-50 flex h-screen w-screen flex-col gap-2 bg-[#0a0a0a] pt-6 pl-6 md:hidden">
          <div>
            <button
              className="mb-4 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white"
              onClick={() => closeDropdown}
            >
              <Link href="/weight-tracker">Weight Tracker</Link>
            </button>
          </div>
          <div>
            <button
              className="mb-4 cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white"
              onClick={() => closeDropdown}
            >
              <Link href="/workout-tracker">Workout Tracker</Link>
            </button>
          </div>
          <div>
            <button
              className="cursor-pointer font-[family-name:var(--font-geist-mono)] text-lg text-neutral-600 transition-colors duration-300 hover:text-white"
              onClick={() => closeDropdown}
            >
              <Link href="https://github.com/luhvi/Workout-Tracker">
                GitHub
              </Link>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
