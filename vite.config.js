import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Serve HTML files from public folder in dev
const servePublicHtml = () => ({
  name: "serve-public-html",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.endsWith(".html")) {
        let cleanUrl = req.url.split("?")[0];

        if (cleanUrl.startsWith("/studywithdhilip/")) {
          cleanUrl = cleanUrl.replace("/studywithdhilip/", "");
        } else if (cleanUrl.startsWith("/")) {
          cleanUrl = cleanUrl.substring(1);
        }

        const publicPath = path.resolve(process.cwd(), "public", cleanUrl);

        if (fs.existsSync(publicPath)) {
          res.setHeader("Content-Type", "text/html");
          res.end(fs.readFileSync(publicPath));
          return;
        }
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), servePublicHtml()],
  base: "/studywithdhilip/",
});