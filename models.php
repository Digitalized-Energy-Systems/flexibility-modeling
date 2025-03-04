<?php
require_once 'php/controller/flexmodels-controller.php';

$pageTitle = "List";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'models';

switch ($sort) {
    case 'year': // Sortierung nach Jahr
        if ($order == 'desc') {
            usort($flexmodelslist, 'sortByYear'); // Absteigend sortieren
        } else {
            usort($flexmodelslist, function ($a, $b) {
                return $b->getYear() - $a->getYear(); // Aufsteigend sortieren
            });
        }
        break;
    case 'authors': // Sortierung nach Titel
        if ($order == 'desc') {
            usort($flexmodelslist, 'sortByAuthors'); // Absteigend sortieren
        } else {
            usort($flexmodelslist, function ($a, $b) {
                return strcmp($b->getFormattedAuthors(), $a->getFormattedAuthors()); // Aufsteigend sortieren
            });
        }
        break;
    case 'title': // Sortierung nach Titel
        if ($order == 'desc') {
            usort($flexmodelslist, 'sortByTitle'); // Absteigend sortieren
        } else {
            usort($flexmodelslist, function ($a, $b) {
                return strcmp($b->getTitle(), $a->getTitle()); // Aufsteigend sortieren
            });
        }
        break;
}
?>

<!DOCTYPE html>
<html>

<body>
    <?php include 'php/include/header.php'; ?>
    <?php include 'php/include/notifications.php'; ?>

    <main>
        <article class="flexmodellist-article">
            <h1>List of Publications about Flexibility Models</h1>
            <div class="content-box-models">
                <div class="flexmodellist">
                    <div class="flexmodellist-header">
                        <p class="year"><a class="sortable-header"
                                href="?sort=year&order=<?= ($sort == 'year') ? $next_order : 'asc' ?>"><strong>Year
                                    <?= ($sort == 'year') ? ($order == 'asc' ? '▼' : '▲') : '' ?></strong></a></p>
                        <p class="authors"><a class="sortable-header"
                                href="?sort=authors&order=<?= ($sort == 'authors') ? $next_order : 'asc' ?>"><strong>Authors
                                    <?= ($sort == 'authors') ? ($order == 'asc' ? '▼' : '▲') : '' ?></strong></a></p>
                        <p class="title"><a class="sortable-header"
                                href="?sort=title&order=<?= ($sort == 'title') ? $next_order : 'asc' ?>"><strong>Publication
                                    <?= ($sort == 'title') ? ($order == 'asc' ? '▼' : '▲') : '' ?></strong></a></p>
                        <p class="usecase" style="text-align:center"><strong>Use Case</strong></p>
                        <p class="methodology" style="text-align:center"><strong>Methodology</strong></p>
                        <p class="list-implementation" style="text-align:center"><strong>Implementation</strong></p>
                        <p class="list-doi" style="text-align:center"><strong>DOI</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Asset Types</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Classification</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Flexibility</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Type</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Metrics</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Uncertainty</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Aggregation</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Time</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Resolution</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Multi-Time-Scale</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Mediator</strong></p>
                        <p class="list-parameters" style="text-align:center"><strong>Constraints</strong></p>
                    </div>
                    <div class="flexmodellist-data">
                        <?php if (empty($flexmodelslist)): ?>
                            <p>Keine Einträge vorhanden.</p>
                        <?php else:
                            foreach ($flexmodelslist as $flexmodel): ?>
                                <div class="flexmodels">
                                    <p class="year"><?= htmlspecialchars($flexmodel->getYear()) ?></p>
                                    <p class="authors" title="<?= htmlspecialchars($flexmodel->getAuthors()) ?>">
                                        <?= htmlspecialchars($flexmodel->getFormattedAuthors()) ?>
                                    </p>
                                    <p class="title"><a target=_blank
                                            href="https://www.doi.org/<?= htmlspecialchars($flexmodel->getDoi()) ?>"><?= htmlspecialchars($flexmodel->getTitle()) ?></a>
                                    </p>
                                    <p class="usecase"><?= htmlspecialchars($flexmodel->getUsecase()) ?></p>
                                    <p class="methodology"><?= htmlspecialchars($flexmodel->getMethodology()) ?></p>
                                    <p class="list-implementation">
                                        <a target="_blank" href="<?= htmlspecialchars($flexmodel->getImplementation()) ?>">
                                            <?= htmlspecialchars($flexmodel->getImplementation()) ?>
                                        </a>
                                    </p>
                                    <p class="list-doi"><?= htmlspecialchars($flexmodel->getDoi()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamAssetTypes()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamClassification()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamFlexibility()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamType()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamMetric()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamUncertainty()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamAggregation()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamTime()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamResolution()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamMultitimescale()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamMediator()) ?></p>
                                    <p class="list-parameters"><?= htmlspecialchars($flexmodel->getParamConstraints()) ?></p>


                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

        </article>
    </main>
    <?php include $abs_path . '/php/include/footer.php'; ?>
    <script src="js/script.js"></script>

</body>

</html>