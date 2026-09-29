// Thin data layer. Components only talk to these functions, so the mocks can be
// swapped for Laravel API calls later without touching any UI code.

import { config } from "@/mock/config";
import { guestsByRoom } from "@/mock/guest";
import { promoVideos } from "@/mock/promoVideos";
import { DEFAULT_ROOM_NO, rooms } from "@/mock/room";
import { services } from "@/mock/services";
import type { AppConfig, Guest, GuestRequest, PromoVideo, Room, SentRequest, Services } from "@/lib/types";

export { DEFAULT_ROOM_NO };

/** In-memory log of everything the guest asked for this session. No network yet. */
export const requests: SentRequest[] = [];

const resolve = <T>(value: T): Promise<T> => Promise.resolve(structuredClone(value));

export function getConfig(): Promise<AppConfig> {
  return resolve(config);
}

export function getRoom(roomNo: string): Promise<Room> {
  const room = rooms.find((r) => r.roomNo === roomNo) ?? { ...rooms[0], roomNo };
  return resolve(room);
}

/** `null` when nobody is checked in to that room. */
export function getGuest(roomNo: string): Promise<Guest | null> {
  return resolve(guestsByRoom[roomNo] ?? null);
}

export function getPromoVideo(id: string | undefined): Promise<PromoVideo> {
  return resolve(promoVideos.find((v) => v.id === id) ?? promoVideos[0]);
}

export function getServices(): Promise<Services> {
  return resolve(services);
}

export function sendRequest(roomNo: string, req: GuestRequest): Promise<SentRequest> {
  const sent: SentRequest = { ...req, id: requests.length + 1, roomNo, at: new Date().toISOString() };
  requests.push(sent);
  return resolve(sent);
}
