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
            <div class="content-box-models">
                <h1>List of Publications about Flexibility Models</h1>
                <div class="flexmodellist">
                    <div class="flexmodellist-header compact">
                        <p class="year"><a class="sortable-header"
                                href="?sort=year&order=<?= ($sort == 'year') ? $next_order : 'asc' ?>"><strong>Year
                                    <?= ($sort == 'year') ? ($order == 'asc' ? '▼' : '▲') : '' ?></strong></a></p>
                        <p class="authors"><a class="sortable-header"
                                href="?sort=authors&order=<?= ($sort == 'authors') ? $next_order : 'asc' ?>"><strong>Authors
                                    <?= ($sort == 'authors') ? ($order == 'asc' ? '▼' : '▲') : '' ?></strong></a></p>
                        <p class="title"><a class="sortable-header"
                                href="?sort=title&order=<?= ($sort == 'title') ? $next_order : 'asc' ?>"><strong>Publication
                                    <?= ($sort == 'title') ? ($order == 'asc' ? '▼' : '▲') : '' ?></strong></a></p>
                        <p class="usecase"><strong>Use Case</strong></p>
                        <p class="methodology"><strong>Methodology</strong></p>
                        <p class="expand-col"><strong>Details</strong></p>
                    </div>
                    <div class="flexmodellist-data">
                        <?php if (empty($flexmodelslist)): ?>
                            <p>Keine Einträge vorhanden.</p>
                        <?php else:
                            foreach ($flexmodelslist as $flexmodel): ?>
                                <div class="flexmodels">
                                    <div class="row-main">
                                        <p class="year"><?= htmlspecialchars($flexmodel->getYear()) ?></p>
                                        <p class="authors" title="<?= htmlspecialchars($flexmodel->getAuthors()) ?>">
                                            <?= htmlspecialchars($flexmodel->getFormattedAuthors()) ?>
                                        </p>
                                        <p class="title"><a target=_blank
                                                href="https://www.doi.org/<?= htmlspecialchars($flexmodel->getDoi()) ?>"><?= htmlspecialchars($flexmodel->getTitle()) ?></a>
                                        </p>
                                        <p class="usecase"><?= htmlspecialchars($flexmodel->getUsecase()) ?></p>
                                        <p class="methodology"><?= htmlspecialchars($flexmodel->getMethodology()) ?></p>
                                        <p class="expand-col"><button class="expand-btn" aria-expanded="false">▾</button></p>
                                    </div>

                                    <div class="model-details content">
                                        <div class="details-grid">
                                            <div><strong>Implementation:</strong><br/>
                                                <a target="_blank" href="<?= htmlspecialchars($flexmodel->getImplementation()) ?>"><?= htmlspecialchars($flexmodel->getImplementation()) ?></a>
                                            </div>
                                            <div><strong>DOI:</strong><br/><?= htmlspecialchars($flexmodel->getDoi()) ?></div>
                                            <div><strong>Asset Types:</strong><br/><?= htmlspecialchars($flexmodel->getParamAssetTypes()) ?></div>
                                            <div><strong>Classification:</strong><br/><?= htmlspecialchars($flexmodel->getParamClassification()) ?></div>
                                            <div><strong>Flexibility:</strong><br/><?= htmlspecialchars($flexmodel->getParamFlexibility()) ?></div>
                                            <div><strong>Type:</strong><br/><?= htmlspecialchars($flexmodel->getParamType()) ?></div>
                                            <div><strong>Metric:</strong><br/><?= htmlspecialchars($flexmodel->getParamMetric()) ?></div>
                                            <div><strong>Uncertainty:</strong><br/><?= htmlspecialchars($flexmodel->getParamUncertainty()) ?></div>
                                            <div><strong>Aggregation:</strong><br/><?= htmlspecialchars($flexmodel->getParamAggregation()) ?></div>
                                            <div><strong>Time:</strong><br/><?= htmlspecialchars($flexmodel->getParamTime()) ?></div>
                                            <div><strong>Resolution:</strong><br/><?= htmlspecialchars($flexmodel->getParamResolution()) ?></div>
                                            <div><strong>Multi-Time-Scale:</strong><br/><?= htmlspecialchars($flexmodel->getParamMultitimescale()) ?></div>
                                            <div><strong>Mediator:</strong><br/><?= htmlspecialchars($flexmodel->getParamMediator()) ?></div>
                                            <div><strong>Constraints:</strong><br/><?= htmlspecialchars($flexmodel->getParamConstraints()) ?></div>
                                        </div>
                                    </div>

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
    <script src="js/models-list.js"></script>

</body>

</html>