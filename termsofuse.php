<?php
require_once 'php/controller/help-controller.php';

$pageTitle = "Terms of Use";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'termsofuse';
?>

<!DOCTYPE html>
<html>

<body>
    <?php include 'php/include/header.php'; ?>
    <?php include 'php/include/notifications.php'; ?>

    <main>
        <article class="standard-article">
            <h1>Terms of Use</h1>

            <div class="content-box">
                <p><strong>Effective Date:</strong> October 15, 2024</p>

                <p>These Terms of Use govern the use of this website and the related services provided by us.
                    By using our website, you agree to these Terms of Use and our Privacy Policy. If you do not agree
                    with these terms, please do not use our website.</p>

                <h2>1. ACCESS TO THE WEBSITE</h2>
                <p><strong>1.1.</strong> The use of our website is only permitted for individuals who have reached the
                    legal minimum age and are authorized to use the website in their country or region.</p>
                <p><strong>1.2.</strong> You are responsible for ensuring that all information you provide to us is
                    accurate and up-to-date.</p>

                <h2>2. INTELLECTUAL PROPERTY</h2>
                <p><strong>2.1.</strong> The content on our website, including text, graphics, logos, images, audio or
                    video clips, and software, is protected by copyright and belongs to us or our licensors.</p>
                <p><strong>2.2.</strong> You may not reproduce, distribute, modify, or otherwise use the content on our
                    website without our explicit consent.</p>

                <h2>3. USAGE RESTRICTIONS</h2>
                <p><strong>3.1.</strong> You agree not to use our website for illegal purposes or engage in actions that
                    violate these Terms of Use.</p>
                <p><strong>3.2.</strong> You are prohibited from jeopardizing the security of our website, disrupting
                    its functionality, or accessing it without authorization.</p>

                <h2>4. LIMITATION OF LIABILITY</h2>
                <p><strong>4.1.</strong> We are not liable for direct, indirect, incidental, or consequential damages
                    arising from the use or inability to use our website.</p>
                <p><strong>4.2.</strong> We do not take responsibility for the accuracy, completeness, or reliability of
                    third-party content available on our website.</p>

                <h2>5. CHANGES TO THE TERMS OF USE</h2>
                <p><strong>5.1.</strong> We reserve the right to change these Terms of Use at any time. Any changes will
                    take effect immediately upon their publication on our website.</p>

                <h2>6. APPLICABLE LAW AND JURISDICTION</h2>
                <p><strong>6.1.</strong> These Terms of Use are governed by the laws of Germany. For any disputes
                    arising from or in connection with these Terms of Use, the courts in Germany shall have exclusive
                    jurisdiction.</p>
            </div>

        </article>
    </main>
    <script src="js/script.js"></script>

</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>