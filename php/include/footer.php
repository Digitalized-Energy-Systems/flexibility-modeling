<footer>
    <nav>
        <div class="nav-links">
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'termsofuse') ? 'glow' : '' ?>"
                href="termsofuse.php">Terms of Use</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'impressum') ? 'glow' : '' ?>"
                href="impressum.php">Impressum</a>
            <a class="<?= (isset($_SESSION['currentpage']) && $_SESSION['currentpage'] == 'privacy') ? 'glow' : '' ?>"
                href="privacy.php">Privacy</a>
        </div>
    </nav>
</footer>

<!-- Debug Output -->
<?php  // include 'php/include/debug.php'; ?>