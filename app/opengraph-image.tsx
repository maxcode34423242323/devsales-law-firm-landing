import { ImageResponse } from "next/og";

export const alt = "DevilSales Web — Digital experiences for serious growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 70px", color: "white", background: "radial-gradient(circle at 82% 22%, #6f2cff 0%, #2b086a 28%, #0b0027 62%)", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 62, height: 62, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16, background: "linear-gradient(135deg,#b77cff,#6f24ff,#ed39ce)", fontSize: 25, fontWeight: 700 }}>DS</div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 25, fontWeight: 700, letterSpacing: 5 }}>DEVILSALES</span><span style={{ marginTop: 5, fontSize: 13, letterSpacing: 4, color: "#bdb1d7" }}>WEB STUDIO · USA</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
        <div style={{ fontSize: 78, lineHeight: 0.92, letterSpacing: -4 }}>Digital experiences for</div>
        <div style={{ marginTop: 10, fontSize: 86, lineHeight: 0.92, letterSpacing: -5, color: "#9f67ff" }}>serious growth.</div>
        <div style={{ marginTop: 32, fontSize: 23, color: "#c7bed8" }}>Strategy · UI/UX Design · Custom Development · Growth Systems</div>
      </div>
    </div>,
    size,
  );
}
