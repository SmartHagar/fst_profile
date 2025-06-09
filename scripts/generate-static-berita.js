/** @format */
// scripts/generate-static-berita.js
const fs = require("fs");
const path = require("path");

// Data berita - bisa dari file JSON atau fetch dari API
const BASE_URL = "https://fstuogp.com"; // Domain Anda
const API_URL = "https://admin.fstuogp.com"; // API endpoint

async function generateStaticBeritaPages() {
  try {
    // Fetch data berita (ganti dengan cara Anda mendapatkan data)
    let beritaList = [];

    // Opsi 1: Dari API
    const response = await fetch(`${API_URL}/json/berita`);
    const data = await response.json();
    beritaList = data.data || [];

    // Opsi 2: Dari file JSON lokal
    // beritaList = require('./berita-data.json');

    // Opsi 3: Manual data untuk testing
    // beritaList = [
    //   {
    //     id: 1,
    //     judul: "Contoh Berita Teknologi",
    //     isi_berita:
    //       "Ini adalah contoh isi berita teknologi yang sangat menarik...",
    //     gambar_berita: "tech-news.jpg",
    //     penulis: "John Doe",
    //     tag: "teknologi",
    //     tgl_terbit: "2024-01-15",
    //   },
    // ];

    console.log(`Generating ${beritaList.length} static berita pages...`);

    // Create base directory
    const outputDir = "./public/static-berita";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate index file dengan daftar semua berita
    const indexData = beritaList.map((berita) => ({
      id: berita.id,
      tag: berita.tag.toLowerCase().replace(/\s+/g, "-"),
      judul: berita.judul,
      url: `${BASE_URL}/static-berita/${berita.id}/${berita.tag
        .toLowerCase()
        .replace(/\s+/g, "-")}.html`,
    }));

    fs.writeFileSync(
      path.join(outputDir, "index.json"),
      JSON.stringify(indexData, null, 2)
    );

    // Generate HTML untuk setiap berita
    for (const berita of beritaList) {
      const { id, tag, judul, isi_berita, gambar_berita, penulis, tgl_terbit } =
        berita;

      // Clean description
      const description =
        isi_berita
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s+/g, " ")
          .trim()
          .substring(0, 160) + "...";

      const encodedTag = tag.toLowerCase().replace(/\s+/g, "-");
      const imageUrl = `${API_URL}/storage/${gambar_berita}`;
      const pageUrl = `${BASE_URL}/static-berita/${id}/${encodedTag}.html`;

      // Generate HTML dengan meta tags lengkap
      const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${judul.replace(/"/g, "&quot;")} | Fakultas Sains & Teknologi</title>
    <meta name="description" content="${description.replace(/"/g, "&quot;")}">
    <meta name="keywords" content="${tag}, berita, fakultas sains teknologi, ${penulis}">
    <meta name="author" content="${penulis}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${judul.replace(/"/g, "&quot;")}">
    <meta property="og:description" content="${description.replace(
      /"/g,
      "&quot;"
    )}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Fakultas Sains & Teknologi">
    <meta property="article:published_time" content="${tgl_terbit}">
    <meta property="article:author" content="${penulis}">
    <meta property="article:tag" content="${tag}">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${judul.replace(/"/g, "&quot;")}">
    <meta name="twitter:description" content="${description.replace(
      /"/g,
      "&quot;"
    )}">
    <meta name="twitter:image" content="${imageUrl}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "${judul.replace(/"/g, '\\"')}",
        "image": ["${imageUrl}"],
        "datePublished": "${tgl_terbit}",
        "dateModified": "${tgl_terbit}",
        "author": {
            "@type": "Person",
            "name": "${penulis}"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Fakultas Sains & Teknologi",
            "logo": {
                "@type": "ImageObject",
                "url": "${BASE_URL}/images/logo.png"
            }
        },
        "description": "${description.replace(/"/g, '\\"')}",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${pageUrl}"
        }
    }
    </script>
    
    <!-- Auto redirect ke aplikasi Next.js -->
    <script>
        // Delay redirect agar crawlers bisa baca meta tags
        setTimeout(function() {
            window.location.href = '/berita/detail?id=${id}&tag=${encodeURIComponent(
        tag
      )}';
        }, 1000);
        
        // Jika JavaScript disabled, show fallback content
    </script>
    
    <!-- Fallback CSS -->
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; }
        .meta { color: #666; font-size: 14px; margin: 10px 0; }
        .content { margin: 20px 0; }
        .redirect-notice { 
            background: #f0f8ff; 
            padding: 15px; 
            border-radius: 5px; 
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="redirect-notice">
            <strong>Mengalihkan ke halaman berita...</strong>
            <p>Jika halaman tidak dialihkan otomatis, <a href="/berita/detail?id=${id}&tag=${encodeURIComponent(
        tag
      )}">klik di sini</a>.</p>
        </div>
        
        <article>
            <h1>${judul}</h1>
            <div class="meta">
                <span>Oleh: ${penulis}</span> | 
                <span>Tanggal: ${tgl_terbit}</span> | 
                <span>Tag: ${tag}</span>
            </div>
            <img src="${imageUrl}" alt="${judul}" style="max-width: 100%; height: auto; margin: 20px 0;">
            <div class="content">
                <p>${description}</p>
                <p><a href="/berita/detail?id=${id}&tag=${encodeURIComponent(
        tag
      )}">Baca selengkapnya...</a></p>
            </div>
        </article>
        
        <noscript>
            <div style="background: #ffe6e6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>JavaScript diperlukan untuk pengalaman penuh.</strong></p>
                <p><a href="/berita/detail?id=${id}&tag=${encodeURIComponent(
        tag
      )}">Klik di sini untuk membaca berita lengkap</a></p>
            </div>
        </noscript>
    </div>
</body>
</html>`;

      // Create directory structure
      const pageDir = path.join(outputDir, id.toString());
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }

      // Write HTML file
      fs.writeFileSync(path.join(pageDir, `${encodedTag}.html`), html);

      console.log(`Generated: ${id}/${encodedTag}.html`);
    }

    // Generate .htaccess untuk URL rewriting (jika menggunakan Apache)
    const htaccess = `RewriteEngine On

# Redirect dari berita detail ke static pages untuk crawlers
RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Googlebot) [NC]
RewriteRule ^berita/detail\\?id=([0-9]+)&tag=(.*)$ /static-berita/$1/$2.html [R=302,L]

# Fallback untuk browser normal
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]`;

    fs.writeFileSync(path.join("./public", ".htaccess"), htaccess);

    console.log("✅ All static berita pages generated successfully!");
    console.log("📁 Files created in: ./public/static-berita/");
    console.log("🔗 Upload folder 'static-berita' ke shared hosting Anda");
  } catch (error) {
    console.error("❌ Error generating static pages:", error);
  }
}

generateStaticBeritaPages();
