'use client';
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import NavLink from "@/components/NavLink";

export default function Header() {
  const pathName = usePathname();

  return (
    <header className="w-full fixed flex bg-primary justify-between items-center px-16 py-4 z-50">
      <Link href="/">
        <Image src="/suitmedia-white.png" alt="suitmedia logo" width="125" height="50"/>
      </Link>
      <nav className="hidden lg:block">
        <ul className="flex flex-row gap-8 mx-8">
          <NavLink href="/work" label="Work" pathName={pathName} />
          <NavLink href="/about" label="About" pathName={pathName} />
          <NavLink href="/services" label="Services" pathName={pathName} />
          <NavLink href="/" label="Ideas" pathName={pathName} />
          <NavLink href="/careers" label="Careers" pathName={pathName} />
          <NavLink href="/contact" label="Contact" pathName={pathName} />
        </ul>
      </nav>
    </header>
  )
}