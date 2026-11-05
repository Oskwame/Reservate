"use client";

import { useEffect, useState } from "react";
import { API_PREFIX } from "@htms/config";
import { apiFetch } from "@/lib/api";

export type ApiHealth = "checking" | "online" | "offline";

const POLL_INTERVAL_MS = 30_000;

export function useApiHealth(): ApiHealth {
  const [status, setStatus] = useState<ApiHealth>("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        await apiFetch(`${API_PREFIX}/health`);
        if (!cancelled) {
          setStatus("online");
        }
      } catch {
        if (!cancelled) {
          setStatus("offline");
        }
      }
    }

    void check();
    const timer = window.setInterval(check, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return status;
}
