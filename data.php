<?php
require_once 'php/controller/datasets-controller.php';

$pageTitle = "Dataset List";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'data';

switch ($sort) {
    case 'year': // Sortierung nach Jahr
        if ($order == 'desc') {
            usort($datasetslist, 'sortByYear'); // Absteigend sortieren
        } else {
            usort($datasetslist, function ($a, $b) {
                return $b->getYear() - $a->getYear(); // Aufsteigend sortieren
            });
        }
        break;
    case 'authors': // Sortierung nach Titel
        if ($order == 'desc') {
            usort($datasetslist, 'sortByAuthors'); // Absteigend sortieren
        } else {
            usort($datasetslist, function ($a, $b) {
                return strcmp($b->getFormattedAuthors(), $a->getFormattedAuthors()); // Aufsteigend sortieren
            });
        }
        break;
    case 'title': // Sortierung nach Titel
        if ($order == 'desc') {
            usort($datasetslist, 'sortByTitle'); // Absteigend sortieren
        } else {
            usort($datasetslist, function ($a, $b) {
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
                <h1>List of Useful Datasets for Flexibility Modeling</h1>
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
                        <p class="methodology"><strong>Abstract</strong></p>
                        <p class="usecase"><strong>Example Use Case</strong></p>
                        <p class="expand-col"><strong>Details</strong></p>
                    </div>
                    <div class="flexmodellist-data">
                        <?php if (empty($datasetslist)): ?>
                            <p>Keine Einträge vorhanden.</p>
                        <?php else:
                            foreach ($datasetslist as $dataset): ?>
                                <div class="flexmodels">
                                    <div class="row-main">
                                        <p class="year"><?= htmlspecialchars($dataset->getYear()) ?></p>
                                        <p class="authors" title="<?= htmlspecialchars($dataset->getAuthors()) ?>">
                                            <?= htmlspecialchars($dataset->getFormattedAuthors()) ?>
                                        </p>
                                        <?php if ($dataset->getDoi() != "-"): ?> 
                                            <p class="title"><a target=_blank 
                                                    href="https://www.doi.org/<?= htmlspecialchars($dataset->getDoi()) ?>"><?= htmlspecialchars($dataset->getTitle()) ?></a>
                                            </p>
                                        <?php else: ?>
                                            <p class="title"><a target=_blank
                                                    href="<?= htmlspecialchars($dataset->getLink()) ?>"><?= htmlspecialchars($dataset->getTitle()) ?></a>
                                            </p>
                                        <?php endif; ?>
                                        <p class="usecase"><?= htmlspecialchars($dataset->getUsecase()) ?></p>
                                        <p class="methodology"><?= htmlspecialchars($dataset->getMethodology()) ?></p>
                                        <p class="expand-col"><button class="expand-btn" aria-expanded="false">▾</button></p>
                                    </div>
                                    
                                    <div class="model-details content">
                                        <div class="details-grid">
                                            <div><strong>DOI:</strong><br/><?= htmlspecialchars($dataset->getDoi()) ?></div>
                                            <div><strong>Download</strong><br/>
                                                <a target=_blank 
                                                    href="<?=htmlspecialchars($dataset->getLinkDownload()) ?>"><?= "Link" ?>
                                                </a>
                                            </div>
                                            <div><strong>Software:</strong><br/><?= htmlspecialchars($dataset->getSoftware()) ?></div>
                                            <div><strong>Metrics: </strong><br/><?= htmlspecialchars($dataset->getParamMetrics())  ?></div>
                                            <div><strong>Resolution (Time):</strong><br/><?= htmlspecialchars($dataset->getParamResolutionTime()) ?></div>
                                            <div><strong>Resolution (Space):</strong><br/><?= htmlspecialchars($dataset->getParamResolutionSpace()) ?></div>
                                            <div><strong>Coverage (Time): </strong><br/><?= htmlspecialchars($dataset->getParamCovTime())  ?></div>
                                            <div><strong>Coverage (Space): </strong><br/><?= htmlspecialchars($dataset->getParamCovSpace())  ?></div>
                                            <div><strong>Availability:</strong><br/><?= htmlspecialchars($dataset->getAvailability()) ?></div>
                                            <div><strong>Data Type:</strong><br/><?= htmlspecialchars($dataset->getParamType()) ?></div>
                                            <div><strong>Other:</strong><br/><?= htmlspecialchars($dataset->getParamOther()) ?></div>
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