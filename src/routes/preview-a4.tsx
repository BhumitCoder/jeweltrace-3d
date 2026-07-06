import { createFileRoute } from "@tanstack/react-router";
import { A4Certificate, A4_W, A4_H } from "@/components/A4Certificate";
import type { Certificate } from "@/lib/store";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/preview-a4")({
  component: PreviewA4Page,
});

const DEMO_CERT: Certificate = {
  id: "demo",
  reportNo: "GRL-2026-004821",
  type: "Natural Diamond",
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

function useScale() {
  const [scale, setScale] = useState(0.7);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      setScale(Math.min(0.7, (vw - 64) / A4_W));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

function PreviewA4Page() {
  const scale = useScale();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 24px",
        gap: 24,
      }}
    >
      <div style={{ color: "#B8922A", fontFamily: "Georgia,serif", fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.8 }}>
        A4 Certificate — Design Preview
      </div>

      {/* Scaled A4 preview */}
      <div
        style={{
          width: A4_W * scale,
          height: A4_H * scale,
          overflow: "hidden",
          borderRadius: 6,
          boxShadow: "0 20px 80px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(184,146,42,0.3)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: A4_W,
            height: A4_H,
          }}
        >
          <A4Certificate cert={DEMO_CERT} />
        </div>
      </div>

      <p style={{ color: "#666", fontSize: 12, letterSpacing: "0.1em", marginTop: 8 }}>
        SAMPLE DATA — for design preview only
      </p>
    </div>
  );
}
