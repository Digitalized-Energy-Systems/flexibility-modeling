<?php

// Allgemeine Ausnahme für interne Fehler
class InternalErrorException extends RuntimeException
{
}

// Ausnahme für fehlende Einträge in der Datenbank
class MissingEntryException extends RuntimeException
{
}

// Schnittstelle für Flexmodels-Datenbankzugriff
interface FlexmodelsDAO
{
	public function getFlexmodelId(int $id): Flexmodel;

	public function getFlexmodels(): array;
}
?>