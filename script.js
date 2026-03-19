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

(() => {
  const header = document.querySelector(".site-header");

  const setHeaderOffset = () => {
    if (!header) return;

    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header-height", height + "px");
  };

  // Run multiple times to catch mobile layout shifts
  window.addEventListener("load", setHeaderOffset);
  window.addEventListener("resize", setHeaderOffset);

  // EXTRA: mobile fix (very important)
  setTimeout(setHeaderOffset, 100);
  setTimeout(setHeaderOffset, 300);
})();
