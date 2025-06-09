/** @format */
// Ultra minimal server untuk shared hosting dengan memory sangat terbatas
const { createServer } = require("http");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");

// Set memory limits yang sangat ketat
process.env.NODE_OPTIONS = "--max-old-space-size=128 --optimize-for-size";

// Disable undici jika memungkinkan
process.env.NODE_NO_WARNINGS = "1";

const port = process.env.PORT || 8081;

console.log("Starting ultra minimal server...");

// Simple static file server tanpa Next.js
const server = createServer((req, res) => {
  try {
    const parsedUrl = parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Default ke index.html
    if (pathname === "/") {
      pathname = "/index.html";
    }

    // Tambahkan .html jika tidak ada extension
    if (!path.extname(pathname) && pathname !== "/") {
      pathname += ".html";
    }

    const filePath = path.join(process.cwd(), "out", pathname);

    // Cek apakah file ada
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        const ext = path.extname(filePath);
        let contentType = "text/html";

        // Set content type berdasarkan extension
        switch (ext) {
          case ".js":
            contentType = "application/javascript";
            break;
          case ".css":
            contentType = "text/css";
            break;
          case ".json":
            contentType = "application/json";
            break;
          case ".png":
            contentType = "image/png";
            break;
          case ".jpg":
          case ".jpeg":
            contentType = "image/jpeg";
            break;
          case ".gif":
            contentType = "image/gif";
            break;
          case ".svg":
            contentType = "image/svg+xml";
            break;
        }

        res.writeHead(200, {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000", // 1 year cache
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
        });

        // Stream file untuk efisiensi memory
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
        return;
      }
    }

    // 404 fallback
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  } catch (err) {
    console.error("Error:", err.message);
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>500 - Internal Server Error</h1>");
  }
});

server.listen(port, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log(`✓ Ultra minimal server ready on port ${port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    process.exit(0);
  });
});
