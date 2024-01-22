import Link from "next/link";
import { FC } from "react";

interface DesktopSidebarProps {
  darkModeState: boolean;
  renderLinks: () => JSX.Element[];
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({
  darkModeState,
  renderLinks,
}) => {
  return (
    <div className="hidden md:flex flex-col">
      <Link href="/dashboard" className="self-center">
        <img
          src={darkModeState ? "/images/logoDark.svg" : "/images/logo.svg"}
          alt=""
          width={180}
          className="mt-8"
        />
      </Link>
      <ul className="mt-14 m-8">
        <span className="uppercase text-muted-foreground text-xs">
          Overview
        </span>
        {renderLinks()}
      </ul>
    </div>
  );
};
export default DesktopSidebar;
