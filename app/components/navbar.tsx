"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {useState, useCallback} from "react";
import { usePathname } from "next/navigation";

export type NavBarItem = {
  name: string;
  href: string;
} 
export type NavBarProps = {
  title: string;
  items: NavBarItem[];
};

export function NavBar(props: NavBarProps): JSX.Element {
  const pathname = usePathname();

  const getActiveLinkFromPath = useCallback((path: string) => {
    return props.items.find(item => item.href === path)?.name || "home";
  }, [props.items]);
  
  const [activeLink, setActiveLink] = useState(() => getActiveLinkFromPath(pathname));
  
  if (getActiveLinkFromPath(pathname) !== activeLink) {
    setActiveLink(getActiveLinkFromPath(pathname));
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <p className="font-bold text-inherit">{props.title}</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {props.items.map((item) => (
          <NavbarItem key={item.name} isActive={activeLink === item.name}>
            <Link
              color={activeLink === item.name ? "primary" : "foreground"}
              href={item.href}
              onClick={() => setActiveLink(item.name)}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
    </Navbar>
  );
}
