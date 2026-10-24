<?php
require_once "DatasetsPDOSQLite.php";

/*
 * je nachdem ob die Webanwendung mit der Dummy-Fix- oder der Datenbank-Implementierung laufen soll,
 * ist die Implementierung der Methode getInstance die einzige Stelle im gesamten Code, an der eine
 * Änderung erfolgen muss
 */
class Datasets
{
    public static function getInstance()
    {
        //return MovieListFix::getInstance(); // Dummy-Fix-Implementierung
        return DatasetsPDOSQLite::getInstance(); // Datenbank-Implementierung
    }
}