<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Next 16 App Router travel-booking UI. Destination and booking data come from a **separate backend at `http://localhost:8000`**; that server is not in this repo. Pages: `/`, `/destinations`, `/destinations/[id]`, `/add-destination`, `/my-bookings`, `/login`, `/signup`.

## Commands

- `npm run dev` — Next 16 dev server (Turbopack) on `:3000`.
- `npx tsc --noEmit` — typecheck only (there is no `typecheck` script).
- `npm run lint` — ESLint flat config. Single file: `npx eslint src/app/page.tsx`.
- `npm run build` — production build; also runs the TypeScript check.
- No test runner or test suite is configured.

## Known baseline failures

Don't treat these as regressions you caused: `npm run lint` reports 2 `react-hooks/set-state-in-effect` errors (`src/components/ui/carousel.tsx:98`, `src/hooks/use-mobile.ts:14`) and an unused-`X` warning in `src/app/add-destination/page.tsx:5`. `npx tsc --noEmit` and `npm run build` currently pass.

## Setup / runtime

- `.env` is gitignored and must define `MONGODB_URI`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`.
- Auth is Better Auth + MongoDB (`src/lib/auth.ts`); handler is `src/app/api/auth/[...all]/route.ts`. The database name is literally `wansderlust` (typo) — changing it disconnects existing users.
- Start the `localhost:8000` backend separately before testing CRUD. It serves `GET /destination`, `GET|PUT|DELETE /destination/:id`, `POST /add-destination`, `POST /booking`, `GET /my-booking?email=`, `DELETE /booking/:id`. These URLs are hardcoded across pages/components.
- `src/proxy.ts` is Next 16's replacement for `middleware.ts` (named export `proxy`). It guards only `/add-destination`, `/my-bookings`, and `/destinations/:path`, redirecting to `/login`; the `/destinations` list is public.
- Server components read auth via `auth.api.getSession({ headers: await headers() })` from `@/lib/auth`; client components use `authClient.useSession()` / `signIn.email` from `@/lib/auth-client`. Never import `next/headers` in a client component.
- Root layout always renders `Navbar` and `Footer`; `Navbar` is a client component using `authClient.useSession()`.

## Conventions / quirks

- Path alias `@/*` → `src/*`. UI components live in `src/components/{Home,Booking,Destination,ui}`.
- Tailwind v4 is CSS-first: no `tailwind.config`. Tokens are in `src/app/globals.css` (`:root` / `.dark`, `@theme inline`); use `bg-brand`/`text-brand` (`--color-brand`) rather than raw hex. Keep the `@tailwindcss/turbopack` loader in `next.config.ts`.
- Class merging uses the `cn` package, imported as `cn` from `"cn"` (not `clsx`/`tailwind-merge`). `src/lib/utils.ts` only re-exports it for the shadcn alias.
- `src/components/ui/*` are shadcn **base-nova** on `@base-ui/react`, not Radix. Use the Base UI `render={<Link ... />}` prop instead of `asChild`, and add/refresh via `npx shadcn add <component>`.
- `next.config.ts` has `reactCompiler: true`; `cacheComponents` and `partialPrefetching` are currently **false**. If enabling them, uncached async data must move under `<Suspense>` or `"use cache"` — read `node_modules/next/dist/docs/` first.
- `LayoutProps`/`PageProps` and route types are generated into `.next/types`; don't import them or edit `next-env.d.ts`.
- Shiki (`src/lib/highlighter.tsx`, client-side JS regex engine) backs `src/components/ui/code-block.tsx`; a new language needs both the dynamic import and alias entry there.
- Toasts come from `@/components/ui/toast` (`<Toaster />` + `toast.add(...)`), not a global provider.
