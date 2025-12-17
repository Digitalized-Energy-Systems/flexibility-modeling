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
              The Flexibility Model Recommender is a tool designed to help you find relevant scientific papers and models
              on flexibility in the energy sector. It has been developed by the group
              <a href="https://www.offis.de/anwendungen/energie/distributed-artificial-intelligence.html">
                Distributed Artificial Intelligence
              </a>
              at <a href="https://www.offis.de/" target="_blank">OFFIS e.V.</a> in Oldenburg.
            </p>

            <p>
              An increasing range of flexibility models and their respective scientific publications has been collected,
              covering various perspectives and applications within the energy domain.
              Whether you are conducting academic research or working on an applied project, this recommender helps you
              identify suitable models based on a structured set of parameters.
              These parameters are largely based on, and derived from, the meta-research paper
              <a href="https://doi.org/10.1016/j.rser.2023.113570" target="_blank">
                A Review of Models for Energy System Flexibility Requirements and Potentials Using the New FLEXBLOX Taxonomy
              </a>
              (2023).
            </p>

            <h2>What Is Flexibility in the Energy Domain?</h2>

            <p>
              In the energy domain, <strong>flexibility</strong> describes the ability of energy systems, assets, or actors
              to adapt their behavior over time in response to changing conditions.
              These conditions may include fluctuations in electricity demand, variability of renewable energy sources,
              grid constraints, or market signals.
              Flexibility can be provided by modifying generation, consumption, storage, or their temporal characteristics.
            </p>

            <p>
              A <strong>flexibility model</strong> is a formal representation of this adaptive capability.
              It specifies what aspects of an energy system can be adjusted, to what extent, how quickly, under which
              technical or operational constraints, and with which objectives or consequences.
              Such models are used in simulation, optimization, and control approaches to analyze, compare, and coordinate
              flexible energy resources in modern and future energy systems.
            </p>

            <p>
              <strong>Please note:</strong> The Flexibility Model Recommender is an ongoing development.
              We continuously update and refine it to include additional models and publications.
              Feedback from the research community is highly welcome and helps improve the quality and coverage of this tool.
            </p>
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
          <h2>Getting Started</h2>
          <p>
            To begin, follow the <a target_blank href="help.php#help-tutorial">Step-by-Step guide</a> and explore the
            recommended models.
            The tutorial demonstrates how to use the <b><a href="recommender.php" target="_blank">Flexibility Model
                Recommender</a></b> by walking through a sample
            scenario of a <b>Virtual Power Plant (VPP)</b>. It covers the steps of exploring parameter options,
            selecting <b>mandatory</b> and <b>desired</b> parameters for the scenario, adjusting
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