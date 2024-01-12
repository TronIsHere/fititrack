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
    className="flex my-3 items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
  >
    {icon}
    <span className="pl-3">{label}</span>
  </Link>
);

export default NavLink;
