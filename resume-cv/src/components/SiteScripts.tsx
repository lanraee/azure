"use client";

import { useEffect, useState } from "react";

const VISITOR_API =
  "https://belloite-func-f8g5bmbcdyducvfd.germanywestcentral-01.azurewebsites.net/api/visitorcounter";

export function HeaderWidgets() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(VISITOR_API)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.count === "number") {
          setVisitorCount(data.count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {visitorCount !== null && (
        <div className="visitor-counter" id="visitor-counter" style={{ display: "flex" }}>
          <span className="pulse"></span>
          <strong id="visitor-count">{visitorCount.toLocaleString()}</strong>&nbsp;total visits
        </div>
      )}
      <button
        id="downloadPdfBtn"
        className="download-pdf-btn"
        type="button"
        onClick={() => window.print()}
      >
        <svg className="icon" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        Download PDF
      </button>
    </>
  );
}

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <button
      id="scrollTopBtn"
      className={`scroll-top-btn${visible ? " visible" : ""}`}
      type="button"
      aria-label="Scroll to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg className="icon" viewBox="0 0 24 24">
        <path d="M12 4l-8 8h5v8h6v-8h5z" />
      </svg>
      Scroll Up
    </button>
  );
}
