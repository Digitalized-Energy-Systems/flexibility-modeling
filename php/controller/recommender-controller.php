<?php
session_start();
if (!isset($abs_path)) {
    require_once __DIR__ . '/../../path.php';
}

require_once "./php/model/Flexmodel.php";
require_once "./php/model/Flexmodels.php";


try {

    // Aufbereitung der Daten fuer die Kontaktierung des Models
    // Hinweis: Es werden keine Daten benoetigt

    // Kontaktierung des Models (Geschaeftslogik)
    $flexmodels = Flexmodels::getInstance();
    $flexmodelslist = $flexmodels->getFlexmodels();
    
} catch (InternalErrorException $exc) {
    // Behandlung von potentiellen Fehlern der Geschaeftslogik
    $_SESSION["message"] = "internal_error";
}