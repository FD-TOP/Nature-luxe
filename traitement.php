<?php
// On récupère les données JSON envoyées par script.js
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    $to = "email-de-ton-client@gmail.com";
    $subject = "Nouvelle commande Site Vitrine";
    
    $message = "Bonjour, vous avez reçu une commande :\n\n";
    foreach ($data['commande'] as $article) {
        $message .= "- " . $article['name'] . " | Quantité: " . $article['qty'] . " | Prix: " . $article['price'] . "€\n";
    }
    $message .= "\nTOTAL A RÉGLER : " . $data['total'] . "€";

    $headers = "From: noreply@tonsite.com";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
    }
}
?>
