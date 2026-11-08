import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
]

const supportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/terms", label: "Terms Of Service" },
  { href: "/privacy", label: "Privacy Policy" },
]

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-medium tracking-[0.08em] text-white/70 uppercase">
      {children}
    </h2>
  )
}

export function Footer() {
  return (
    <footer id="footer" className="bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-16 lg:px-14 lg:pt-20 lg:pb-20">
        <Link href="/" aria-label="Wanderlast home" className="inline-block">
          <Image
            src="/image/Wanderlast-1.png"
            alt="Wanderlast"
            width={542}
            height={80}
            className="h-10 w-auto sm:h-12 lg:h-14"
          />
        </Link>
        <p className="mt-10 text-[13px] text-white/55">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-11 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <ColumnTitle>Newsletter</ColumnTitle>
            <p className="mt-2 text-xs text-white/45">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex h-[34px] w-full max-w-[230px] items-center rounded-[2px] bg-[#2e2e2e]">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-white placeholder:text-white/60 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex h-full w-9 shrink-0 items-center justify-center text-white/80 transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </button>
            </form>
          </div>

          <div>
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Support</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Contact Us</ColumnTitle>
            <ul className="mt-5 space-y-3 text-[13px]">
              <li>
                <a
                  href="tel:7869011622"
                  className="text-white/80 transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="break-words text-white/80 transition-colors hover:text-white"
                >
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © 2026 Wanderlust. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-white/80">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition-colors hover:text-brand"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-brand"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.25 8.98h3.38V21H3.25V8.98Zm5.62 0h3.24v1.64h.05c.45-.85 1.55-1.74 3.19-1.74 3.41 0 4.04 2.24 4.04 5.16V21h-3.38v-5.28c0-1.26-.02-2.88-1.76-2.88-1.76 0-2.03 1.37-2.03 2.79V21H8.87V8.98Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-brand"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-[18px]"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
