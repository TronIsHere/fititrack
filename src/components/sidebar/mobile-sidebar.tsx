import Link from "next/link";
import { FC } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

interface MobileSidebarProps {
  darkMode: boolean;
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  renderLinks: () => JSX.Element[];
}

const MobileSidebar: FC<MobileSidebarProps> = ({
  darkMode,
  mobileMenu,
  setMobileMenu,
  renderLinks,
}) => {
  return (
    <div className="flex md:hidden flex-col">
      <div className="flex justify-around items-center pb-4">
        <Link href="/dashboard">
          <img
            src={darkMode ? "/images/logoDark.svg" : "/images/logo.svg"}
            alt=""
            width={180}
            className="mt-8"
          />
        </Link>
        <HiMenuAlt3
          size={32}
          className="mt-8"
          color={darkMode ? "#fff" : ""}
          onClick={() => setMobileMenu(!mobileMenu)}
        />
      </div>
      {mobileMenu && (
        <ul className="mt-5 my-8 mx-4">
          <span className="uppercase text-muted-foreground text-xs">
            Overview
          </span>
          {renderLinks()}
        </ul>
      )}
    </div>
  );
};

export default MobileSidebar;
