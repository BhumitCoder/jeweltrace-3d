// Pure CSS 3D spinning diamond — no WebGL, lightweight & premium
export function Diamond3D({ size = 280 }: { size?: number }) {
  const s = size;
  return (
    <div
      className="relative perspective-1000"
      style={{ width: s, height: s }}
      aria-hidden
    >
      {/* glow halo */}
      <div className="absolute inset-0 bg-radial-gold blur-2xl" />
      <div
        className="relative preserve-3d animate-spin-slow"
        style={{ width: s, height: s, transformStyle: "preserve-3d" }}
      >
        {/* Crown facets */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i;
          return (
            <div
              key={`c${i}`}
              className="absolute left-1/2 top-1/2 origin-top"
              style={{
                width: s * 0.32,
                height: s * 0.42,
                marginLeft: -s * 0.16,
                marginTop: -s * 0.05,
                transform: `rotateY(${angle}deg) translateZ(${s * 0.18}px) rotateX(28deg)`,
                background:
                  "linear-gradient(180deg, oklch(0.92 0.04 240 / 0.85), oklch(0.45 0.10 260 / 0.85))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                border: "1px solid oklch(0.85 0.14 88 / 0.55)",
                boxShadow: "inset 0 0 30px oklch(0.85 0.14 88 / 0.35)",
              }}
            />
          );
        })}
        {/* Pavilion facets */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i + 22.5;
          return (
            <div
              key={`p${i}`}
              className="absolute left-1/2 top-1/2 origin-top"
              style={{
                width: s * 0.36,
                height: s * 0.55,
                marginLeft: -s * 0.18,
                marginTop: s * 0.0,
                transform: `rotateY(${angle}deg) translateZ(${s * 0.12}px) rotateX(-28deg)`,
                background:
                  "linear-gradient(180deg, oklch(0.55 0.10 260 / 0.9), oklch(0.18 0.06 265 / 0.95))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                border: "1px solid oklch(0.85 0.14 88 / 0.45)",
                boxShadow: "inset 0 0 40px oklch(0.30 0.10 265 / 0.6)",
              }}
            />
          );
        })}
        {/* Table (top) */}
        <div
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: s * 0.42,
            height: s * 0.42,
            marginLeft: -s * 0.21,
            marginTop: -s * 0.21,
            transform: "rotateX(90deg) translateZ(0)",
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.95 0.04 90), oklch(0.6 0.10 250))",
            border: "1px solid oklch(0.85 0.14 88 / 0.7)",
            boxShadow: "0 0 30px oklch(0.85 0.14 88 / 0.5)",
          }}
        />
      </div>
    </div>
  );
}
