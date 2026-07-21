import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        border: "2px solid rgba(255,255,255,.75)",
        background: "linear-gradient(135deg, #c58bff 0%, #792cff 48%, #f03bd2 100%)",
        color: "white",
        fontSize: 27,
        fontWeight: 800,
        letterSpacing: "-1.5px",
      }}
    >
      DS
    </div>,
    size
  );
}
