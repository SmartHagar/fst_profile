<?php

// Tambahkan di awal file setelah opening PHP tag
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log semua environment
if (isset($_GET['debug'])) {
    error_log("=== BERITA DEBUG START ===");
    error_log("REQUEST_URI: " . ($_SERVER['REQUEST_URI'] ?? 'N/A'));
    error_log("SCRIPT_NAME: " . ($_SERVER['SCRIPT_NAME'] ?? 'N/A'));
    error_log("QUERY_STRING: " . ($_SERVER['QUERY_STRING'] ?? 'N/A'));
    error_log("DOCUMENT_ROOT: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'N/A'));
    error_log("Current working directory: " . getcwd());
    error_log("=== BERITA DEBUG END ===");
}


// Configuration
$BASE_URL = "https://fstuogp.com";
$API_URL = "https://admin.fstuogp.com";
$APP_URL = "/berita/detail";

// Debug function
function debug_log($message, $data = null)
{
    if (isset($_GET['debug'])) {
        error_log("BERITA DEBUG: $message" . ($data ? " - " . json_encode($data) : ""));
    }
}

// Enhanced parameter extraction
function extractParameters()
{
    $berita_id = 0;
    $berita_tag = '';

    // Method 1: Query parameters (?id=X&tag=Y)
    if (isset($_GET['id']) && isset($_GET['tag'])) {
        $berita_id = (int)$_GET['id'];
        $berita_tag = $_GET['tag'];
        debug_log("Method 1 - Query params", ['id' => $berita_id, 'tag' => $berita_tag]);
        return [$berita_id, $berita_tag];
    }

    // Method 2: Path parameters from .htaccess rewrite (/berita/27/tag-here)
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    $path = parse_url($request_uri, PHP_URL_PATH);

    // Pattern: /berita/ID/TAG or /berita-detail.php with rewritten params
    if (preg_match('#^/berita/(\d+)/([^/?]+)#', $path, $matches)) {
        $berita_id = (int)$matches[1];
        $berita_tag = $matches[2];
        debug_log("Method 2 - Path params", ['id' => $berita_id, 'tag' => $berita_tag]);
        return [$berita_id, $berita_tag];
    }

    // Method 3: Check if running from Next.js route and extract from URL
    if (preg_match('#/berita/detail.*[?&]id=(\d+).*[?&]tag=([^&]+)#', $request_uri, $matches)) {
        $berita_id = (int)$matches[1];
        $berita_tag = urldecode($matches[2]);
        debug_log("Method 3 - Next.js route", ['id' => $berita_id, 'tag' => $berita_tag]);
        return [$berita_id, $berita_tag];
    }

    // Method 4: Check $_SERVER['QUERY_STRING'] directly
    $query_string = $_SERVER['QUERY_STRING'] ?? '';
    if (
        preg_match('/id=(\d+)/', $query_string, $id_matches) &&
        preg_match('/tag=([^&]+)/', $query_string, $tag_matches)
    ) {
        $berita_id = (int)$id_matches[1];
        $berita_tag = urldecode($tag_matches[1]);
        debug_log("Method 4 - Query string direct", ['id' => $berita_id, 'tag' => $berita_tag]);
        return [$berita_id, $berita_tag];
    }

    debug_log("No parameters found", ['request_uri' => $request_uri, 'query_string' => $query_string]);
    return [0, ''];
}

// Enhanced API call with better error handling
function fetchBeritaData($berita_id, $berita_tag)
{
    global $API_URL;

    if (!$berita_id || !$berita_tag) {
        debug_log("Invalid parameters for API call");
        return null;
    }

    $api_url = $API_URL . "/json/berita/detail/" . $berita_id . "/" . urlencode($berita_tag);
    debug_log("API URL", $api_url);

    // Enhanced context with more options
    $context = stream_context_create([
        'http' => [
            'timeout' => 15,
            'method' => 'GET',
            'header' => [
                'Content-Type: application/json',
                'User-Agent: Mozilla/5.0 (compatible; BeritaCrawler/1.0)',
                'Accept: application/json, text/plain, */*',
                'Accept-Language: id-ID,id;q=0.9,en;q=0.8',
                'Cache-Control: no-cache',
                'Pragma: no-cache'
            ],
            'ignore_errors' => true
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ]
    ]);

    try {
        $response = @file_get_contents($api_url, false, $context);

        if ($response === false) {
            $error = error_get_last();
            debug_log("API call failed", $error);
            return null;
        }

        debug_log("API Response length", strlen($response));

        $berita = json_decode($response, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            debug_log("JSON decode error", json_last_error_msg());
            return null;
        }

        if (!$berita || !isset($berita['id'])) {
            debug_log("Invalid berita data", $berita);
            return null;
        }

        debug_log("API call successful", ['id' => $berita['id'], 'title' => substr($berita['judul'] ?? '', 0, 50)]);
        return $berita;
    } catch (Exception $e) {
        debug_log("Exception during API call", $e->getMessage());
        return null;
    }
}

// Check if user is a crawler/bot
function isCrawler()
{
    $user_agent = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
    return (
        strpos($user_agent, 'facebookexternalhit') !== false ||
        strpos($user_agent, 'twitterbot') !== false ||
        strpos($user_agent, 'whatsapp') !== false ||
        strpos($user_agent, 'linkedinbot') !== false ||
        strpos($user_agent, 'googlebot') !== false ||
        strpos($user_agent, 'bingbot') !== false ||
        strpos($user_agent, 'slackbot') !== false ||
        strpos($user_agent, 'telegrambot') !== false ||
        strpos($user_agent, 'bot') !== false ||
        strpos($user_agent, 'crawler') !== false ||
        strpos($user_agent, 'spider') !== false
    );
}

// Check if should show preview (don't redirect)
function shouldShowPreview()
{
    return (
        isset($_GET['preview']) ||
        isset($_GET['debug']) ||
        isCrawler()
    );
}

// Get parameters
list($berita_id, $berita_tag) = extractParameters();

debug_log("Extracted parameters", ['id' => $berita_id, 'tag' => $berita_tag]);
debug_log("User Agent", $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown');
debug_log("Is Crawler", isCrawler());
debug_log("Should Show Preview", shouldShowPreview());

// Validate parameters
if (!$berita_id || !$berita_tag) {
    debug_log("Redirecting due to invalid parameters");
    if (!isset($_GET['debug'])) {
        header("Location: $BASE_URL/berita");
        exit;
    }
}

// Fetch berita data from API
$berita = fetchBeritaData($berita_id, $berita_tag);
$error = ($berita === null);

// If API fails and not in preview mode, redirect to app
if ($error && !shouldShowPreview()) {
    $app_url = $BASE_URL . $APP_URL . "?id=$berita_id&tag=" . urlencode($berita_tag);
    debug_log("API failed, redirecting to app", $app_url);
    header("Location: $app_url");
    exit;
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

    debug_log("Meta data prepared", [
        'title' => substr($judul, 0, 50),
        'description' => substr($description, 0, 50),
        'image_url' => $image_url,
        'current_url' => $current_url,
        'app_url' => $app_url
    ]);
} else {
    // Fallback data
    $judul = "Berita Tidak Ditemukan";
    $description = "Maaf, berita yang Anda cari tidak ditemukan atau tidak tersedia.";
    $image_url = $BASE_URL . "/images/default-news.jpg";
    $current_url = $BASE_URL . "/berita-detail.php?id=$berita_id&tag=" . urlencode($berita_tag);
    $app_url = $BASE_URL . "/berita";
    $penulis = "Admin";
    $tag = $berita_tag;
    $tgl_terbit = date('Y-m-d');

    debug_log("Using fallback data");
}

// Check if we should redirect to app
$should_redirect = !shouldShowPreview() && $berita;

// If not a crawler/debug/preview and berita exists, redirect to app
if ($should_redirect) {
    debug_log("Redirecting to app");
    header("Location: $app_url");
    exit;
}

// Format date
$formatted_date = date('d F Y', strtotime($tgl_terbit));
$iso_date = date('c', strtotime($tgl_terbit));

debug_log("Page rendering", [
    'is_crawler' => isCrawler(),
    'has_berita' => !!$berita,
    'should_redirect' => $should_redirect,
    'preview_mode' => shouldShowPreview()
]);
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

    <!-- CSS styles remain the same as original -->
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

        .debug-info {
            background: #f7fafc;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            font-family: monospace;
            font-size: 0.8rem;
            color: #4a5568;
            border: 1px solid #e2e8f0;
        }

        .debug-info h3 {
            margin-top: 0;
            color: #2d3748;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .debug-info pre {
            margin: 10px 0;
            white-space: pre-wrap;
            word-wrap: break-word;
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

        .preview-notice {
            background: #edf2ae;
            border: 1px solid #c6d84f;
            color: #5a6b0b;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <?php if (isset($_GET['debug'])): ?>
            <div class="debug-info">
                <h3>🔍 Debug Information</h3>
                <pre>
Request URI: <?php echo $_SERVER['REQUEST_URI'] ?? 'N/A'; ?>
Query String: <?php echo $_SERVER['QUERY_STRING'] ?? 'N/A'; ?>
User Agent: <?php echo substr($_SERVER['HTTP_USER_AGENT'] ?? 'N/A', 0, 100); ?>...
                    
Is Crawler: <?php echo isCrawler() ? '✅ Yes' : '❌ No'; ?>
Should Show Preview: <?php echo shouldShowPreview() ? '✅ Yes' : '❌ No'; ?>
Should Redirect: <?php echo $should_redirect ? '✅ Yes' : '❌ No'; ?>

Berita ID: <?php echo $berita_id; ?>
Berita Tag: <?php echo $berita_tag; ?>

API URL: <?php echo $API_URL . "/json/berita/detail/" . $berita_id . "/" . urlencode($berita_tag); ?>
API Response: <?php echo $berita ? '✅ Success' : '❌ Failed'; ?>
Has Berita Data: <?php echo $berita ? '✅ Yes' : '❌ No'; ?>

Current URL: <?php echo $current_url; ?>
App URL: <?php echo $app_url; ?>
Image URL: <?php echo $image_url; ?>

Preview Parameters:
- debug=<?php echo isset($_GET['debug']) ? $_GET['debug'] : 'not set'; ?>
- preview=<?php echo isset($_GET['preview']) ? $_GET['preview'] : 'not set'; ?>
                </pre>
            </div>
        <?php endif; ?>

        <?php if (isset($_GET['preview']) || isset($_GET['debug'])): ?>
            <div class="preview-notice">
                <strong>🔍 Preview Mode</strong> - Automatic redirect disabled
            </div>
        <?php endif; ?>

        <?php if ($berita): ?>
            <!-- Success Content -->
            <div class="header">
                <h1>📰 Berita Fakultas</h1>
                <p>
                    <?php if (!isset($_GET['preview']) && !isset($_GET['debug'])): ?>
                        Anda akan dialihkan ke halaman lengkap...
                    <?php else: ?>
                        Preview mode - Meta tags loaded successfully
                    <?php endif; ?>
                </p>
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
                    <?php if (isset($_GET['debug'])): ?>
                        <p><small>Debug: ID=<?php echo $berita_id; ?>, Tag=<?php echo $berita_tag; ?></small></p>
                    <?php endif; ?>
                </div>

                <div class="action-buttons">
                    <a href="<?php echo $BASE_URL; ?>/berita" class="btn btn-primary">
                        🏠 Kembali ke Beranda
                    </a>
                    <a href="<?php echo $app_url; ?>" class="btn btn-secondary">
                        🔄 Coba Lagi
                    </a>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Auto redirect script (only if not in preview/debug mode) -->
    <script>
        const isDebugMode = <?php echo isset($_GET['debug']) ? 'true' : 'false'; ?>;
        const isPreviewMode = <?php echo isset($_GET['preview']) ? 'true' : 'false'; ?>;
        const hasBerita = <?php echo $berita ? 'true' : 'false'; ?>;

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

        const redirectToApp = () => {
            if (hasBerita && !isDebugMode && !isPreviewMode) {
                showLoading();
                setTimeout(() => {
                    window.location.href = '<?php echo $app_url; ?>';
                }, 1500);
            }
        };

        window.addEventListener('load', () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isCrawler = (
                userAgent.includes('facebook') ||
                userAgent.includes('twitter') ||
                userAgent.includes('whatsapp') ||
                userAgent.includes('linkedin') ||
                userAgent.includes('googlebot') ||
                userAgent.includes('bot') ||
                userAgent.includes('crawler') ||
                userAgent.includes('spider')
            );

            // Only redirect if not crawler, not debug, not preview
            if (!isCrawler && !isDebugMode && !isPreviewMode) {
                redirectToApp();
            }
        });

        // Handle manual click on "Baca Selengkapnya"
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary') && !isDebugMode && !isPreviewMode) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    window.location.href = '<?php echo $app_url; ?>';
                }, 500);
            }
        });

        // Debug console logging
        <?php if (isset($_GET['debug'])): ?>
            console.log('🔍 Debug Info:', {
                berita_id: <?php echo $berita_id; ?>,
                berita_tag: '<?php echo $berita_tag; ?>',
                user_agent: navigator.userAgent,
                is_crawler: <?php echo isCrawler() ? 'true' : 'false'; ?>,
                should_show_preview: <?php echo shouldShowPreview() ? 'true' : 'false'; ?>,
                current_url: '<?php echo $current_url; ?>',
                app_url: '<?php echo $app_url; ?>',
                image_url: '<?php echo $image_url; ?>',
                has_berita: <?php echo $berita ? 'true' : 'false'; ?>,
                debug_mode: isDebugMode,
                preview_mode: isPreviewMode
            });

            // Log API response if available
            <?php if ($berita): ?>
                console.log('📰 Berita Data:', <?php echo json_encode($berita); ?>);
            <?php endif; ?>
        <?php endif; ?>
    </script>

    <?php if (!isset($_GET['debug']) && !isset($_GET['preview'])): ?>
        <noscript>
            <meta http-equiv="refresh" content="3;url=<?php echo $app_url; ?>">
        </noscript>
    <?php endif; ?>
</body>

</html>