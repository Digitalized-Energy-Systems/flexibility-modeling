<?php
require_once 'php/controller/help-controller.php';

$pageTitle = "Privacy";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'privacy';
?>

<!DOCTYPE html>
<html>

<body>
    <?php include 'php/include/header.php'; ?>
    <?php include 'php/include/notifications.php'; ?>

    <main>
        <article class="standard-article">
            <h1>Privacy Policy</h1>
            <div class="content-box">
                <p>We welcome you to our website. We would like to inform you about the management of your personal data
                    in accordance with Art. 13 General Data Protection Regulation (GDPR).</p>

                <h2>Controller</h2>
                <p>The controller responsible for the described data collection and processing is:</p>
                <address>
                    <strong>OFFIS e.V.</strong><br>
                    Escherweg 2,<br>
                    26121 Oldenburg, Germany
                </address>

                <h2>Data Usage</h2>
                <p>When you visit our website, data collected from the use of the website is temporarily stored on our
                    web server for statistical purposes to improve the quality of our website. This data set contains:
                </p>
                <ul>
                    <li>The page from which the data is requested</li>
                    <li>The name of the data file</li>
                    <li>The date and time of the query</li>
                    <li>The amount of data transferred</li>
                    <li>The access status (file transmitted, file not found)</li>
                    <li>A description of the type of browser used</li>
                    <li>The IP address of the requesting computer, shortened to prevent reidentification of any personal
                        data</li>
                </ul>
                <p>The listed usage data is stored anonymously. The legal basis for the processing of this personal data
                    is provided for in Art. 6 para. 1 lit. f GDPR.</p>

                <h2>Data Transfer to Third Parties</h2>
                <p>We do not transfer your personal data to third parties.</p>

                <h2>Cookies</h2>
                <p>On our website, we use cookies necessary for its operation. Cookies are small text files that can be
                    stored and read on your device. There are:</p>
                <ul>
                    <li><strong>Session cookies:</strong> deleted when you close your browser</li>
                    <li><strong>Permanent cookies:</strong> stored beyond the individual session</li>
                </ul>
                <p>We do not use these cookies for analysis, tracking, or advertising purposes. Some may be necessary to
                    enable user guidance, security, and functionality of the site. We use these cookies based on Art. 6
                    para. 1 sentence 1 lit. f GDPR in the interest of optimizing user guidance and adapting our
                    website’s presentation.</p>
                <p>You can configure your browser to inform you about the placement of cookies, allowing you to control
                    or delete cookies anytime. Please note that some functions may not be available for technical
                    reasons if cookies are disabled.</p>

                <h2>Data Security</h2>
                <p>To avoid unauthorized access to your data, we have implemented technical and organizational measures.
                    We use encryption technologies on our website, ensuring that your data is transferred securely via a
                    connection protected by TLS encryption. You can recognize an encryption-secured website by the lock
                    icon in the browser's address bar, which starts with "https://".</p>

                <h2>Anonymous Visitor Measurement</h2>
                <p>We carry out anonymous visitor measurement on our websites. For this purpose, the protocol data of
                    the web server and the shortened IP address are evaluated. This process does not allow conclusions
                    about your person.</p>

                <h2>Your Rights as a User</h2>
                <p>As a website user, the GDPR grants you certain rights when processing your personal data:</p>
                <ul>
                    <li><strong>Right of access (Art. 15 GDPR):</strong> You have the right to obtain confirmation on
                        whether your personal data is being processed and, if so, access to the data and information
                        specified in Art. 15 GDPR.</li>
                    <li><strong>Right to rectification and erasure (Art. 16 and 17 GDPR):</strong> You have the right to
                        correct inaccurate personal data concerning you and, if necessary, complete incomplete data. You
                        also have the right to request erasure of your data without undue delay if certain conditions in
                        Art. 17 GDPR apply.</li>
                    <li><strong>Right to restriction of processing (Art. 18 GDPR):</strong> Under specific circumstances
                        listed in Art. 18 GDPR, you have the right to restrict processing to mere storage.</li>
                    <li><strong>Right to data portability (Art. 20 GDPR):</strong> In certain situations, you have the
                        right to receive your data in a structured, commonly used, machine-readable format or request
                        that it be transmitted to another controller.</li>
                    <li><strong>Right to object (Art. 21 GDPR):</strong> If your data is processed based on legitimate
                        interests (Art. 6 para. 1 lit. f GDPR), you have the right to object at any time for reasons
                        arising from your particular situation.</li>
                    <li><strong>Right to lodge a complaint with a supervisory authority:</strong> According to Art. 77
                        GDPR, you have the right to lodge a complaint if you consider the processing of your data to
                        infringe data protection regulations.</li>
                </ul>

                <h2>Contact Details of the Data Protection Officer</h2>
                <p>If you have further questions, suggestions, or wishes regarding data protection, please contact our
                    data protection officer:</p>
                <address>
                    Dr. Uwe Schläger<br>
                    <strong>datenschutz nord GmbH</strong><br>
                    Web: <a href="http://www.datenschutz-nord-gruppe.de">www.datenschutz-nord-gruppe.de</a><br>
                    Email: <a href="mailto:office@datenschutz-nord.de">office@datenschutz-nord.de</a><br>
                    Phone: +49 421 69 66 32 0
                </address>
            </div>
        </article>
    </main>
    <script src="js/script.js"></script>

</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>