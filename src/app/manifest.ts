import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARCH SMOKE",
    short_name: "ARCH SMOKE",
    description: "ARCH SMOKE – доверие с первой затяжки.",
    start_url: "/?homescreen=1",
    display: "standalone",
    background_color: "#2B2827",
    theme_color: "#B133FF",
    icons: [
      {
        src: "/android-chrome-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "/android-chrome-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/android-chrome-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/android-chrome-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/android-chrome-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/android-chrome-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      // It's good practice to include maskable icons if available
      // Example:
      // {
      //   src: "/icon-maskable-192x192.png",
      //   sizes: "192x192",
      //   type: "image/png",
      //   purpose: "maskable"
      // }
    ],
    // Optional but recommended PWA properties from favicons config:
    // lang: "ru-RU",
    // dir: "auto",
    // orientation: "any",
  };
}
