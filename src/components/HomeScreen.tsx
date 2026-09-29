"use client";

import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useCallback, useEffect, useState } from "react";
import { sendRequest } from "@/lib/api";
import type { Bill, Department, Guest, PanelId, Room, Services } from "@/lib/types";
import { FooterMenu, MENU, footerKey } from "@/components/FooterMenu";
import { Backdrop } from "@/components/ui/Backdrop";
import { Clock } from "@/components/ui/Clock";
import { Logo, Ornament } from "@/components/ui/Logo";
import { useToast } from "@/components/ui/Toast";
import { BillingPanel } from "@/components/panels/BillingPanel";
import { DiningPanel } from "@/components/panels/DiningPanel";
import { FrontDeskPanel } from "@/components/panels/FrontDeskPanel";
import { HousekeepingPanel } from "@/components/panels/HousekeepingPanel";
import { RoomServicePanel } from "@/components/panels/RoomServicePanel";
import { SpaPanel } from "@/components/panels/SpaPanel";
import { TvPanel } from "@/components/panels/TvPanel";
import type { PanelProps } from "@/components/panels/types";

interface HomeScreenProps {
  room: Room;
  guest: Guest | null;
  services: Services;
  bill: Bill;
  background: string;
  timeZone: string;
}

const CONFIRMATION: Record<Department, string> = {
  "Room Service": "Request sent to Room Service",
  Housekeeping: "Request sent to Housekeeping",
  Dining: "Order sent to Lazzat Restaurant",
  Spa: "Booking request sent to Beauty Parlor",
  "Front Desk": "Request sent to Front Desk",
};

export function HomeScreen({ room, guest, services, bill, background, timeZone }: HomeScreenProps) {
  const [open, setOpen] = useState<PanelId | null>(null);
  const toast = useToast();

  useEffect(() => {
    setFocus(footerKey(MENU[0].id));
  }, []);

  const close = useCallback(() => {
    if (!open) return;
    // Move focus first so it never lands on an unmounting panel item.
    setFocus(footerKey(open));
    setOpen(null);
  }, [open]);

  const onRequest = useCallback(
    (department: Department, item: string, price?: number) => {
      void sendRequest(room.roomNo, { department, item, price });
      toast(`${CONFIRMATION[department]} · ${item}`);
    },
    [room.roomNo, toast],
  );

  const panelProps: PanelProps = { onClose: close, onRequest, notify: toast };

  return (
    <main className="animate-fade-in relative flex size-full flex-col">
      <Backdrop src={background} variant="home" />

      <div className="relative min-h-0 flex-1">
        <div
          className={`safe-area flex h-full flex-col justify-between pb-10 transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-start justify-between">
            <Logo className="h-[8.5rem] w-auto" />
            <Clock timeZone={timeZone} />
          </div>

          <div className="max-w-[70rem]">
            <p className="text-label tracking-[0.5em] text-gold uppercase">Indus Hotel · Hyderabad</p>
            <h1 className="mt-5 font-display text-[6.5rem] leading-[1.02] font-semibold">
              {guest ? (
                <>
                  Welcome, {guest.title} {guest.name}
                </>
              ) : (
                "Welcome to Indus Hotel"
              )}
            </h1>
            <div className="mt-6 flex items-center gap-6 text-lead text-muted">
              <span>Room {room.roomNo}</span>
              <Ornament className="[&>span:first-child]:w-10 [&>span:last-child]:w-10" />
              <span>Relax. Unwind. Experience true hospitality.</span>
            </div>
          </div>

          <p className="text-label tracking-[0.25em] text-white/60 uppercase">
            Use <span className="text-white">◀ ▶</span> to explore · <span className="text-white">OK</span> to open
          </p>
        </div>

        {open && <div className="animate-fade-in absolute inset-0 bg-ink/70" />}
        {open === "tv" && <TvPanel {...panelProps} channels={services.channels} />}
        {open === "roomService" && <RoomServicePanel {...panelProps} items={services.roomService} />}
        {open === "housekeeping" && <HousekeepingPanel {...panelProps} items={services.housekeeping} />}
        {open === "dining" && <DiningPanel {...panelProps} dining={services.dining} />}
        {open === "spa" && <SpaPanel {...panelProps} spa={services.spa} />}
        {open === "frontDesk" && <FrontDeskPanel {...panelProps} frontDesk={services.frontDesk} />}
        {open === "billing" && <BillingPanel {...panelProps} bill={bill} guest={guest} />}
      </div>

      <FooterMenu room={room} active={open} onOpen={setOpen} />
    </main>
  );
}
