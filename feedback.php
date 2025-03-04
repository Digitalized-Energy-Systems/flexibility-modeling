<?php
require_once 'php/controller/help-controller.php';

$pageTitle = "Feedback";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'feedback';
?>

<!DOCTYPE html>
<html>

<head>
    <style>
        /* Default styles for the form */
        .form-group {
            margin-bottom: 20px;
        }

        textarea {
            width: 100%;
            padding: 10px;
            font-size: 14px;
        }

        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }

        /* Print-specific styles */
        @media print {

            /* Hide all elements except the feedback form */
            body * {
                visibility: hidden;
            }

            #surveyForm,
            #surveyForm * {
                visibility: visible;
            }

            #surveyForm {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }

            #printButton {
                visibility: hidden;
            }
        }
    </style>
</head>

<body>
    <?php include 'php/include/header.php'; ?>
    <?php include 'php/include/notifications.php'; ?>

    <main>
        <article class="standard-article">
            <div class="content-box">
                <h1>Feedback</h1>
                <p>Please answer the following questions. Once completed, you can print the page as PDF and send it to
                    one of the <a target=_blank href="contact.php">contacts</a>.</p>

                <form id="surveyForm">
                    <div class="form-group">
                        <label for="question1">1. How can we improve the design and usability of our website?</label>
                        <textarea id="question1" name="question1" rows="4" placeholder="Your answer here..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="question2">2. What features would you like to see added?</label>
                        <textarea id="question2" name="question2" rows="4" placeholder="Your answer here..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="question3">3. What do you think about the choice of parameters used to categorize
                            flexibility models?</label>
                        <textarea id="question3" name="question3" rows="4" placeholder="Your answer here..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="question4">4. Are there any flexibility models or publications that should be added
                            to the database?</label>
                        <textarea id="question4" name="question4" rows="4" placeholder="Your answer here..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="question5">5. Any additional comments or feedback?</label>
                        <textarea id="question5" name="question5" rows="4" placeholder="Your answer here..."></textarea>
                    </div>

                    <button type="button" id="printButton" onclick="printSurvey()">Print Feedback</button>
                </form>
            </div>
        </article>
    </main>

    <script>
        function printSurvey() {
            // Open print dialog for the current page
            window.print();
        }
    </script>
    <script src="js/script.js"></script>
</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>