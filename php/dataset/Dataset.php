<?php 
// Datensatz-Klasse, repräsentiert Datensatz aus der Datenbank
class Dataset implements JsonSerializable
{
    private $id;
    private $authors;
    private $title;
    private $year;
    private $abstract;
    private $link;
    private $link_download;
    private $doi;
    private $usecase;
    private $methodology;
    private $software;
    private $availability;
    private $param_metrics;
    private $param_resolution_time;
    private $param_resolution_space;
    private $param_coverage_time;
    private $param_coverage_space;
    private $param_type;
    private $param_other;

    public function __construct(
        $id,
        $authors,
        $title,
        $year,
        $abstract = null,
        $link = null,
        $link_download = null,
        $doi = null,
        $usecase = null,
        $methodology = null,
        $software = null,
        $availability = null,
        $param_metrics = null,
        $param_resolution_time = null,
        $param_resolution_space = null,
        $param_coverage_time = null,
        $param_coverage_space = null,
        $param_type = null,
        $param_other = null,
    ) {
        $this->id = $id;
        $this->authors = $authors;
        $this->title = $title;
        $this->year = $year;
        $this->abstract = $abstract;
        $this->link = $link;
        $this->link_download = $link_download;
        $this->doi = $doi;
        $this->usecase = $usecase;
        $this->methodology = $methodology;
        $this->software = $software;
        $this->availability = $availability;
        $this->param_metrics = $param_metrics;
        $this->param_resolution_time = $param_resolution_time;
        $this->param_resolution_space = $param_resolution_space;
        $this->param_coverage_time = $param_coverage_time;
        $this->param_coverage_space = $param_coverage_space;
        $this->param_type = $param_type;
        $this->param_other = $param_other;
    }
    #[\ReturnTypeWillChange]
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'authors' => $this->getFormattedAuthors(),
            'authors_full' => $this->getAuthors(),
            'title' => $this->title,
            'year' => $this->year,
            'abstract' => $this->abstract,
            'link' => $this->link,
            'link_download' => $this->link_download,
            'doi' => $this->doi,
            'usecase' => $this->usecase,
            'methodology' => $this->methodology,
            'software' => $this->software,
            'availability' => $this->availability,
            'param_metrics' => $this->param_metrics,
            'param_resolution_time' => $this->param_resolution_time,
            'param_resolution_space' => $this->param_resolution_space,
            'param_coverage_time' => $this->param_coverage_time,
            'param_coverage_space' => $this->param_coverage_space,
            'param_type' => $this->param_type,
            'param_other' => $this->param_other,
        ];
    }
    public function getId()
    {
        return $this->id;
    }
    public function getAuthors()
    {
        return $this->authors;
    }

    function getFormattedAuthors()
    {
        $authorsString = $this->authors;

        // Split the authors string by comma and trim each part
        $authors = array_map('trim', explode(',', $authorsString));

        // Count the number of authors
        $numAuthors = count($authors);

        // Handle different cases based on the number of authors
        if ($numAuthors == 1) {
            // If there is only one author, return their full name
            return $authors[0];
        } elseif ($numAuthors == 2) {
            // If there are two authors, format as "LastName & LastName"
            $firstAuthorParts = explode(' ', $authors[0]);
            $firstAuthorLastName = end($firstAuthorParts); // Get the last part of the first author's name

            $secondAuthorParts = explode(' ', $authors[1]);
            $secondAuthorLastName = end($secondAuthorParts); // Get the last part of the second author's name

            return $firstAuthorLastName . ' & ' . $secondAuthorLastName;
        } else {
            // If there are more than two authors, use the last name of the first author and add "et al."
            $firstAuthorParts = explode(' ', $authors[0]);
            $lastName = end($firstAuthorParts); // Get the last part of the first author's name

            return $lastName . ' et al.';
        }
    }
    public function getTitle()
    {
        return $this->title;
    }
    public function getYear()
    {
        return $this->year;
    }
    public function getAbstract()
    {
        return $this->abstract;
    }

    public function getLink()
    {
        return $this->link;
    }
    public function getLinkDownload()
    {
        return $this->link_download;
    }
    public function getDoi()
    {
        return $this->doi;
    }
    public function getUsecase()
    {
        return $this->usecase;
    }
    public function getMethodology()
    {
        return $this->methodology;
    }
    public function getSoftware()
    {
        return $this->software;
    }
    public function getAvailability()
    {
        return $this->availability;
    }
    public function getParamMetrics()
    {
        return $this->param_metrics;
    }
    public function getParamResolutionTime()
    {
        return $this->param_resolution_time;
    }
    public function getParamResolutionSpace()
    {
        return $this->param_resolution_space;
    }
    public function getParamCovTime()
    {
        return $this->param_coverage_time;
    }
    public function getParamCovSpace()
    {
        return $this->param_coverage_space;
    }
    public function getParamType()
    {
        return $this->param_type;
    }
    public function getParamOther()
    {
        return $this->param_other;
    }
}
