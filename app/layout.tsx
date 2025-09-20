import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { NavBar } from "@/app/components/navbar";
import { Geist } from 'next/font/google'
import { Providers } from "./providers";
import { NavBarProps, NavBarItem  } from "@/app/components/navbar"; 

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Albert Wigmore's Blog",
  description: "A personal blog where I write on various topics from hobbies to work.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const navBarItems: NavBarItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const navBarProps: NavBarProps = {
  title: "Albert Wigmore",
  items: navBarItems,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <head />
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased")}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <NavBar {...navBarProps} />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <p className="text-sm text-muted-foreground">
                Copyright &copy; 2025{" "}
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}