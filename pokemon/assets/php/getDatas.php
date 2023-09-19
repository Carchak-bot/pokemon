<?php
//
// Méthode avec file_get_contents
$rest_api_url = "https://pokebuildapi.fr/api/v1/pokemon";
$json_data = file_get_contents($rest_api_url);
echo $json_data;

?>