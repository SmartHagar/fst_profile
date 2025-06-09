/** @format */

// minimal-server.js - Ultra lightweight Next.js server
const { createServer } = require("http");
const { parse } = require("url");

// Set aggressive memory limits
process.env.NODE_OPTIONS =
  "--max-old-space-size=256 --optimize-for-size --gc-interval=100";

// Force garbage collection more frequently
if (global.gc) {
  setInterval(() => {
    global.gc();
  }, 30000); // Every 30 seconds
}

const next = require("next");

const dev = false; // Always production for shared hosting
const hostname = "localhost";
const port = process.env.PORT || 8080;

// Minimal Next.js configuration
const app = next({
  dev: false,
  hostname,
  port,
  conf: {
    // Disable memory-heavy features
    swcMinify: false,
    compress: false, // Let server handle compression
    poweredByHeader: false,
    generateEtags: false,
    experimental: {
      workerThreads: false,
      cpus: 1,
      isrMemoryCacheSize: 0, // Disable ISR cache
    },
    // Minimal image config
    images: {
      unoptimized: true,
    },
    // Disable dev features
    onDemandEntries: {
      maxInactiveAge: 15 * 1000,
      pagesBufferLength: 2,
    },
  },
});

const handle = app.getRequestHandler();

// Memory monitoring
const logMemoryUsage = () => {
  const used = process.memoryUsage();
  const rss = Math.round((used.rss / 1024 / 1024) * 100) / 100;
  const heapUsed = Math.round((used.heapUsed / 1024 / 1024) * 100) / 100;
  console.log(`Memory: RSS ${rss}MB, Heap ${heapUsed}MB`);

  // Force GC if memory usage is high
  if (rss > 200 && global.gc) {
    console.log("Forcing garbage collection...");
    global.gc();
  }
};

console.log("Starting minimal Next.js server...");

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);

        // Basic security headers
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-Content-Type-Options", "nosniff");

        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error handling request:", err.message);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    // Set server timeout
    server.timeout = 30000; // 30 seconds

    server.listen(port, (err) => {
      if (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
      }
      console.log(`✓ Server ready on http://${hostname}:${port}`);
      logMemoryUsage();
    });

    // Monitor memory usage
    setInterval(logMemoryUsage, 60000); // Every minute

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(() => {
        process.exit(0);
      });
    });
  })
  .catch((ex) => {
    console.error("Failed to prepare Next.js app:", ex.message);
    process.exit(1);
  });
