<?php
session_start();
if (!isset($abs_path)) {
    require_once __DIR__ . '/../../path.php';
}

require_once "./php/model/Flexmodel.php";
require_once "./php/model/Flexmodels.php";

// Sortierfunktionen
function sortByYear($a, $b)
{
    return $a->getYear() - $b->getYear();
}

function sortByAuthors($a, $b)
{
    return strcmp($a->getFormattedAuthors(), $b->getFormattedAuthors());
}

function sortByTitle($a, $b)
{
    return strcmp($a->getTitle(), $b->getTitle());
}

// Auswahl der Sortierfunktion basierend auf dem GET-Parameter "sort"
$sort = $_GET['sort'] ?? ''; // Default: keine Sortierung
$order = $_GET['order'] ?? ''; // Default: aufsteigend
// Bestimme die Sortierreihenfolge für den nächsten Klick
$next_order = ($order == 'desc') ? 'asc' : 'desc';


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
