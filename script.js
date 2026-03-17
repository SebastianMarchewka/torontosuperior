(() => {
  // Lightweight click tracking hook (no external analytics).
  // Safe to remove if not needed.
  const send = (label) => {
    try {
      const payload = JSON.stringify({ label, ts: Date.now(), path: location.pathname });
      navigator.sendBeacon?.("/_event", payload);
    } catch {
      // ignore
    }
  };

  document.addEventListener("click", (e) => {
    const a = e.target?.closest?.("a");
    if (!a) return;
    const track = a.getAttribute("data-track");
    if (track) send(track);
  });

  // If optional images are missing, fall back gracefully.
  window.addEventListener(
    "error",
    (e) => {
      const el = e?.target;
      if (!(el instanceof HTMLImageElement)) return;
      el.closest?.(".media-card")?.classList?.add("img-missing");
    },
    true,
  );
})();

