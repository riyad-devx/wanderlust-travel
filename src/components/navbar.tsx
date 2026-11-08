"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-destination", label: "Add Destination" },
];

const guestLinks = [
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handaleSignOut = () => {
    authClient.signOut();
  };

  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="relative mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 lg:px-8">
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  active ? "text-brand" : "text-neutral-900",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <span aria-hidden className="w-9 lg:hidden" />

        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image || ""}
                    />
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                }
              />
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                    <Button onClick={handaleSignOut} variant={"destructive"}>
                      Sign out
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            guestLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex size-9 items-center justify-center text-neutral-900 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-neutral-200 bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-5 py-3">
            {links.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-11 items-center text-sm font-medium",
                    active ? "text-brand" : "text-neutral-900",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-2 flex items-center gap-6 border-t border-neutral-200 py-4">
              {user ? (
                <>
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image || ""}
                    />
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-neutral-900">
                      {user?.name}
                    </span>
                    <span className="truncate text-xs text-neutral-500">
                      {user?.email}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      handaleSignOut();
                      setOpen(false);
                    }}
                    variant={"destructive"}
                    className="ml-auto"
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                guestLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-1.5 text-sm font-medium text-neutral-900"
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
