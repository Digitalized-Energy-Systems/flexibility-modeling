<header>
    <nav>
        <div class="nav-links">
            <img class="logo" src="images/flex.png" alt="Flex Logo" width="50" height="50">
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'home') ? 'glow' : '' ?>"
                href="index.php">Home</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'recommender') ? 'glow' : '' ?>"
                href="recommender.php">Recommender</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'models') ? 'glow' : '' ?>"
                href="models.php">Models</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'help') ? 'glow' : '' ?>"
                href="help.php">Help</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'contact') ? 'glow' : '' ?>"
                href="contact.php">Contact</a>
                <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'feedback') ? 'glow' : '' ?>"
                href="feedback.php">Feedback</a>
            <a href="https://nfdi4energy.uol.de/" target="_blank"><img class="logo" src="images/nfdi4energy.png"
                    alt="nfdi4energy" width="103" height="42"></a>
        </div>
        <button id="darkModeToggle" aria-label="Toggle Dark Mode">🌙</button>

        <!--<div class="login-register">
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'login') ? 'glow' : '' ?>"
                href="login.php">Login</a>
            <a style="display:none" class="register" href="register.php">Register</a>
        </div>-->
    </nav>
</header>