<?php if (isset($_SESSION['successmessage'])): ?>
    <div id="notification" class="positive-message"><?= $_SESSION['successmessage'] ?>
    </div>
    <?php unset($_SESSION['successmessage']); ?>
<?php endif; ?>
<?php if (isset($_SESSION['errormessage'])): ?>
    <div id="notification" class="negative-message"><?= $_SESSION['errormessage'] ?>
    </div>
    <?php unset($_SESSION['errormessage']); ?>
<?php endif; ?>
<?php if (isset($_SESSION['warningmessage'])): ?>
    <div id="notification" class="warning-message"><?= $_SESSION['warningmessage'] ?>
    </div>
    <?php unset($_SESSION['warningmessage']); ?>
<?php endif; ?>
<?php if (isset($_SESSION['standardmessage'])): ?>
    <div id="notification" class="standard-message"><?= $_SESSION['standardmessage'] ?>
    </div>
    <?php unset($_SESSION['standardmessage']); ?>
<?php endif; ?>
<?php if (isset($_SESSION['logmessage'])): ?>
    <?php
    $logMessage = $_SESSION['logmessage'];
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "{$timestamp}: {$logMessage}\n";
    file_put_contents("log/mymovies.log", $logEntry, FILE_APPEND);
    ?>
    <?php unset($_SESSION['logmessage']); ?>
<?php endif; ?>

<!-- Einbindung von optionalen JavaScript-Effekten -->
<script src="js/notifications.js"></script>