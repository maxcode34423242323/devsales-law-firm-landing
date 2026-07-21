import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevilSales Web",
    short_name: "DevilSales",
    description: "Custom web design and development for ambitious US service businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0027",
    theme_color: "#6100ff",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
