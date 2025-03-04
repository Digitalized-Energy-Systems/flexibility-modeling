<?php
if (!isset($abs_path)) {
    require_once "path.php";
}
require_once $abs_path . "/php/controller/login-controller.php";
$_SESSION['currentpage'] = 'login';

?>

<!DOCTYPE html>
<html lang="de">

<?php
$pageTitle = "Login";
include $abs_path . '/php/include/head.php';
?>

<body>
    <?php include 'php/include/header_loggedout.php'; ?>
    <!-- Notification system -->
    <?php include 'php/include/notifications.php'; ?>
    <main>
        <article class="login-article">
            <h1>Login</h1>

            <form class="standard-form" action="login.php" method="post" novalidate>
                <!-- Validierung durch Browser ausgeschaltet für eigene Validierung -->

                <label class="standard-form-label" for="email">Mail address:</label>
                <input class="standard-form-input" type="email" id="email" name="email" placeholder="" required
                    autocomplete="on" value="<?= isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">


                <label class="standard-form-label" for="password">Passwort:</label>
                <input class="standard-form-input" type="password" id="password" name="passwort" placeholder="" required
                    autocomplete="off">
                <!-- CSRF-Token -->
                <input type="hidden" name="csrf_token" value="<?= getCsrfToken() ?>">


                <div class="button-container">
                    <input class="button-default" type="submit" value="Absenden">
                </div>
            </form>
        </article>
    </main>
</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>