<?php
require_once 'php/controller/help-controller.php';

$pageTitle = "Impressum";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'impressum';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $pageTitle ?></title>
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Styles for the row with the title and button */
        .title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .title {
            margin: 0;
        }

        .language-toggle {
            display: flex;
            justify-content: flex-end;
        }

        .flag-button {
            cursor: pointer;
            width: 25px;
            height: 25px;
            border: none;
            background-color: transparent;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            transition: transform 0.2s ease, opacity 0.2s ease;
            /* Smooth transition for hover effects */
        }

        .flag-button:hover {
            transform: scale(1.1);
            /* Slightly enlarge the image on hover */
            opacity: 0.8;
            /* Slightly reduce opacity for a highlight effect */
        }



        .en-flag {
            background-image: url('images/flag_uk.png');
            /* Replace with your English flag image */
        }

        .de-flag {
            background-image: url('images/flag_de.png');
            /* Replace with your German flag image */
        }
    </style>
</head>

<body>
    <?php include 'php/include/header.php'; ?>
    <?php include 'php/include/notifications.php'; ?>

    <main>
        <article class="standard-article">
            <div class="title-container">
                <h1 class="title" id="impressum-title">Impressum</h1>
                <!-- Language Toggle Button -->
                <div class="language-toggle">
                    <button class="flag-button de-flag" onclick="switchLanguage('de')"></button>
                    <button class="flag-button en-flag" onclick="switchLanguage('en')" style="display: none;"></button>
                </div>
            </div>

            <div class="content-box" id="content-de">
                <h2>Anschrift</h2>
                <address>
                    <strong>OFFIS e.V.</strong><br>
                    Escherweg 2<br>
                    26121 Oldenburg<br>
                    Deutschland
                </address>
                <h2>Telefon/Fax</h2>
                <p>Telefon: +49 441 9722-0<br>
                    Fax: +49 441 9722-102
                </p>
                <h2>E-Mail</h2>
                <p><a href="mailto:institut@offis.de">institut at offis.de</a></p>
                <h2>Internet</h2>
                <p><a href="http://www.offis.de/" target="_blank" rel="noopener">www.offis.de</a></p>

                <h2>Vorstand</h2>
                <ul>
                    <li>Prof. Dr. Sebastian Lehnhoff (Vorsitzender)</li>
                    <li>Prof. Dr. techn. Susanne Boll-Westermann</li>
                    <li>Prof. Dr.-Ing. Andreas Hein</li>
                    <li>Prof. Dr.-Ing. Astrid Nieße</li>
                </ul>

                <h2>Registergericht</h2>
                <p>Amtsgericht Oldenburg<br>
                    Registernummer: VR 1956
                </p>

                <h2>Umsatzsteuer-Identifikationsnummer (USt-IdNr.)</h2>
                <p>DE 811582102</p>

                <h2>Verantwortlich im Sinne der Presse</h2>
                <p>Dr. Ing. Jürgen Meister<br>
                    <strong>OFFIS e.V.</strong><br>
                    Escherweg 2<br>
                    26121 Oldenburg
                </p>

                <h2>Datenschutz</h2>
                <p>Mehr zum Thema Datenschutz finden Sie <a href="privacy.php" target="_blank" rel="noopener">hier</a>.
                </p>
            </div>

            <!-- English Version -->
            <div class="content-box" id="content-en" style="display: none;">
                <h2>Address</h2>
                <address>
                    <strong>OFFIS e.V.</strong><br>
                    Escherweg 2<br>
                    26121 Oldenburg<br>
                    Germany
                </address>

                <h2>Phone/Fax</h2>
                <p>Phone: +49 441 9722-0<br>
                    Fax: +49 441 9722-102
                </p>

                <h2>E-Mail</h2>
                <p><a href="mailto:institut@offis.de">institut at offis.de</a></p>

                <h2>Internet</h2>
                <p><a href="http://www.offis.de/" target="_blank" rel="noopener">www.offis.de</a></p>

                <h2>Board Members</h2>
                <ul>
                    <li>Prof. Dr. Sebastian Lehnhoff (chairman)</li>
                    <li>Prof. Dr. techn. Susanne Boll-Westermann</li>
                    <li>Prof. Dr.-Ing. Andreas Hein</li>
                    <li>Prof. Dr.-Ing. Astrid Nieße</li>
                </ul>

                <h2>Register Court</h2>
                <p>Amtsgericht Oldenburg<br>
                    Registration Number: VR 1956
                </p>

                <h2>VAT Identification Number</h2>
                <p>DE 811582102</p>

                <h2>Responsible in the sense of press law</h2>
                <p>Dr. Ing. Jürgen Meister<br>
                    <strong>OFFIS e.V.</strong><br>
                    Escherweg 2<br>
                    26121 Oldenburg
                </p>

                <h2>Privacy Policy</h2>
                <p>More about our privacy policy <a href="privacy.php" target="_blank" rel="noopener">here</a>.</p>
            </div>

        </article>
    </main>
    <script src="js/script.js"></script>

    <script>
        // Function to switch language content visibility and toggle flag button
        document.addEventListener("DOMContentLoaded", function () {
            let currentLanguage = localStorage.getItem("language") || "de";
            switchLanguage(currentLanguage, false); // Initialisiere ohne erneut zu speichern
        });

        function switchLanguage(language, save = true) {
            if (language === "en") {
                document.getElementById("content-en").style.display = "block";
                document.getElementById("content-de").style.display = "none";
                document.querySelector(".en-flag").style.display = "none";
                document.querySelector(".de-flag").style.display = "block";
                document.getElementById("impressum-title").innerText = "Imprint";
            } else {
                document.getElementById("content-de").style.display = "block";
                document.getElementById("content-en").style.display = "none";
                document.querySelector(".de-flag").style.display = "none";
                document.querySelector(".en-flag").style.display = "block";
                document.getElementById("impressum-title").innerText = "Impressum";
            }

            if (save) {
                localStorage.setItem("language", language);
            }
        }
    </script>

    <?php include $abs_path . '/php/include/footer.php'; ?>

</body>

</html>