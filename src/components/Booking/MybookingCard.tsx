"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Tag,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { toast } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { authFetch } from "@/lib/auth-fetch";

export type Booking = {
  _id: string;
  bookingId?: string;
  userId?: string | null;
  userName?: string | null;
  userEmail?: string | null;
  destinationId?: string;
  destinationName?: string;
  country?: string;
  category?: string;
  price?: string | number;
  duration?: string;
  imageUrl?: string;
  description?: string;
  departureDate?: string;
  bookingDate?: string;
  status?: string;
};

type StatusKey = "confirmed" | "pending" | "cancelled";

const statusStyles: Record<
  StatusKey,
  { label: string; className: string; icon: LucideIcon }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-600",
    icon: Clock3,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-50 text-rose-600",
    icon: Trash2,
  },
};

function resolveStatus(status?: string): StatusKey {
  const value = status?.toLowerCase();

  if (value === "pending") return "pending";
  if (value === "cancelled" || value === "canceled") return "cancelled";

  return "confirmed";
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function shortId(booking: Booking) {
  if (booking.bookingId) return booking.bookingId;
  if (!booking._id) return "—";

  return booking._id.slice(-6);
}

const MybookingCard = ({ booking }: { booking: Booking }) => {
  const router = useRouter();
  const [cancelled, setCancelled] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const status = cancelled ? "cancelled" : resolveStatus(booking.status);
  const statusStyle = statusStyles[status];
  const StatusIcon = statusStyle.icon;

  const handaleCancel = async () => {
    if (cancelled || cancelling) return;

    setCancelling(true);
    setError(null);

    try {
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to cancel booking (${res.status})`);
      }

      setCancelled(true);
      toast.add({
        type: "success",
        title: "Booking cancelled successfully!",
      });
      router.refresh();
    } catch (err) {
      console.error("Cancel booking failed:", err);
      setError("Could not cancel this booking. Please try again.");
      toast.add({
        type: "error",
        title: "Failed to cancel booking!",
      });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <article className="rounded-[4px] border border-neutral-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-[3px] bg-neutral-100 sm:aspect-auto sm:h-[145px] sm:w-[260px]">
          {booking.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={booking.imageUrl}
              alt={booking.destinationName ?? "Booked destination"}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
              No image
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                statusStyle.className,
              )}
            >
              <StatusIcon className="size-3" strokeWidth={2} />
              {statusStyle.label}
            </span>

            <h2 className="mt-2 truncate text-[24px] leading-tight font-medium tracking-tight text-neutral-900">
              {booking.destinationName ?? "Untitled trip"}
            </h2>

            <div className="mt-2.5 space-y-1.5 text-[12px] text-neutral-500">
              <p className="flex items-center gap-1.5">
                <CalendarDays
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                />
                Departure: {formatDate(booking.departureDate)}
              </p>

              <p className="flex items-center gap-1.5">
                <Tag className="size-3.5 shrink-0" strokeWidth={1.75} />
                Booking ID: {shortId(booking)}
              </p>
            </div>

            <p className="mt-2.5 text-[24px] leading-none font-bold text-brand">
              {booking.price != null ? `$${booking.price}` : "—"}
            </p>

            {error && (
              <p className="mt-2 text-[11px] text-rose-500">{error}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:self-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handaleCancel}
              disabled={cancelling || cancelled}
              className="h-9 gap-1.5 rounded-[3px] border-rose-200 bg-white px-4 text-[13px] font-medium text-rose-500 shadow-none hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
            >
              <Trash2 className="size-3.5" strokeWidth={1.75} />
              {cancelling ? "Cancelling..." : "Cancel"}
            </Button>

            <Button
              render={
                <Link
                  href={
                    booking.destinationId
                      ? `/destinations/${booking.destinationId}`
                      : "/destinations"
                  }
                />
              }
              size="sm"
              className="h-9 gap-1.5 rounded-[3px] bg-brand px-4 text-[13px] font-medium text-white hover:bg-brand/90"
            >
              <Eye className="size-3.5" strokeWidth={1.75} />
              View
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MybookingCard;