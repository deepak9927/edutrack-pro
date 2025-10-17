"use client";

import { useEffect, useRef, useState } from "react";

interface PendingSession {
  sessionId: string;
  url?: string;
  title?: string;
  category?: string;
  startedAt: string;
  endedAt?: string;
  duration?: number; // seconds
}

const INACTIVITY_THRESHOLD = 30; // seconds of inactivity to close session
const SYNC_INTERVAL = 30 * 1000; // sync every 30s
const BROADCAST_CHANNEL_NAME = "ignou-screen-time";

export function useScreenTime({ enabled }: { enabled: boolean }) {
  const [isActive, setIsActive] = useState(false);
  const currentSession = useRef<PendingSession | null>(null);
  const lastActivity = useRef<number>(Date.now());
  const buffer = useRef<PendingSession[]>([]);

  function startSession() {
    if (!enabled) return;
    if (currentSession.current) return;
    const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    currentSession.current = {
      sessionId,
      url: window.location.href,
      title: document.title || undefined,
      startedAt: new Date().toISOString(),
    };
    setIsActive(true);
  }

  function endSession() {
    if (!currentSession.current) return;
    const s = currentSession.current;
    s.endedAt = new Date().toISOString();
    s.duration = Math.max(0, Math.floor((Date.parse(s.endedAt) - Date.parse(s.startedAt)) / 1000));
    buffer.current.push(s);
    currentSession.current = null;
    setIsActive(false);
  }

  useEffect(() => {
    if (!enabled) return;
    // Simple BroadcastChannel leader election: only the leader tab will
    // perform periodic network syncs. This avoids duplicate writes from
    // multiple tabs. Leadership is ephemeral and best-effort.
    let bc: BroadcastChannel | null = null;
    let isLeader = false;
    try {
      bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      bc.onmessage = (ev) => {
        if (ev.data === "who_is_leader") {
          if (isLeader) bc?.postMessage("i_am_leader");
        } else if (ev.data === "i_am_leader") {
          // another tab beat us
          isLeader = false;
        }
      };
      // ask who is leader; if nobody responds in 200ms, become leader
      bc.postMessage("who_is_leader");
      const t = setTimeout(() => {
        if (!isLeader) {
          isLeader = true;
          bc?.postMessage("i_am_leader");
        }
      }, 200);
      // clear on cleanup
      setTimeout(() => clearTimeout(t), 0);
    } catch (e) {
      // BroadcastChannel not supported — fall back to allowing this tab
      isLeader = true;
    }
    function onActivity() {
      lastActivity.current = Date.now();
      if (!currentSession.current) startSession();
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        onActivity();
      } else {
        endSession();
      }
    }

    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", () => {
      // finalize session
      endSession();
      // try send synchronously (navigator.sendBeacon)
      if (buffer.current.length && isLeader) {
        try {
          const payload = JSON.stringify(buffer.current.map((b) => ({ ...b, anonymized: true })));
          // sendBeacon likes a Blob for content-type
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/wellness/screentime", blob);
          buffer.current = [];
        } catch (e) {
          // ignore
        }
      }
    });

    const interval = setInterval(() => {
      // check inactivity
      if (currentSession.current && Date.now() - lastActivity.current > INACTIVITY_THRESHOLD * 1000) {
        endSession();
      }
      // sync buffer
      if (buffer.current.length && isLeader) {
        const toSend = buffer.current.splice(0, 20);
        fetch("/api/wellness/screentime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toSend.map((b) => ({ ...b, anonymized: true }))),
        }).catch((e) => {
          // requeue
          buffer.current.unshift(...toSend);
        });
      }
    }, SYNC_INTERVAL);

    // start
    startSession();

    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      if (bc) {
        try {
          bc.close();
        } catch (e) {}
      }
      clearInterval(interval);
      endSession();
    };
  }, [enabled, startSession]);

  return { isActive, bufferRef: buffer };
}
