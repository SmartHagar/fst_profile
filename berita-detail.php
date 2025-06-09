<?php

/** @format */
// debug-berita-detail.php - File debug untuk troubleshoot masalah

// Configuration
$BASE_URL = "https://fstuogp.com"; // Ganti dengan domain Anda
$API_URL = "https://admin.fstuogp.com";     // Ganti dengan API endpoint Anda

// Get parameters
$berita_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$berita_tag = isset($_GET['tag']) ? $_GET['tag'] : '';

// Debug info
$debug_info = [
    'request_uri' => $_SERVER['REQUEST_URI'] ?? '',
    'query_string' => $_SERVER['QUERY_STRING'] ?? '',
    'http_host' => $_SERVER['HTTP_HOST'] ?? '',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
    'berita_id' => $berita_id,
    'berita_tag' => $berita_tag,
    'get_params' => $_GET,
    'server_vars' => [
        'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? '',
        'SCRIPT_NAME' => $_SERVER['SCRIPT_NAME'] ?? '',
        'PATH_INFO' => $_SERVER['PATH_INFO'] ?? '',
    ]
];

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

// Generate correct URLs
$app_url_correct = $BASE_URL . "/out/berita/detail?id=$berita_id&tag=" . urlencode($berita_tag);
$berita_list_url = $BASE_URL . "/out/berita";
$home_url = $BASE_URL . "/out/";

?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Debug Berita Detail - Troubleshooting</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
        }

        .debug-section {
            background: #f8f9fa;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            border-left: 4px solid #007bff;
        }

        .error {
            border-left-color: #dc3545;
            background: #f8d7da;
        }

        .success {
            border-left-color: #28a745;
            background: #d4edda;
        }

        .warning {
            border-left-color: #ffc107;
            background: #fff3cd;
        }

        pre {
            background: #e9ecef;
            padding: 10px;
            border-radius: 3px;
            overflow-x: auto;
        }

        .btn {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
        }

        .btn-primary {
            background: #007bff;
            color: white;
        }

        .btn-success {
            background: #28a745;
            color: white;
        }

        .btn-warning {
            background: #ffc107;
            color: black;
        }

        .btn-danger {
            background: #dc3545;
            color: white;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🐛 Debug Berita Detail</h1>

        <!-- Basic Info -->
        <div class="debug-section">
            <h3>📋 Basic Information</h3>
            <p><strong>Current URL:</strong> <?php echo htmlspecialchars($_SERVER['REQUEST_URI'] ?? ''); ?></p>
            <p><strong>Berita ID:</strong> <?php echo $berita_id; ?></p>
            <p><strong>Berita Tag:</strong> <?php echo htmlspecialchars($berita_tag); ?></p>
            <p><strong>Is Crawler:</strong> <?php echo $is_crawler ? 'Yes' : 'No'; ?></p>
            <p><strong>User Agent:</strong> <?php echo htmlspecialchars(substr($user_agent, 0, 100)); ?>...</p>
        </div>

        <!-- Parameter Validation -->
        <div class="debug-section <?php echo ($berita_id && $berita_tag) ? 'success' : 'error'; ?>">
            <h3>✅ Parameter Validation</h3>
            <?php if ($berita_id && $berita_tag): ?>
                <p>✅ Parameters are valid</p>
                <p>✅ ID: <?php echo $berita_id; ?></p>
                <p>✅ Tag: <?php echo htmlspecialchars($berita_tag); ?></p>
            <?php else: ?>
                <p>❌ Missing or invalid parameters</p>
                <p>ID: <?php echo $berita_id ?: 'MISSING'; ?></p>
                <p>Tag: <?php echo $berita_tag ?: 'MISSING'; ?></p>
            <?php endif; ?>
        </div>

        <!-- URL Testing -->
        <div class="debug-section">
            <h3>🔗 URL Testing</h3>
            <p><strong>Correct App URL:</strong></p>
            <p><code><?php echo htmlspecialchars($app_url_correct); ?></code></p>

            <div style="margin-top: 15px;">
                <a href="<?php echo $app_url_correct; ?>" class="btn btn-primary" target="_blank">
                    Test App URL
                </a>
                <a href="<?php echo $berita_list_url; ?>" class="btn btn-success" target="_blank">
                    Go to Berita List
                </a>
                <a href="<?php echo $home_url; ?>" class="btn btn-warning" target="_blank">
                    Go to Homepage
                </a>
            </div>
        </div>

        <!-- API Test -->
        <div class="debug-section">
            <h3>🌐 API Test</h3>
            <?php if ($berita_id && $berita_tag): ?>
                <?php
                $api_url = $API_URL . "/json/berita/detail/" . $berita_id . "/" . urlencode($berita_tag);
                $api_test_result = "API URL: " . $api_url;

                // Test API call
                $context = stream_context_create([
                    'http' => [
                        'timeout' => 10,
                        'method' => 'GET',
                        'header' => [
                            'Content-Type: application/json',
                            'User-Agent: Mozilla/5.0 (DebugBot/1.0)'
                        ]
                    ]
                ]);

                $api_response = @file_get_contents($api_url, false, $context);
                $api_success = $api_response !== false;
                ?>

                <div class="<?php echo $api_success ? 'success' : 'error'; ?>" style="padding: 10px; margin: 10px 0; border-radius: 5px;">
                    <p><strong>API URL:</strong> <code><?php echo htmlspecialchars($api_url); ?></code></p>
                    <p><strong>Status:</strong> <?php echo $api_success ? '✅ Success' : '❌ Failed'; ?></p>

                    <?php if ($api_success): ?>
                        <?php
                        $berita_data = json_decode($api_response, true);
                        if ($berita_data && isset($berita_data['judul'])):
                        ?>
                            <p><strong>Title:</strong> <?php echo htmlspecialchars($berita_data['judul']); ?></p>
                            <p><strong>Author:</strong> <?php echo htmlspecialchars($berita_data['penulis'] ?? 'N/A'); ?></p>
                        <?php else: ?>
                            <p>⚠️ API responded but data format is invalid</p>
                        <?php endif; ?>
                    <?php else: ?>
                        <p>❌ Cannot connect to API. Check:</p>
                        <ul>
                            <li>API URL is correct</li>
                            <li>Berita ID exists</li>
                            <li>Network connectivity</li>
                            <li>API server is running</li>
                        </ul>
                    <?php endif; ?>
                </div>

                <a href="<?php echo $api_url; ?>" class="btn btn-primary" target="_blank">
                    Test API Direct
                </a>
            <?php else: ?>
                <p class="error">Cannot test API without valid parameters</p>
            <?php endif; ?>
        </div>

        <!-- Full Debug Data -->
        <details>
            <summary>
                <h3>🔍 Full Debug Data (Click to expand)</h3>
            </summary>
            <div class="debug-section">
                <pre><?php echo htmlspecialchars(json_encode($debug_info, JSON_PRETTY_PRINT)); ?></pre>
            </div>
        </details>

        <!-- Troubleshooting Guide -->
        <div class="debug-section warning">
            <h3>🛠️ Common Issues & Solutions</h3>

            <h4>❌ Redirected to /out/dashboard/</h4>
            <ul>
                <li><strong>Check .htaccess rules</strong> - Make sure redirect rules are correct</li>
                <li><strong>Check Next.js routing</strong> - Ensure /berita/detail route exists</li>
                <li><strong>Check basePath config</strong> - Verify next.config.js basePath setting</li>
                <li><strong>Clear browser cache</strong> - Old redirects might be cached</li>
            </ul>

            <h4>❌ Parameters not working</h4>
            <ul>
                <li>Ensure URL format: <code>/out/berita/detail?id=123&tag=teknologi</code></li>
                <li>Check URL encoding for special characters in tag</li>
                <li>Verify ID is numeric</li>
            </ul>

            <h4>❌ PHP file not loading</h4>
            <ul>
                <li>Check file permissions (644)</li>
                <li>Ensure PHP is enabled on hosting</li>
                <li>Check .htaccess syntax</li>
            </ul>
        </div>

        <!-- Manual Testing -->
        <div class="debug-section">
            <h3>🧪 Manual Testing</h3>
            <p>Test these URLs manually:</p>

            <h4>1. Test Next.js App Directly:</h4>
            <p><code><?php echo $home_url; ?></code></p>

            <h4>2. Test Berita List:</h4>
            <p><code><?php echo $berita_list_url; ?></code></p>

            <h4>3. Test Berita Detail with Sample Data:</h4>
            <p><code><?php echo $BASE_URL; ?>/out/berita/detail?id=1&tag=teknologi</code></p>

            <h4>4. Test PHP File Direct:</h4>
            <p><code><?php echo $BASE_URL; ?>/berita-detail.php?id=1&tag=teknologi&preview=1</code></p>

            <h4>5. Test with Facebook Debugger:</h4>
            <p><a href="https://developers.facebook.com/tools/debug/" target="_blank">Facebook Debugger</a></p>
        </div>

        <!-- Next Steps -->
        <div class="debug-section">
            <h3>🎯 Next Steps</h3>
            <ol>
                <li>Fix any red ❌ issues above</li>
                <li>Test URLs manually in browser</li>
                <li>Check .htaccess rules</li>
                <li>Verify Next.js routing</li>
                <li>Test social media sharing</li>
            </ol>
        </div>
    </div>

    <script>
        // Auto refresh untuk real-time debugging
        console.log('Debug page loaded');
        console.log('Current URL:', window.location.href);
        console.log('Referrer:', document.referrer);

        // Test JavaScript navigation
        function testNavigation() {
            console.log('Testing navigation...');
            // Don't auto-redirect, let user test manually
        }

        // Add click tracking
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                console.log('Clicking link:', e.target.href);
            }
        });
    </script>
</body>

</html>