<?php
require_once "Flexmodel.php";
require_once "FlexmodelsDAO.php";


class FlexmodelsPDOSQLite implements FlexmodelsDAO
{

    private static $instance = null;
    public static function getInstance()
    {
        if (self::$instance === null || !(self::$instance instanceof self)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function getConnection()
    {
        global $abs_path;

        try {
            $dsn = 'sqlite:' . $abs_path . '/db/flex.db';
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_PERSISTENT => true
            ];
            return new PDO($dsn, null, null, $options);
        } catch (PDOException $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw new InternalErrorException();
        }
    }
    public function getFlexmodelId(int $id): Flexmodel
    {
        try {
            $db = $this->getConnection();
            $sql = "SELECT * FROM Flexmodel WHERE id = :id LIMIT 1";
            $command = $db->prepare($sql);
            $command->execute([":id" => $id]);
            $entry = $command->fetch(PDO::FETCH_ASSOC);

            if (!$entry) {
                throw new MissingEntryException("No entry found for ID: " . $id);
            }

            return new Flexmodel(
                $entry["id"],
                $entry["authors"],
                $entry["title"],
                $entry["year"]
            );
        } catch (PDOException $exc) {
            error_log("Database error in getFlexmodelId: " . $exc->getMessage());
            throw new InternalErrorException("Database error while retrieving Flexmodel ID: " . $id);
        }
    }

    public function getFlexmodels(): array
    {
        try {
            $db = $this->getConnection();
            $entries = [];

            // Query to fetch all rows from the Flexmodel table
            $sql = "SELECT * FROM Flexmodel";
            foreach ($db->query($sql, PDO::FETCH_ASSOC) as $row) {
                // Create a new Flexmodel instance for each row
                $entries[] = new Flexmodel(
                    $row["id"],
                    $row["authors"],
                    $row["title"],
                    $row["year"],
                    $row["abstract"] ?? null,
                    $row["link"] ?? null,
                    $row["doi"] ?? null,
                    $row["methodology"] ?? null,
                    $row["usecase"] ?? null,
                    $row["implementation"] ?? null,
                    $row["param_flexibility"] ?? null,
                    $row["param_mediator"] ?? null,
                    $row["param_assettypes"] ?? null,
                    $row["param_type"] ?? null,
                    $row["param_aggregation"] ?? null,
                    $row["param_time"] ?? null,
                    $row["param_metric"] ?? null,
                    $row["param_resolution"] ?? null,
                    $row["param_constraints"] ?? null,
                    $row["param_classification"] ?? null,
                    $row["param_uncertainty"] ?? null,
                    $row["param_sectorcoupling"] ?? null,
                    $row["param_multitimescale"] ?? null,
                    $row["flexblox"] ?? null
                );
            }

            return $entries;
        } catch (PDOException $exc) {
            // Log the specific database error and rethrow an internal error exception
            error_log("Database error in getFlexmodels: " . $exc->getMessage());
            throw new InternalErrorException("Failed to retrieve Flexmodels: " . $exc->getMessage());
        }
    }


}