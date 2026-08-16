// ⏸️ WORKSHOP STEP 4: Create Custom Hook
import { useEffect, useState, useCallback } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function usePokemonGallery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/api/gallery`);
      if (!res.ok) throw new Error("Failed to load gallery");
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadInitialGallery = async () => {
      try {
        const res = await fetch(`${API}/api/gallery`);
        if (!res.ok) throw new Error("Failed to load gallery");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadInitialGallery();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error, refetch: fetchGallery };
}
