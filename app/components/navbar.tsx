"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {useState} from "react";

// TODO: add state management for active link
export function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">AstroBertie</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeLink === "home"}>
          <Link color={activeLink === "home" ? "primary" : "foreground"} href="/" onClick={() => setActiveLink("home")}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeLink === "posts"}>
          <Link color={activeLink === "posts" ? "primary" : "foreground"} href="#" onClick={() => setActiveLink("posts")}>
            Posts
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeLink === "about"}>
          <Link color={activeLink === "about" ? "primary" : "foreground"}  href="/about" onClick={() => setActiveLink("about")}>
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
    </Navbar>
  );
}
