<?php
require_once 'php/controller/help-controller.php';

$pageTitle = "Contact";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'contact';
?>

<!DOCTYPE html>
<html>

<body>
    <?php include 'php/include/header.php'; ?>
    <?php include 'php/include/notifications.php'; ?>

    <main>
        <article class="standard-article">

            <div class="content-box">
                <h1>Contact</h1>
                <p>If you have any <a target=_blank href="feedback.php">feedback</a>, ideas, or questions, we welcome
                    you to contact us via mail. We will also gladly receive suggestions regarding further flexibility models
                    or useful data sets that could be included in the recommender. </p>

                <ul>
                    <li><strong>Emilie Frost</strong> <a href="mailto:emilie.frost@offis.de">emilie.frost at
                            offis.de</a></li>
                    <li><strong>Jannik Grotelüschen</strong> <a href=mailto:jannik.grotelueschen@offis.de">jannik.grotelueschen at
                            offis.de</a></li>
                </ul>

            </div>
        </article>
    </main>
    <script src="js/script.js"></script>

</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>