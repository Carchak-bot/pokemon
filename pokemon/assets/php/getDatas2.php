<?php
//
// Méthode avec curl
// On récupère le contenu envoyés par la méthode POST(le contenu du body) invoquée dans le fetch
$data = file_get_contents("php://input");
$url = "https://pokebuildapi.fr/api/v1/pokemon/".$data;
//On utilise la librairie Curl disponible nativement en PHP (vérifier son activation dans votre php.ini)
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
    "X-Custom-Header: header-value",
    "Content-Type: application/json"
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_HEADER, false);
$response = curl_exec($curl);
curl_close($curl);

echo $response;

?>
