import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite dev server ignores HTML files in public/. This middleware forces it to serve them locally!
const servePublicHtml = () => ({
  name: 'serve-public-html',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.endsWith('.html')) {
        // Strip the base URL from the request to get the relative file path
        let cleanUrl = req.url.split('?')[0];
        if (cleanUrl.startsWith('/studywithdhilip/')) {
          cleanUrl = cleanUrl.replace('/studywithdhilip/', '');
        } else if (cleanUrl.startsWith('/')) {
          cleanUrl = cleanUrl.substring(1);
        }
        
        const publicPath = path.resolve(process.cwd(), 'public', cleanUrl);
        if (fs.existsSync(publicPath)) {
          res.setHeader('Content-Type', 'text/html');
          res.end(fs.readFileSync(publicPath));
          return;
        }
      }
      next();
    });
  }
});
// vite.config.js
export default defineConfig({
  plugins: [react(), servePublicHtml()],
  base: "/", // Changed from "/studywithdhilip/" to "/"
});