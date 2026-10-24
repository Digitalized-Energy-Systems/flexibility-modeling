<?php
require_once "Dataset.php";
require_once "DatasetsDAO.php";

class DatasetsPDOSQLite implements DatasetsDAO
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
            $dsn = 'sqlite:' . $abs_path . '/db/data.db';
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
    public function getDatasetId(int $id): Dataset
    {
        try {
            $db = $this->getConnection();
            $sql = "SELECT * FROM Dataset WHERE id = :id LIMIT 1";
            $command = $db->prepare($sql);
            $command->execute([":id" => $id]);
            $entry = $command->fetch(PDO::FETCH_ASSOC);

            if (!$entry) {
                throw new MissingEntryException("No entry found for ID: " . $id);
            }

            return new Dataset(
                $entry["id"],
                $entry["authors"],
                $entry["title"],
                $entry["year"]
            );
        } catch (PDOException $exc) {
            error_log("Database error in getDatasetId: " . $exc->getMessage());
            throw new InternalErrorException("Database error while retrieving Dataset ID: " . $id);
        }
    }

    public function getDatasets(): array
    {
        try {
            $db = $this->getConnection();
            $entries = [];

            // Query to fetch all rows from the Dataset table
            $sql = "SELECT * FROM Dataset";
            foreach ($db->query($sql, PDO::FETCH_ASSOC) as $row) {
                // Create a new Dataset instance for each row
                $entries[] = new Dataset(
                    $row["id"],
                    $row["authors"],
                    $row["title"],
                    $row["year"],
                    $row["abstract"] ?? null,
                    $row["link"] ?? null,
                    $row["link_download"] ?? null,
                    $row["doi"] ?? null,
                    $row["methodology"] ?? null,
                    $row["usecase"] ?? null,
                    $row["software"] ?? null,
                    $row["availability"] ?? null,
                    $row["param_metrics"] ?? null,
                    $row["param_resolution_time"] ?? null,
                    $row["param_resolution_space"] ?? null,
                    $row["param_coverage_time"] ?? null,
                    $row["param_coverage_space"] ?? null,
                    $row["param_type"] ?? null,
                    $row["param_other"] ?? null,
                );
            }

            return $entries;
        } catch (PDOException $exc) {
            // Log the specific database error and rethrow an internal error exception
            error_log("Database error in getDatasets: " . $exc->getMessage());
            throw new InternalErrorException("Failed to retrieve Datasets: " . $exc->getMessage());
        }
    }


}