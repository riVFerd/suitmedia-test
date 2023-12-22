'use client';
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import NavLink from "@/components/NavLink";
import {useEffect, useState} from "react";

export default function Header() {
  const pathName = usePathname();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isHeaderSemiVisible, setIsHeaderSemiVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Check if scrolling down and not at the top
      const isAtTop = currentScrollPos == 0;

      // Check if scrolling up
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setIsHeaderVisible(isAtTop);
      setIsHeaderSemiVisible(isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    };

    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={
        `w-full fixed flex bg-primary justify-between items-center px-16 py-4 z-50 transition-all duration-300 
        ${isHeaderVisible ? 'opacity-100' : isHeaderSemiVisible ? 'opacity-75' : 'opacity-0 -translate-y-full'}`
      }
    >
      <Link href="/">
        <Image src="/suitmedia-white.png" alt="suitmedia logo" width="125" height="50"/>
      </Link>
      <nav className="hidden lg:block">
        <ul className="flex flex-row gap-8 mx-8">
          <NavLink href="/work" label="Work" pathName={pathName}/>
          <NavLink href="/about" label="About" pathName={pathName}/>
          <NavLink href="/services" label="Services" pathName={pathName}/>
          <NavLink href="/" label="Ideas" pathName={pathName}/>
          <NavLink href="/careers" label="Careers" pathName={pathName}/>
          <NavLink href="/contact" label="Contact" pathName={pathName}/>
        </ul>
      </nav>
    </header>
  )
}