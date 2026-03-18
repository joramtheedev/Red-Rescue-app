"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// @ts-ignore
import { SignInButton, UserButton, Show } from "@clerk/nextjs";
import {ReactNode} from "react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
];

function SignedIn(props: { children: ReactNode }) {
  return null;
}

export function Navbar() {
  const pathname = usePathname();

  return (
      <header className="sticky top-0 z-50 border-b border-surface-3 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* Logo */}
          <Link
              href="/dashboard"
              className="font-display text-lg font-bold text-white tracking-tight"
          >
            RED<span className="text-brand-400">RESCUE</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={[
                      "px-3 py-1.5 rounded-md text-sm font-body font-medium transition-colors",
                      pathname === href
                          ? "bg-surface-2 text-white"
                          : "text-gray-400 hover:text-white hover:bg-surface-2",
                    ].join(" ")}
                >
                  {label}
                </Link>
            ))}
          </nav>

          {/* Authentication */}
          <div className="flex items-center gap-4">

            {/* If user is NOT signed in */}
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-body text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-surface-2">
                  Sign In
                </button>
              </SignInButton>
            </Show>

            {/* If user IS signed in */}
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </header>
  );
}
