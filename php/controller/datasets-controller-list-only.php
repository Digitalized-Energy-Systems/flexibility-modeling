<?php

require_once "./php/dataset/Dataset.php";
require_once "./php/dataset/Datasets.php";

try {

    // Aufbereitung der Daten fuer die Kontaktierung des Models
    // Hinweis: Es werden keine Daten benoetigt

    // Kontaktierung des Models (Geschaeftslogik)
    $datasets = Datasets::getInstance();
    $datasetslist = $datasets->getDatasets();

} catch (InternalErrorException $exc) {
    // Behandlung von potentiellen Fehlern der Geschaeftslogik
    $_SESSION["message"] = "internal_error";
}
