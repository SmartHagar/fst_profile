<?php
// simple-test.php - Test sederhana untuk API
header('Content-Type: text/plain; charset=utf-8');

$id = 27;
$tag = 'fakultas-sains-teknologi-uogp-luluskan-14-sarjana-dalam-yudisium-semester-genap-20242025';

echo "=== SIMPLE API TEST ===\n\n";

// Test 1: Direct API call
$url1 = "https://admin.fstuogp.com/json/berita/detail/$id/$tag";
echo "Test 1 - Direct URL:\n$url1\n\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
if ($error) {
    echo "Error: $error\n";
} else {
    echo "Response Length: " . strlen($response) . " bytes\n";
    $data = json_decode($response, true);
    if ($data) {
        echo "JSON Valid: YES\n";
        echo "ID Found: " . (isset($data['id']) ? 'YES' : 'NO') . "\n";
        if (isset($data['judul'])) {
            echo "Title: " . $data['judul'] . "\n";
        }
    } else {
        echo "JSON Valid: NO\n";
        echo "First 200 chars: " . substr($response, 0, 200) . "\n";
    }
}

echo "\n\n=== SHARE URLs ===\n";
echo "Facebook Share URL:\n";
echo "https://fstuogp.com/berita/detail/?id=$id&tag=$tag\n\n";

echo "Direct PHP Test URL:\n";
echo "https://fstuogp.com/berita-detail.php?id=$id&tag=$tag&preview=1\n\n";

echo "Facebook Debugger:\n";
echo "https://developers.facebook.com/tools/debug/?q=" . urlencode("https://fstuogp.com/berita/detail/?id=$id&tag=$tag") . "\n";
