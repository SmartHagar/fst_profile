<?php

/** @format */
// berita-detail.php - SEO handler untuk social media sharing

// Error reporting untuk debugging (hapus di production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Configuration
$config = [
    'BASE_URL' => 'https://fstuogp.com',      // Domain utama Anda
    'API_URL' => 'https://admin.fstuogp.com',  // API backend
    'APP_PATH' => '/berita/detail',            // Path di Next.js app (tanpa /out)
    'DEFAULT_IMAGE' => '/images/default-news.jpg',
    'API_TIMEOUT' => 10,
    'CACHE_TIME' => 3600 // 1 jam
];

// Get and validate parameters
$berita_id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
$berita_tag = $_GET['tag'] ?? ''; // Don't use FILTER_SANITIZE_STRING as it may alter the tag
$is_preview = filter_input(INPUT_GET, 'preview', FILTER_VALIDATE_BOOLEAN);

// Clean tag but preserve original format
$berita_tag = trim($berita_tag);

// Log untuk debugging (comment di production)
// file_put_contents('berita-debug.log', date('Y-m-d H:i:s') . " - ID: $berita_id, Tag: $berita_tag\n", FILE_APPEND);

// Validate required parameters
if (!$berita_id || !$berita_tag) {
    header("HTTP/1.1 404 Not Found");
    header("Location: {$config['BASE_URL']}/berita/");
    exit;
}

// Function to detect crawlers
function isCrawler($userAgent = null)
{
    if (!$userAgent) {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    }

    $crawlers = [
        'facebookexternalhit',
        'Facebot',
        'Twitterbot',
        'WhatsApp',
        'LinkedInBot',
        'Googlebot',
        'bingbot',
        'Slackbot',
        'Telegrambot',
        'SkypeUriPreview',
        'Discordbot',
        'embedly',
        'quora link preview',
        'outbrain',
        'pinterest',
        'vkShare'
    ];

    foreach ($crawlers as $crawler) {
        if (stripos($userAgent, $crawler) !== false) {
            return true;
        }
    }

    return false;
}

// Function to fetch data from API with caching
function fetchBeritaData($api_url, $cache_key, $cache_time)
{
    // Try cache first
    $cache_file = sys_get_temp_dir() . '/berita_cache_' . md5($cache_key) . '.json';

    if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_time)) {
        $cached_data = file_get_contents($cache_file);
        return json_decode($cached_data, true);
    }

    // Fetch from API
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'method' => 'GET',
            'header' => [
                'Accept: application/json',
                'User-Agent: BeritaCrawler/1.0'
            ],
            'ignore_errors' => true
        ]
    ]);

    $response = @file_get_contents($api_url, false, $context);

    if ($response !== false) {
        $data = json_decode($response, true);

        // Cache successful response
        if ($data && isset($data['id'])) {
            @file_put_contents($cache_file, $response);
            return $data;
        }
    }

    return null;
}

// Initialize variables
$berita = null;
$error = false;

// Build API URL
$api_endpoint = $config['API_URL'] . "/json/berita/detail/" . $berita_id . "/" . $berita_tag;
$cache_key = "berita_{$berita_id}_{$berita_tag}";

// Fetch berita data
try {
    $berita = fetchBeritaData($api_endpoint, $cache_key, $config['CACHE_TIME']);

    // Debug logging
    if (isset($_GET['debug'])) {
        header('Content-Type: text/plain');
        echo "API Endpoint: " . $api_endpoint . "\n";
        echo "Response: " . print_r($berita, true) . "\n";
        exit;
    }

    if (!$berita || !isset($berita['id'])) {
        $error = true;
        // Log untuk debugging
        error_log("Berita fetch failed - ID: $berita_id, Tag: $berita_tag, Response: " . json_encode($berita));

        // Special handling for Facebook crawler
        if ($is_crawler && $berita_id && $berita_tag) {
            // Try alternative API endpoints or create fallback
            error_log("Facebook crawler detected with no data, creating fallback");

            // Create minimal valid data for crawler
            $berita = [
                'id' => $berita_id,
                'judul' => 'Berita Fakultas Sains & Teknologi',
                'isi_berita' => 'Klik untuk membaca berita lengkap di website Fakultas Sains & Teknologi.',
                'gambar_berita' => '',
                'penulis' => 'Admin FST',
                'tag' => $berita_tag,
                'tgl_terbit' => date('Y-m-d')
            ];
            $error = false;
        }
    }
} catch (Exception $e) {
    $error = true;
    error_log("Berita fetch error: " . $e->getMessage());
}

// Prepare meta data
if ($berita && !$error) {
    // Extract and clean data
    $judul = htmlspecialchars($berita['judul'] ?? 'Berita', ENT_QUOTES, 'UTF-8');
    $isi_berita = $berita['isi_berita'] ?? '';
    $gambar_berita = $berita['gambar_berita'] ?? '';
    $penulis = htmlspecialchars($berita['penulis'] ?? 'Admin', ENT_QUOTES, 'UTF-8');
    $tag = htmlspecialchars($berita['tag'] ?? $berita_tag, ENT_QUOTES, 'UTF-8');
    $tgl_terbit = $berita['tgl_terbit'] ?? date('Y-m-d');

    // Clean description - remove HTML and truncate
    $description = strip_tags($isi_berita);
    $description = preg_replace('/\s+/', ' ', $description);
    $description = trim($description);

    // Smart truncate - jangan potong di tengah kata
    if (mb_strlen($description, 'UTF-8') > 160) {
        $description = mb_substr($description, 0, 160, 'UTF-8');
        $last_space = mb_strrpos($description, ' ', 0, 'UTF-8');
        if ($last_space !== false) {
            $description = mb_substr($description, 0, $last_space, 'UTF-8');
        }
        $description .= '...';
    }
    $description = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');

    // Build image URL
    if (!empty($gambar_berita)) {
        // Handle relative vs absolute paths
        if (strpos($gambar_berita, 'http') !== 0) {
            $image_url = $config['API_URL'] . "/storage/" . ltrim($gambar_berita, '/');
        } else {
            $image_url = $gambar_berita;
        }
    } else {
        $image_url = $config['BASE_URL'] . $config['DEFAULT_IMAGE'];
    }

    // Build URLs
    $current_url = $config['BASE_URL'] . $config['APP_PATH'] . "/?id={$berita_id}&tag=" . $berita_tag;
    $canonical_url = $current_url; // Atau gunakan URL SEO-friendly jika ada

    // Format dates
    $formatted_date = date('d F Y', strtotime($tgl_terbit));
    $iso_date = date('c', strtotime($tgl_terbit));
} else {
    // Fallback data untuk error
    $judul = "Berita Tidak Ditemukan";
    $description = "Maaf, berita yang Anda cari tidak ditemukan atau tidak tersedia.";
    $image_url = $config['BASE_URL'] . $config['DEFAULT_IMAGE'];
    $current_url = $config['BASE_URL'] . $config['APP_PATH'] . "/?id={$berita_id}&tag=" . $berita_tag;
    $canonical_url = $config['BASE_URL'] . "/berita/";
    $penulis = "Admin";
    $tag = $berita_tag;
    $formatted_date = date('d F Y');
    $iso_date = date('c');
}

// Check if request is from crawler
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$is_crawler = isCrawler($user_agent);

// If not crawler and not preview mode, redirect to app
if (!$is_crawler && !$is_preview && $berita && !$error) {
    header("Location: " . $current_url);
    exit;
}

// Set appropriate cache headers
if (!$error) {
    header('Cache-Control: public, max-age=3600'); // Cache for 1 hour
} else {
    header('Cache-Control: no-cache, must-revalidate');
}

?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary Meta Tags -->
    <title><?php echo $judul; ?> | Fakultas Sains & Teknologi</title>
    <meta name="title" content="<?php echo $judul; ?> | Fakultas Sains & Teknologi">
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="keywords" content="<?php echo $tag; ?>, berita, fakultas sains teknologi, universitas, <?php echo $penulis; ?>">
    <meta name="author" content="<?php echo $penulis; ?>">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="language" content="Indonesian">

    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo $canonical_url; ?>">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="<?php echo $current_url; ?>">
    <meta property="og:title" content="<?php echo $judul; ?>">
    <meta property="og:description" content="<?php echo $description; ?>">
    <meta property="og:image" content="<?php echo $image_url; ?>">
    <meta property="og:image:secure_url" content="<?php echo str_replace('http://', 'https://', $image_url); ?>">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="<?php echo $judul; ?>">
    <meta property="og:site_name" content="Fakultas Sains & Teknologi">
    <meta property="og:locale" content="id_ID">

    <!-- Article specific -->
    <meta property="article:published_time" content="<?php echo $iso_date; ?>">
    <meta property="article:modified_time" content="<?php echo $iso_date; ?>">
    <meta property="article:author" content="<?php echo $penulis; ?>">
    <meta property="article:section" content="<?php echo $tag; ?>">
    <meta property="article:tag" content="<?php echo $tag; ?>">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="<?php echo $current_url; ?>">
    <meta name="twitter:title" content="<?php echo $judul; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image" content="<?php echo $image_url; ?>">
    <meta name="twitter:image:alt" content="<?php echo $judul; ?>">
    <meta name="twitter:site" content="@fstuogp">
    <meta name="twitter:creator" content="@fstuogp">

    <!-- WhatsApp & Telegram specific -->
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:updated_time" content="<?php echo $iso_date; ?>">

    <!-- Structured Data -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "<?php echo $current_url; ?>"
            },
            "headline": "<?php echo addslashes($judul); ?>",
            "description": "<?php echo addslashes($description); ?>",
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
                    "url": "<?php echo $config['BASE_URL']; ?>/images/logo.png",
                    "width": 200,
                    "height": 60
                }
            },
            "articleSection": "<?php echo addslashes($tag); ?>",
            "keywords": "<?php echo addslashes($tag); ?>"
        }
    </script>

    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="<?php echo $config['API_URL']; ?>">
    <link rel="dns-prefetch" href="<?php echo $config['API_URL']; ?>">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo $config['BASE_URL']; ?>/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $config['BASE_URL']; ?>/apple-touch-icon.png">

    <!-- Minimal CSS for crawler preview -->
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            line-height: 1.3;
        }

        .meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 20px;
        }

        .content {
            color: #444;
            margin: 20px 0;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 20px 0;
        }

        .loading {
            text-align: center;
            padding: 50px;
            color: #666;
        }

        .error {
            background: #fee;
            padding: 20px;
            border-radius: 8px;
            color: #c00;
            text-align: center;
        }
    </style>

    <?php if (!$error && !$is_crawler && !$is_preview): ?>
        <!-- Auto redirect for non-crawlers -->
        <meta http-equiv="refresh" content="0;url=<?php echo htmlspecialchars($current_url); ?>">
    <?php endif; ?>
</head>

<body>
    <div class="container">
        <?php if (!$error && $berita): ?>
            <article>
                <h1><?php echo $judul; ?></h1>
                <div class="meta">
                    <span>Oleh <?php echo $penulis; ?></span> •
                    <time datetime="<?php echo $iso_date; ?>"><?php echo $formatted_date; ?></time> •
                    <span><?php echo $tag; ?></span>
                </div>

                <?php if (!empty($gambar_berita)): ?>
                    <img src="<?php echo $image_url; ?>" alt="<?php echo $judul; ?>" loading="lazy">
                <?php endif; ?>

                <div class="content">
                    <p><?php echo $description; ?></p>
                </div>

                <?php if (!$is_crawler): ?>
                    <div class="loading">
                        <p>Mengalihkan ke halaman lengkap...</p>
                    </div>
                <?php endif; ?>
            </article>
        <?php else: ?>
            <div class="error">
                <h1>Berita Tidak Ditemukan</h1>
                <p><?php echo $description; ?></p>
            </div>
        <?php endif; ?>
    </div>

    <?php if (!$is_crawler && !$is_preview && !$error): ?>
        <script>
            // Immediate redirect for JavaScript-enabled browsers
            window.location.replace('<?php echo $current_url; ?>');
        </script>
    <?php endif; ?>
</body>

</html>