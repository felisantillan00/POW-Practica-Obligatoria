<?php
$jsonFile = 'turneroData.json';

// Leer el archivo JSON
function leerJSON($file) {
    if (!file_exists($file)) {
        return json_encode(["limiteInferior" => null, "limiteSuperior" => null, "numeros" => []]);
    }
    return file_get_contents($file);
}

// Actualizar el archivo JSON
function escribirJSON($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

// Manejar solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo leerJSON($jsonFile);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    escribirJSON($jsonFile, $data);
    echo json_encode(["status" => "success"]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $emptyData = ["limiteInferior" => null, "limiteSuperior" => null, "numeros" => []];
    escribirJSON($jsonFile, $emptyData);
    echo json_encode(["status" => "success", "message" => "Data reset successfully."]);
}
?>
