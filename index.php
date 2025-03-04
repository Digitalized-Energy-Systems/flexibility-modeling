<?php
if (!isset($abs_path)) {
  require_once "path.php";
}

require_once $abs_path . '/php/controller/recommender-controller.php';

$pageTitle = "Recommender";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'home';
$sliderDefault = 9;
?>

<!DOCTYPE html>
<html>

<body>
  <?php include 'php/include/header.php'; ?>
  <?php include 'php/include/notifications.php'; ?>

  <main>
    <article class="standard-article">
      <div class="content-box">
        <h1>Welcome to the Flexibility Model Recommender!</h1>
        <section class="intro">
          <h2>Supporting Your Research in the Energy Domain</h2>
          <p>
            The flexibility model recommender is a tool designed to help you find relevant scientific papers and models
            on flexibility in the energy sector. It has been developed by the group <a
              href="https://www.offis.de/anwendungen/energie/distributed-artificial-intelligence.html">Distributed
              Artificial Intelligence</a> at <a href="https://www.offis.de/" target="_blank">OFFIS e.V.</a> in
            Oldenburg.
            <br><br>
            An increasing range of existing flexibility models and their respective published papers have been gathered,
            covering various aspects of the energy domain.
            Whether you're conducting research or working on a project that involves flexibility models, this
            recommender can guide you to the most relevant studies based on the parameters you set, which are
            largely based on and developed from the meta-research paper <a
              href="https://doi.org/10.1016/j.rser.2023.113570" target="_blank">A Review of Models for Energy System
              Flexibility Requirements and Potentials Using the New FLEXBLOX Taxonomy</a>, published in 2023.
          </p>
          <p><strong>Please note:</strong> The Flexibility Model Recommender is an ongoing development, and we
            continuously update and refine it to include more models and papers. We welcome feedback to help improve
            this tool for the research community.</p>
        </section>

        <!--<section class="how-it-works">
          <h2>How It Works</h2>
          <p>
            By adjusting the parameters in the <a href="recommender.php" target="_blank">Flexibility Model
              Recommender</a>, you can narrow down your search to find flexibility models
            that match your requirements.
            The tool then presents you with a list of models that meet or exceed your specified criteria, along with
            links to the corresponding research papers.
            This helps you quickly identify existing models that are most applicable to your work, saving you valuable
            time in the research process.
          </p>
        </section>-->

        <section class="get-started">
          <h2>Get Started</h2>
          <p>
            To begin, follow the <a target_blank href="help.php#help-tutorial">Step-by-Step guide</a> and explore the
            recommended models.
            The tutorial demonstrates how to use the <b><a href="recommender.php" target="_blank">Flexibility Model
                Recommender</a></b> by walking through a sample
            scenario of a <b>Virtual Power Plant (VPP)</b>. It covers the steps of exploring parameter options,
            selecting <b>mandatory</b>, <b>desired</b>, and <b>irrelevant</b> parameters for the scenario, adjusting
            match requirements, and retrieving matching flexibility models. By following these steps, users can
            efficiently identify the most suitable flexibility models for their specific needs.<br><br>
            If you need more information or have specific questions, feel free to <a href="contact.php"
              target="_blank">reach out to us</a>.
          </p>
        </section>
        <section class="nfdi4energy">

          <p>The authors would like to thank the German Federal Government, the German State Governments, and
            the Joint
            Science Conference (GWK) for their funding and support as part of the <a href="https://nfdi4energy.uol.de/"
              target="_blank">NFDI4Energy</a>. The work was (partially) funded by the German Research Foundation (DFG)
            under the National Research Data Infrastructure – NFDI4Energy – 501865131.</p>
        </section>
      </div>
    </article>

  </main>


  <script src="js/script.js"></script>
  <script src="js/tooltips.js"></script>
</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>