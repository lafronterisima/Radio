<?php

function getShoutcastMetadata($radioip, $radioport, $postfix = "GET /7.html HTTP/1.1\nUser-Agent:Mozilla\n\n") {
    $open = @fsockopen($radioip, $radioport, $errno, $errstr, 0.5); 
    if ($open) {
        fputs($open, $postfix);
        stream_set_timeout($open, 1);
        $read = fread($open, 1024); // Aumenté el tamaño del buffer para capturar más datos
        fclose($open);
        if (empty($read) || strpos($read, '</body></html>') !== false) {
            return 'Streaming'; // Cambié 'streaming' a 'Streaming' para ser coherente con 'No metadata found'
        } else {
            $exploded = explode(',', $read);
            return str_replace('</body></html>', '', $exploded[6]);
        }
    } else {
        return false;
    }
}

function getIcecastMetadata($streamingUrl) {
    $ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36';
    $opts = [
        'http' => [
            'method' => 'GET',
            'header' => 'Icy-MetaData: 1',
            'user_agent' => $ua
        ]
    ];

    $headers = get_headers($streamingUrl, 1); 
    $interval = isset($headers['Icy-MetaInt']) ? $headers['Icy-MetaInt'] : 0; // Añadí una verificación de existencia de la clave

    $context = stream_context_create($opts);
    if ($stream = fopen($streamingUrl, 'r', false, $context)) {
        $buffer = stream_get_contents($stream, $interval);
        fclose($stream);
        if (strpos($buffer, 'StreamTitle=') !== false) {
            $title = explode('StreamTitle=', $buffer)[1];
            return substr($title, 1, strpos($title, ';') - 2);
        } else {
            return 'No metadata found';
        }
    } else {
        throw new Exception("Unable to open stream [{$streamingUrl}]");
    }
}

$streamingUrl = "http://stream.zeno.fm/672xk039ptzuv";
$shoutcastID = getShoutcastMetadata("stream.zeno.fm", 8000);
$icecastID = getIcecastMetadata($streamingUrl);

echo "Shoutcast Metadata: $shoutcastID\n";
echo "Icecast Metadata: $icecastID\n";
?>



