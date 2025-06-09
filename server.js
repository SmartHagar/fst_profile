/** @format */

// ultra-minimal-server.js - Absolute minimal Next.js server
const { createServer } = require("http");
const { parse } = require("url");
const { join } = require("path");

// Set extreme memory limits
process.env.NODE_OPTIONS =
  "--max-old-space-size=128 --optimize-for-size --gc-interval=50 --no-experimental-fetch";

// Disable all non-essential features
process.env.DISABLE_SWC = "true";
process.env.NEXT_TELEMETRY_DISABLED = "1";

// Force garbage collection very frequently
if (global.gc) {
  setInterval(() => {
    global.gc();
  }, 15000); // Every 15 seconds
}

const next = require("next");

const dev = false;
const hostname = "localhost";
const port = process.env.PORT || 8080;

// Ultra minimal Next.js configuration
const app = next({
  dev: false,
  hostname,
  port,
  dir: process.cwd(),
  quiet: true, // Reduce logging
  conf: {
    // Disable everything possible
    swcMinify: false,
    compress: false,
    poweredByHeader: false,
    generateEtags: false,
    distDir: ".next",

    // Disable experimental features
    experimental: {
      forceSwcTransforms: false,
      workerThreads: false,
      cpus: 1,
      isrMemoryCacheSize: 0,
      largePageDataBytes: 64 * 1000, // 64KB limit
    },

    // Minimal image config
    images: {
      unoptimized: true,
      domains: [],
      formats: [],
    },

    // Minimal webpack config
    webpack: null, // Use default minimal webpack

    // Disable dev features completely
    onDemandEntries: {
      maxInactiveAge: 5 * 1000, // 5 seconds
      pagesBufferLength: 1, // Only keep 1 page in memory
    },
  },
});

const handle = app.getRequestHandler();

// Minimal memory monitoring
const logMemory = () => {
  const used = process.memoryUsage();
  const rss = Math.round((used.rss / 1024 / 1024) * 100) / 100;
  console.log(`Memory: ${rss}MB`);

  // Aggressive GC
  if (rss > 150 && global.gc) {
    global.gc();
  }
};

console.log("Starting ultra minimal server...");

// Error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  // Don't exit, try to continue
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  // Don't exit, try to continue
});

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        // Parse URL with minimal options
        const parsedUrl = parse(req.url, true);

        // Set minimal headers
        res.setHeader("X-Frame-Options", "DENY");

        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Request error:", err.message);
        res.statusCode = 500;
        res.end("Error");
      }
    });

    // Minimal server config
    server.timeout = 20000; // 20 seconds
    server.keepAliveTimeout = 5000; // 5 seconds
    server.maxConnections = 10; // Limit connections

    server.listen(port, (err) => {
      if (err) {
        console.error("Server failed:", err.message);
        process.exit(1);
      }
      console.log(`Server ready on port ${port}`);
      logMemory();
    });

    // Memory monitoring every 30 seconds
    setInterval(logMemory, 30000);

    // Graceful shutdown
    process.on("SIGTERM", () => {
      server.close(() => process.exit(0));
    });
  })
  .catch((ex) => {
    console.error("App failed:", ex.message);

    // Try to start a basic static server as fallback
    console.log("Attempting fallback static server...");
    const staticServer = createServer((req, res) => {
      res.writeHead(503, { "Content-Type": "text/html" });
      res.end(
        "<h1>Service Temporarily Unavailable</h1><p>Please try again later.</p>"
      );
    });

    staticServer.listen(port, () => {
      console.log(`Fallback server on port ${port}`);
    });
  });
