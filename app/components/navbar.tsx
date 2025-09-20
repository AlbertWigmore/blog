"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {useState, useEffect} from "react";

export type NavBarItem = {
  name: string;
  href: string;
} 
export type NavBarProps = {
  title: string;
  items: NavBarItem[];
};

export function NavBar(props: NavBarProps): JSX.Element {
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
  const currentPath = window.location.pathname;
  const activeItem = props.items.find((item) => item.href === currentPath);
  if (activeItem) {
    setActiveLink(activeItem.name);
  }
}, []);

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
