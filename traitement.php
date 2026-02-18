<?php
// Autoriser les requêtes depuis ton site (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// 1. Récupération des données JSON envoyées par le JavaScript
$donnees_brutes = file_get_contents("php://input");
$commande = json_decode($donnees_brutes, true);

if (!$commande) {
    http_response_code(400);
    echo json_encode(["message" => "Données de commande invalides."]);
    exit;
}

// 2. Configuration de l'email
// Note : Fatima Ezzohra Dadi, remplace par l'email réel du client
$destinataire = "contact@votre-marque.fr"; 
$sujet = "🌿 Nouvelle Commande - L'Excellence CBD";

// 3. Construction du message HTML pour un rendu professionnel
$message = "
<html>
<head>
    <title>Nouvelle Commande</title>
    <style>
        body { font-family: 'Inter', sans-serif; color: #2D3A2D; }
        .container { padding: 20px; border: 1px solid #E5DACE; }
        .total { font-weight: bold; font-size: 1.2em; color: #064E3B; }
    </style>
</head>
<body>
    <h2>Détails de la commande reçue :</h2>
    <p><strong>Client :</strong> " . htmlspecialchars($commande['client']) . "</p>
    <hr>
    <ul>";

foreach ($commande['items'] as $item) {
    $message .= "<li>" . htmlspecialchars($item['name']) . " : " . $item['qty'] . " x " . number_format($item['price'], 2) . " €</li>";
}

$message .= "
    </ul>
    <p class='total'>Montant Total : " . number_format($commande['total'], 2) . " €</p>
    <p><em>Date de la commande : " . date('d/m/Y H:i') . "</em></p>
</body>
</html>";

// 4. En-têtes pour l'envoi d'un email au format HTML
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: L'Excellence Webmaster <noreply@l-excellence-cbd.fr>" . "\r\n";

// 5. Envoi de l'email
if (mail($destinataire, $sujet, $message, $headers)) {
    http_response_code(200);
    echo json_encode(["message" => "La commande a été envoyée par email au client."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erreur lors de l'envoi de l'email."]);
}
?>
