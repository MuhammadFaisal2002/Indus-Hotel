"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DEFAULT_ROOM_NO,
  getBill,
  getConfig,
  getGuest,
  getPromoVideo,
  getRoom,
  getServices,
} from "@/lib/api";
import { startRemote } from "@/lib/remote";
import type { AppConfig, BackgroundId, Bill, Guest, PromoVideo as PromoVideoData, Room, Services } from "@/lib/types";
import { HomeScreen } from "@/components/HomeScreen";
import { PromoVideo } from "@/components/PromoVideo";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ToastProvider } from "@/components/ui/Toast";

// Spatial navigation must be initialised before the first focusable mounts.
startRemote();

type Stage = "welcome" | "promo" | "home";

interface TvData {
  config: AppConfig;
  room: Room;
  guest: Guest | null;
  video: PromoVideoData;
  services: Services;
  bill: Bill;
}

async function loadTvData(roomNo: string): Promise<TvData> {
  const [config, room, guest, services, bill] = await Promise.all([
    getConfig(),
    getRoom(roomNo),
    getGuest(roomNo),
    getServices(),
    getBill(roomNo),
  ]);
  const video = await getPromoVideo(guest?.promoVideoId);
  return { config, room, guest, video, services, bill };
}

const isBackgroundId = (v: string | null, cfg: AppConfig): v is BackgroundId => v !== null && v in cfg.backgrounds;

export function TvApp() {
  const params = useSearchParams();
  const roomNo = params.get("room") ?? DEFAULT_ROOM_NO;
  const bgParam = params.get("bg");

  const [data, setData] = useState<TvData | null>(null);
  const [stage, setStage] = useState<Stage>("welcome");

  useEffect(() => {
    let live = true;
    loadTvData(roomNo).then((d) => live && setData(d));
    return () => {
      live = false;
    };
  }, [roomNo]);

  if (!data) return <div className="size-full bg-ink" />;

  const { config, room, guest, video, services, bill } = data;
  const background = config.backgrounds[isBackgroundId(bgParam, config) ? bgParam : config.background];
  const goHome = () => setStage("home");

  return (
    <ToastProvider>
      {stage === "welcome" && (
        <WelcomeScreen
          guest={guest}
          room={room}
          background={background}
          seconds={config.welcomeSeconds}
          onDone={() => setStage("promo")}
          onBack={goHome}
        />
      )}
      {stage === "promo" && <PromoVideo video={video} onDone={goHome} />}
      {stage === "home" && (
        <HomeScreen
          room={room}
          guest={guest}
          services={services}
          bill={bill}
          background={background}
          timeZone={config.timeZone}
        />
      )}
    </ToastProvider>
  );
}
