import { createFileRoute } from "@tanstack/react-router";
import { A4Certificate, A4_W, A4_H } from "@/components/A4Certificate";
import { A4ReportCertificate, A4R_W, A4R_H } from "@/components/A4ReportCertificate";
import type { Certificate } from "@/lib/store";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/preview-a4")({
  component: PreviewA4Page,
});

const DEMO_CERT: Certificate = {
  id: "demo",
  reportNo: "GRL-2026-004821",
  type: "Natural Diamond",
  itemName: "Natural Diamond",
  clientName: "Gavin Joel Hetrick",
  shape: "Round Brilliant",
  measurements: "6.97 - 7.00 × 4.36 mm",
  caratWeight: "1.30",
  color: "D",
  clarity: "VS1",
  cut: "Excellent",
  polish: "Excellent",
  symmetry: "Very Good",
  fluorescence: "None",
  origin: "Natural",
  issueDate: "2026-01-23",
  description:
    "One (1) natural diamond, Round Brilliant cut, with an estimated total carat weight of 1.30 carats. Graded insofar as mounting permits examination.",
  remarks: "Laser inscription: GRL-2026-004821",
  createdAt: Date.now(),
  cardStyle: "a4",
};

function useScale(pageW: number, max: number) {
  const [scale, setScale] = useState(max);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      /* fit the page within the viewport with a 64px margin */
      setScale(Math.min(max, Math.max(0.25, (vw - 64) / pageW)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pageW, max]);
  return scale;
}

const CAPTION: React.CSSProperties = {
  color: "#9A7418", fontFamily: "Georgia,serif", fontSize: 13,
  letterSpacing: "0.25em", textTransform: "uppercase",
};

function PreviewA4Page() {
  const scale  = useScale(A4_W, 0.68);
  const rScale = useScale(A4R_W, 0.86);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F0E8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 24px 56px",
        gap: 24,
      }}
    >
      <div style={CAPTION}>A4 Certificate — Landscape</div>

      <div
        style={{
          width: A4_W * scale,
          height: A4_H * scale,
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(184,146,42,0.25)",
          flexShrink: 0,
        }}
      >
        <div style={{ zoom: scale, width: A4_W, height: A4_H }}>
          <A4Certificate cert={DEMO_CERT} />
        </div>
      </div>

      <div style={{ ...CAPTION, marginTop: 28 }}>A4 Lab Report — Portrait</div>

      <div
        style={{
          width: A4R_W * rScale,
          height: A4R_H * rScale,
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(184,146,42,0.25)",
          flexShrink: 0,
        }}
      >
        <div style={{ zoom: rScale, width: A4R_W, height: A4R_H }}>
          <A4ReportCertificate cert={{ ...DEMO_CERT, cardStyle: "a4report" }} />
        </div>
      </div>

      <p style={{ color: "#666", fontSize: 12, letterSpacing: "0.1em", marginTop: 8 }}>
        SAMPLE DATA — for design preview only
      </p>
    </div>
  );
}
