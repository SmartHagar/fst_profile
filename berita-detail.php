<?php

/** @format */
// berita-detail.php - Tempatkan di root shared hosting

// Configuration
$BASE_URL = "https://fstuogp.com"; // Ganti dengan domain Anda
$API_URL = "https://admin.fstuogp.com";     // Ganti dengan API endpoint Anda
$APP_URL = "/out/berita/detail";       // URL aplikasi Next.js Anda di folder out

// Get parameters
$berita_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$berita_tag = isset($_GET['tag']) ? $_GET['tag'] : '';

// Validate parameters
if (!$berita_id || !$berita_tag) {
    header("Location: $BASE_URL/berita");
    exit;
}

// Initialize variables
$berita = null;
$error = false;

// Fetch berita data from API
try {
    $api_url = $API_URL . "/json/berita/detail/" . $berita_id . "/" . urlencode($berita_tag);

    // Create context for file_get_contents with timeout
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'method' => 'GET',
            'header' => [
                'Content-Type: application/json',
                'User-Agent: Mozilla/5.0 (compatible; BeritaCrawler/1.0)'
            ]
        ]
    ]);

    $response = @file_get_contents($api_url, false, $context);

    if ($response !== false) {
        $berita = json_decode($response, true);

        // Validate response
        if (!$berita || !isset($berita['id'])) {
            $error = true;
        }
    } else {
        $error = true;
    }
} catch (Exception $e) {
    $error = true;
}

// If API fails, redirect to app with error handling
if ($error || !$berita) {
    // For crawlers, show basic error page with meta tags
    $user_agent = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
    $is_crawler = (
        strpos($user_agent, 'facebookexternalhit') !== false ||
        strpos($user_agent, 'twitterbot') !== false ||
        strpos($user_agent, 'whatsapp') !== false ||
        strpos($user_agent, 'linkedinbot') !== false ||
        strpos($user_agent, 'googlebot') !== false
    );

    if (!$is_crawler) {
        header("Location: $BASE_URL$APP_URL?id=$berita_id&tag=" . urlencode($berita_tag));
        exit;
    }
}

// Prepare data for meta tags
if ($berita) {
    $judul = htmlspecialchars($berita['judul'] ?? 'Berita', ENT_QUOTES, 'UTF-8');
    $isi_berita = $berita['isi_berita'] ?? '';
    $gambar_berita = $berita['gambar_berita'] ?? '';
    $penulis = htmlspecialchars($berita['penulis'] ?? 'Admin', ENT_QUOTES, 'UTF-8');
    $tag = htmlspecialchars($berita['tag'] ?? $berita_tag, ENT_QUOTES, 'UTF-8');
    $tgl_terbit = $berita['tgl_terbit'] ?? date('Y-m-d');

    // Clean description
    $description = strip_tags($isi_berita);
    $description = preg_replace('/\s+/', ' ', $description);
    $description = trim($description);
    $description = mb_substr($description, 0, 160, 'UTF-8');
    if (strlen($description) >= 160) {
        $description .= '...';
    }
    $description = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');

    // Image URL
    $image_url = !empty($gambar_berita) ? $API_URL . "/storage/" . $gambar_berita : $BASE_URL . "/images/default-news.jpg";

    // Page URLs
    $current_url = $BASE_URL . "/berita-detail.php?id=$berita_id&tag=" . urlencode($berita_tag);
    $app_url = $BASE_URL . $APP_URL . "?id=$berita_id&tag=" . urlencode($berita_tag);
} else {
    // Fallback data
    $judul = "Berita Tidak Ditemukan";
    $description = "Maaf, berita yang Anda cari tidak ditemukan atau tidak tersedia.";
    $image_url = $BASE_URL . "/images/default-news.jpg";
    $current_url = $BASE_URL . "/berita-detail.php?id=$berita_id&tag=" . urlencode($berita_tag);
    $app_url = $BASE_URL . "/out/berita";
    $penulis = "Admin";
    $tag = $berita_tag;
    $tgl_terbit = date('Y-m-d');
}

// Check if user is a crawler/bot
$user_agent = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
$is_crawler = (
    strpos($user_agent, 'facebookexternalhit') !== false ||
    strpos($user_agent, 'twitterbot') !== false ||
    strpos($user_agent, 'whatsapp') !== false ||
    strpos($user_agent, 'linkedinbot') !== false ||
    strpos($user_agent, 'googlebot') !== false ||
    strpos($user_agent, 'bingbot') !== false ||
    strpos($user_agent, 'slackbot') !== false ||
    strpos($user_agent, 'telegrambot') !== false
);

// If not a crawler and berita exists, redirect to app
if (!$is_crawler && $berita && !isset($_GET['preview'])) {
    header("Location: $app_url");
    exit;
}

// Format date
$formatted_date = date('d F Y', strtotime($tgl_terbit));
$iso_date = date('c', strtotime($tgl_terbit));
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Basic Meta Tags -->
    <title><?php echo $judul; ?> | Fakultas Sains & Teknologi</title>
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="keywords" content="<?php echo $tag; ?>, berita, fakultas sains teknologi, <?php echo $penulis; ?>">
    <meta name="author" content="<?php echo $penulis; ?>">
    <meta name="robots" content="index, follow">

    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo $current_url; ?>">

    <!-- Open Graph Meta Tags (Facebook, WhatsApp, LinkedIn) -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="<?php echo $judul; ?>">
    <meta property="og:description" content="<?php echo $description; ?>">
    <meta property="og:image" content="<?php echo $image_url; ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="<?php echo $judul; ?>">
    <meta property="og:url" content="<?php echo $current_url; ?>">
    <meta property="og:site_name" content="Fakultas Sains & Teknologi">
    <meta property="og:locale" content="id_ID">
    <meta property="article:published_time" content="<?php echo $iso_date; ?>">
    <meta property="article:modified_time" content="<?php echo $iso_date; ?>">
    <meta property="article:author" content="<?php echo $penulis; ?>">
    <meta property="article:section" content="<?php echo $tag; ?>">
    <meta property="article:tag" content="<?php echo $tag; ?>">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@fakultas_saintek">
    <meta name="twitter:creator" content="@<?php echo strtolower(str_replace(' ', '', $penulis)); ?>">
    <meta name="twitter:title" content="<?php echo $judul; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image" content="<?php echo $image_url; ?>">
    <meta name="twitter:image:alt" content="<?php echo $judul; ?>">

    <!-- WhatsApp and Telegram -->
    <meta property="og:image:type" content="image/jpeg">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "<?php echo addslashes($judul); ?>",
            "image": {
                "@type": "ImageObject",
                "url": "<?php echo $image_url; ?>",
                "width": 1200,
                "height": 630
            },
            "datePublished": "<?php echo $iso_date; ?>",
            "dateModified": "<?php echo $iso_date; ?>",
            "author": {
                "@type": "Person",
                "name": "<?php echo addslashes($penulis); ?>"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Fakultas Sains & Teknologi",
                "logo": {
                    "@type": "ImageObject",
                    "url": "<?php echo $BASE_URL; ?>/images/logo.png",
                    "width": 200,
                    "height": 60
                }
            },
            "description": "<?php echo addslashes($description); ?>",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "<?php echo $current_url; ?>"
            },
            "articleSection": "<?php echo addslashes($tag); ?>",
            "articleBody": "<?php echo addslashes($description); ?>"
        }
    </script>

    <!-- Favicon -->
    <link rel="icon" href="<?php echo $BASE_URL; ?>/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo $BASE_URL; ?>/images/logo-192.png">

    <!-- Styles -->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            width: 100%;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .header p {
            opacity: 0.9;
            font-size: 1rem;
        }

        .content {
            padding: 40px;
        }

        .article-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.3;
            color: #2d3748;
        }

        .article-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
            padding: 20px;
            background: #f7fafc;
            border-radius: 10px;
            font-size: 0.9rem;
            color: #4a5568;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .article-image {
            width: 100%;
            max-width: 100%;
            height: auto;
            border-radius: 15px;
            margin: 30px 0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .article-content {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 40px;
            color: #2d3748;
        }

        .action-buttons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 30px;
        }

        .btn {
            padding: 12px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.95rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: #e2e8f0;
            color: #4a5568;
        }

        .btn-secondary:hover {
            background: #cbd5e0;
            transform: translateY(-2px);
        }

        .tag {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            display: inline-block;
        }

        .loading {
            text-align: center;
            margin: 20px 0;
            color: #667eea;
        }

        .error-message {
            background: #fed7d7;
            color: #c53030;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }

        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 15px;
            }

            .content {
                padding: 30px 20px;
            }

            .article-title {
                font-size: 1.5rem;
            }

            .action-buttons {
                flex-direction: column;
            }

            .btn {
                justify-content: center;
            }
        }

        /* Loading animation */
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <?php if ($berita): ?>
            <!-- Success Content -->
            <div class="header">
                <h1>📰 Berita Fakultas</h1>
                <p>Anda akan dialihkan ke halaman lengkap...</p>
            </div>

            <div class="content">
                <article>
                    <h1 class="article-title"><?php echo $judul; ?></h1>

                    <div class="article-meta">
                        <div class="meta-item">
                            <span>👤</span>
                            <span><?php echo $penulis; ?></span>
                        </div>
                        <div class="meta-item">
                            <span>📅</span>
                            <span><?php echo $formatted_date; ?></span>
                        </div>
                        <div class="meta-item">
                            <span class="tag"><?php echo $tag; ?></span>
                        </div>
                    </div>

                    <?php if (!empty($gambar_berita)): ?>
                        <img src="<?php echo $image_url; ?>" alt="<?php echo $judul; ?>" class="article-image" loading="lazy">
                    <?php endif; ?>

                    <div class="article-content">
                        <p><?php echo $description; ?></p>
                    </div>

                    <div class="action-buttons">
                        <a href="<?php echo $app_url; ?>" class="btn btn-primary">
                            📖 Baca Selengkapnya
                        </a>
                        <a href="<?php echo $BASE_URL; ?>/berita" class="btn btn-secondary">
                            📋 Semua Berita
                        </a>
                    </div>
                </article>
            </div>

        <?php else: ?>
            <!-- Error Content -->
            <div class="header">
                <h1>⚠️ Berita Tidak Ditemukan</h1>
                <p>Maaf, terjadi kesalahan atau berita tidak tersedia</p>
            </div>

            <div class="content">
                <div class="error-message">
                    <p>Berita yang Anda cari tidak ditemukan atau mungkin telah dihapus.</p>
                </div>

                <div class="action-buttons">
                    <a href="<?php echo $BASE_URL; ?>/berita" class="btn btn-primary">
                        🏠 Kembali ke Beranda
                    </a>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Auto redirect script -->
    <script>
        // Show loading state
        const showLoading = () => {
            const buttons = document.querySelector('.action-buttons');
            if (buttons) {
                buttons.innerHTML = `
                    <div class="loading">
                        <div class="spinner"></div>
                        <p style="margin-top: 15px;">Mengalihkan ke halaman berita...</p>
                    </div>
                `;
            }
        };

        // Redirect function
        const redirectToApp = () => {
            <?php if ($berita): ?>
                showLoading();
                setTimeout(() => {
                    window.location.href = '<?php echo $app_url; ?>';
                }, 1500);
            <?php endif; ?>
        };

        // Auto redirect after page load (except for crawlers)
        window.addEventListener('load', () => {
            // Don't redirect if preview parameter exists
            if (window.location.search.includes('preview=1')) {
                return;
            }

            // Check if user agent is likely a real browser
            const userAgent = navigator.userAgent.toLowerCase();
            const isCrawler = (
                userAgent.includes('facebook') ||
                userAgent.includes('twitter') ||
                userAgent.includes('whatsapp') ||
                userAgent.includes('linkedin') ||
                userAgent.includes('googlebot') ||
                userAgent.includes('bot')
            );

            if (!isCrawler) {
                redirectToApp();
            }
        });

        // Manual redirect on button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary')) {
                e.preventDefault();
                redirectToApp();
            }
        });

        // Debug info for development
        <?php if (isset($_GET['debug'])): ?>
            console.log('Debug Info:', {
                berita_id: <?php echo $berita_id; ?>,
                berita_tag: '<?php echo $berita_tag; ?>',
                user_agent: navigator.userAgent,
                is_crawler: <?php echo $is_crawler ? 'true' : 'false'; ?>,
                current_url: '<?php echo $current_url; ?>',
                app_url: '<?php echo $app_url; ?>',
                image_url: '<?php echo $image_url; ?>'
            });
        <?php endif; ?>
    </script>

    <!-- No JavaScript fallback -->
    <noscript>
        <meta http-equiv="refresh" content="3;url=<?php echo $app_url; ?>">
        <style>
            .loading {
                display: block !important;
            }
        </style>
    </noscript>
</body>

</html>