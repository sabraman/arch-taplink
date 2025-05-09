import { favicons } from "favicons";
import fs from "fs/promises";
import path from "path";

const source = "public/arch-corgi-logo.svg"; // Source image
const outputDir = "public"; // Output directory for favicons and manifest files

const configuration = {
  path: "/", // Path for HTML links, relative to the public directory
  appName: "ARCH",
  appShortName: "ARCH",
  appDescription: "ARCH – доверие с первой затяжки.",
  developerName: "Yudin Danila",
  developerURL: "https://sabraman.ru",
  background: "#2B2827", // Page background color
  theme_color: "#B133FF", // Theme color from existing metadata
  lang: "ru-RU",
  display: "standalone",
  orientation: "any",
  start_url: "/?homescreen=1",
  version: "1.0",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false, // Apple startup images can be numerous, disabling for now
    favicons: true,
    windows: true,
    yandex: true,
  },
  // manifestMaskable: true, // If you have a maskable version of your logo
};

async function generateFavicons() {
  try {
    console.log("Generating favicons...");
    const response = await favicons(source, configuration);

    // Ensure the output directory exists (it should be public/)
    await fs.mkdir(outputDir, { recursive: true });

    // Write image files
    await Promise.all(
      response.images.map(async (image) => {
        const imagePath = path.join(outputDir, image.name);
        await fs.writeFile(imagePath, image.contents);
        console.log(`Generated image: ${imagePath}`);
      })
    );

    // Write other files (manifest.webmanifest, browserconfig.xml, etc.)
    await Promise.all(
      response.files.map(async (file) => {
        const filePath = path.join(outputDir, file.name);
        await fs.writeFile(filePath, file.contents);
        console.log(`Generated file: ${filePath}`);
      })
    );

    console.log("\nSuccessfully generated favicons and associated files.");
    console.log(
      "\nTo use them, add the following HTML to the <head> of your src/app/layout.tsx:"
    );
    console.log(
      "--------------------------------------------------------------------"
    );
    response.html.forEach((tag) => console.log(tag));
    console.log(
      "--------------------------------------------------------------------"
    );
    console.log(
      "\nRemember to remove any existing favicon links and manifest link from your layout."
    );
  } catch (error) {
    console.error("Error generating favicons:", error.message);
  }
}

generateFavicons();
