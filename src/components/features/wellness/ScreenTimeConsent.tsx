"use client";

import React, { useEffect, useState } from "react";
import { useScreenTime } from "@/hooks/useScreenTime";

export function ScreenTimeConsent() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem("screentime_enabled") === "true";
    } catch (e) {
      return false;
    }
  });

  const { isActive } = useScreenTime({ enabled });

  useEffect(() => {
    try {
      localStorage.setItem("screentime_enabled", enabled ? "true" : "false");
    } catch (e) {}
  }, [enabled]);

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">Screen Time Tracking</h3>
      <p className="text-sm text-gray-600">Opt-in to collect anonymized screen time data to get personalized wellness insights. No personal data is stored when anonymized mode is enabled.</p>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="mr-2" />
          Enable anonymized tracking
        </label>
      </div>
      <div className="mt-2 text-sm text-gray-500">Status: {enabled ? (isActive ? 'tracking' : 'idle') : 'disabled'}</div>
    </div>
  );
}
