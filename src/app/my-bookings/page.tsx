import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { CalendarX2, Compass, LogIn } from "lucide-react";

import { auth } from "@/lib/auth";
import MybookingCard, { type Booking } from "@/components/Booking/MybookingCard";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";

async function getBookings(email: string): Promise<Booking[]> {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    throw new Error("Missing access token");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-booking?email=${encodeURIComponent(email)}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to load bookings (${res.status})`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function BookingListSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[4px] border border-neutral-200 bg-white p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
            <div className="aspect-[16/9] w-full shrink-0 animate-pulse rounded-[3px] bg-neutral-100 sm:aspect-auto sm:h-[145px] sm:w-[260px]" />
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="min-w-0 flex-1 space-y-2.5">
                <div className="h-5 w-24 animate-pulse rounded-full bg-neutral-100" />
                <div className="h-6 w-2/3 animate-pulse rounded bg-neutral-100" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
                <div className="h-3 w-2/5 animate-pulse rounded bg-neutral-100" />
                <div className="h-6 w-28 animate-pulse rounded bg-neutral-100" />
              </div>
              <div className="flex gap-2 sm:self-end">
                <div className="h-9 w-24 animate-pulse rounded-[3px] bg-neutral-100" />
                <div className="h-9 w-20 animate-pulse rounded-[3px] bg-neutral-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SignInPrompt() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
      <LogIn className="size-6 text-neutral-400" strokeWidth={1.5} />
      <p className="text-sm font-medium text-neutral-800">
        Sign in to see your bookings
      </p>
      <p className="max-w-sm text-xs leading-relaxed text-neutral-500">
        Your upcoming trips and booking details are tied to your account.
      </p>
      <Button
        render={<Link href="/login" />}
        className="mt-1 h-9 rounded-[3px] bg-brand px-4 text-sm font-medium text-white hover:bg-brand/90"
      >
        Sign in
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
      <CalendarX2 className="size-6 text-neutral-400" strokeWidth={1.5} />
      <p className="text-sm font-medium text-neutral-800">No bookings yet</p>
      <p className="max-w-sm text-xs leading-relaxed text-neutral-500">
        You have not booked any trips so far. Explore our destinations and plan
        your next adventure.
      </p>
      <Button
        render={<Link href="/destinations" />}
        className="mt-1 h-9 gap-1.5 rounded-[3px] bg-brand px-4 text-sm font-medium text-white hover:bg-brand/90"
      >
        <Compass className="size-4" strokeWidth={1.75} />
        Explore destinations
      </Button>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
      <CalendarX2 className="size-6 text-neutral-400" strokeWidth={1.5} />
      <p className="text-sm font-medium text-neutral-800">
        Bookings could not be loaded
      </p>
      <p className="max-w-sm text-xs leading-relaxed text-neutral-500">
        The server at localhost:8000 did not respond. Start the backend and
        reload the page.
      </p>
    </div>
  );
}

async function BookingList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;

  if (!email) {
    return <SignInPrompt />;
  }

  let bookings: Booking[];

  try {
    bookings = await getBookings(email);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return <ErrorState />;
  }

  if (bookings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-6 space-y-4">
      {bookings.map((booking) => (
        <MybookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}

const MyBookingPage = () => {
  return (
    <main className="flex-1 bg-white px-4 py-10 sm:px-6 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-normal tracking-tight text-neutral-900 md:text-4xl">
          My Bookings
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Manage and view your upcoming travel plans
        </p>

        <Suspense fallback={<BookingListSkeleton />}>
          <BookingList />
        </Suspense>
      </div>

      <Toaster />
    </main>
  );
};

export default MyBookingPage;
