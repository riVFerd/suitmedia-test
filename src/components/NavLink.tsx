import Link from 'next/link';
import React from "react";

interface NavLinkProps {
  href: string;
  label: string;
  pathName: string;
}

export default function NavLink({href, label, pathName}: NavLinkProps) {
  const isActive = pathName === href;

  return (
    <li>
      <Link href={href} className={`py-2 ${isActive ? 'text-white border-b-4 border-white' : 'text-gray-300'}`}>
        {label}
      </Link>
    </li>
  );
};
