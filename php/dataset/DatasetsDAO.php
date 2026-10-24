<?php

// Allgemeine Ausnahme für interne Fehler
class InternalErrorException extends RuntimeException
{
}

// Ausnahme für fehlende Einträge in der Datenbank
class MissingEntryException extends RuntimeException
{
}

// Schnittstelle für Datensatz-Datenbankzugriff
interface DatasetsDAO
{
	public function getDatasetId(int $id): Dataset;

	public function getDatasets(): array;
}
?>