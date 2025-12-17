<header>
    <nav>
        <div class="nav-logos">
            <img class="logo" src="images/flex.png" alt="Flex Logo" width="50" height="50">
            <a class="nav-sponsor-mobile" href="https://nfdi4energy.uol.de/" target="_blank"><img class="logo sponsor-logo" src="images/nfdi4energy.png" alt="nfdi4energy" width="103" height="42"></a>
        </div>
        <div class="nav-links">
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'home') ? 'glow' : '' ?>" href="index.php">Home</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'recommender') ? 'glow' : '' ?>" href="recommender.php">Recommender</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'models') ? 'glow' : '' ?>" href="models.php">Models</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'help') ? 'glow' : '' ?>" href="help.php">Tutorial</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'contact') ? 'glow' : '' ?>" href="contact.php">Contact</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'feedback') ? 'glow' : '' ?>" href="feedback.php">Feedback</a>
        </div>
        <a class="nav-sponsor" href="https://nfdi4energy.uol.de/" target="_blank"><img class="logo sponsor-logo" src="images/nfdi4energy.png" alt="nfdi4energy" width="103" height="42"></a>
        <div class="nav-controls">
            <button id="darkModeToggle" aria-label="Toggle Dark Mode">🌙</button>
            <button id="menuToggle" class="menu-toggle" aria-label="Open Menu" aria-expanded="false">☰</button>
        </div>
        <div id="mobileMenu" class="mobile-menu" aria-hidden="true">
            <div class="menu-panel">
                <a href="index.php">Home</a>
                <a href="recommender.php">Recommender</a>
                <a href="models.php">Models</a>
                <a href="help.php">Help</a>
                <a href="contact.php">Contact</a>
                <a href="feedback.php">Feedback</a>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 8px 0;">
                <a href="termsofuse.php">Terms of Use</a>
                <a href="impressum.php">Impressum</a>
                <a href="privacy.php">Privacy</a>
            </div>
        </div>

        <!--<div class="login-register">
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'login') ? 'glow' : '' ?>"
                href="login.php">Login</a>
            <a style="display:none" class="register" href="register.php">Register</a>
        </div>-->
    </nav>
</header>