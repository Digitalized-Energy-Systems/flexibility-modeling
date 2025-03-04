<?php
// Flexmodel-Klasse, repräsentiert Flexmodel aus der Datenbank
class Flexmodel implements JsonSerializable
{
    private $id;
    private $authors;
    private $title;
    private $year;
    private $abstract;
    private $link;
    private $doi;
    private $methodology;
    private $usecase;
    private $implementation;
    private $param_flexibility;
    private $param_mediator;
    private $param_assettypes;
    private $param_type;
    private $param_aggregation;
    private $param_time;
    private $param_metric;
    private $param_resolution;
    private $param_constraints;
    private $param_classification;
    private $param_uncertainty;
    private $param_sectorcoupling;
    private $param_multitimescale;
    private $flexblox;


    public function __construct(
        $id,
        $authors,
        $title,
        $year,
        $abstract = null,
        $link = null,
        $doi = null,
        $methodology = null,
        $usecase = null,
        $implementation = null,
        $param_flexibility = null,
        $param_mediator = null,
        $param_assettypes = null,
        $param_type = null,
        $param_aggregation = null,
        $param_time = null,
        $param_metric = null,
        $param_resolution = null,
        $param_constraints = null,
        $param_classification = null,
        $param_uncertainty = null,
        $param_sectorcoupling = null,
        $param_multitimescale = null,
        $flexblox = null,
    ) {
        $this->id = $id;
        $this->authors = $authors;
        $this->title = $title;
        $this->year = $year;
        $this->abstract = $abstract;
        $this->link = $link;
        $this->doi = $doi;
        $this->usecase = $usecase;
        $this->methodology = $methodology;
        $this->implementation = $implementation;
        $this->param_flexibility = $param_flexibility;
        $this->param_mediator = $param_mediator;
        $this->param_assettypes = $param_assettypes;
        $this->param_type = $param_type;
        $this->param_aggregation = $param_aggregation;
        $this->param_time = $param_time;
        $this->param_metric = $param_metric;
        $this->param_resolution = $param_resolution;
        $this->param_constraints = $param_constraints;
        $this->param_classification = $param_classification;
        $this->param_uncertainty = $param_uncertainty;
        $this->param_sectorcoupling = $param_sectorcoupling;
        $this->param_multitimescale = $param_multitimescale;
        $this->flexblox = $flexblox;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'authors' => $this->getFormattedAuthors(),
            'title' => $this->title,
            'year' => $this->year,
            'abstract' => $this->abstract,
            'link' => $this->link,
            'doi' => $this->doi,
            'methodology' => $this->methodology,
            'usecase' => $this->usecase,
            'implementation' => $this->implementation,
            'param_flexibility' => $this->param_flexibility,
            'param_mediator' => $this->param_mediator,
            'param_assettypes' => $this->param_assettypes,
            'param_type' => $this->param_type,
            'param_aggregation' => $this->param_aggregation,
            'param_time' => $this->param_time,
            'param_metric' => $this->param_metric,
            'param_resolution' => $this->param_resolution,
            'param_constraints' => $this->param_constraints,
            'param_classification' => $this->param_classification,
            'param_uncertainty' => $this->param_uncertainty,
            'param_sectorcoupling' => $this->param_sectorcoupling,
            'param_multitimescale' => $this->param_multitimescale,
            'flexblox' => $this->flexblox,
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
    public function getImplementation()
    {
        return $this->implementation;
    }
    public function getParamFlexibility()
    {
        return $this->param_flexibility;
    }

    public function getParamMediator()
    {
        return $this->param_mediator;
    }

    public function getParamAssetTypes()
    {
        return $this->param_assettypes;
    }

    public function getParamType()
    {
        return $this->param_type;
    }

    public function getParamAggregation()
    {
        return $this->param_aggregation;
    }

    public function getParamTime()
    {
        return $this->param_time;
    }

    public function getParamMetric()
    {
        return $this->param_metric;
    }

    public function getParamResolution()
    {
        return $this->param_resolution;
    }

    public function getParamConstraints()
    {
        return $this->param_constraints;
    }

    public function getParamClassification()
    {
        return $this->param_classification;
    }
    public function getParamUncertainty()
    {
        return $this->param_uncertainty;
    }
    public function getParamMultitimescale()
    {
        return $this->param_multitimescale;
    }
    public function getFlexblox() {
        return $this->flexblox;
    }
}
