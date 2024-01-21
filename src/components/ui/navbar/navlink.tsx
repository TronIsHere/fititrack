import Link from "next/link";

interface NavLinkProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

// Reusable component for navigation links
const NavLink = ({ href, icon, label }: NavLinkProps) => (
  <Link
    href={href}
    className="flex my-2 items-center text-palletGray-200 py-3 px-5 rounded-lg cursor-pointer hover:text-white hover:bg-palletPurple-400 duration-500"
  >
    {icon}
    <span className="pl-2.5">{label}</span>
  </Link>
);

export default NavLink;
