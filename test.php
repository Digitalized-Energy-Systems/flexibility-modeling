<?php
if (!isset($abs_path)) {
  require_once "path.php";
}

require_once $abs_path . '/php/controller/recommender-controller.php';

$pageTitle = "Recommender";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'recommender';
$sliderDefault = 9;
?>

<!DOCTYPE html>
<html>

<body>
  <?php include 'php/include/header.php'; ?>
  <?php include 'php/include/notifications.php'; ?>

  <main style="margin: 0 auto;">
    <section class="flextree" style="align-items: flex-start;">
      <div class="input-container">
        <div class="parameters-container">
          <div class="parameters-box">
            <h2>Parameters</h2>
            <!-- Flexibility -->
            <div class="form-group">
              <div class="parameter-header">

                <div class="parameter-label">
                  <span id="flexibilityToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Flexibility">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="flexibilityLabel" for="flexibility">Flexibility</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="flexibilityWeight" name="flexibilityWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="flexibilityCheck" data-state="0"
                    onchange="toggleTriState('flexibility')">
                  <label class="form-check-label" id="flexibilityCheckboxLabel" for="flexibilityCheck"></label>
                </div>
              </div>
              <select id="flexibility" class="form-control">
                <option value="potential" selected>Potential</option>
                <option value="requirement">Requirement</option>
                <option value="both">Both</option>
              </select>
            </div>

            <!-- Asset Types -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="assettypesToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Asset Types">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="assettypesLabel" for="assettypes">Asset Types</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="assettypesWeight" name="assettypesWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="assettypesCheck" data-state="0"
                    onchange="toggleTriState('assettypes')">
                  <label class="form-check-label" id="assettypesCheckboxLabel" for="assettypesCheck"></label>
                </div>
              </div>
              <span style="font-size:10px">(hold Ctrl/Cmd to select
                multiple)</span>
              <select id="assettypes" class="form-control" multiple>
                <option value="universal" selected>Universal</option>
                <option value="energy storage systems">Energy Storage Systems</option>
                <option value="demand response program">Demand Response Program</option>
                <option value="renewable energy sources">Renewable Energy Sources</option>
                <option value="distributed generation">Distributed Generation</option>
                <option value="flexible loads">Flexible Loads</option>
                <option value="grid infrastructure">Grid Infrastructure</option>
                <option value="electric vehicles">Electric Vehicles</option>
                <option value="interconnectors">Interconnectors</option>
              </select>
            </div>

            <!-- Classification -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="classificationToggle" class="info-icon" tabindex="0" data-toggle="popover"
                    data-trigger="focus" title="Classification">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="classificationLabel" for="classification">Classification</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="classificationWeight" name="classificationWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="classificationCheck" data-state="0"
                    onchange="toggleTriState('classification')">
                  <label class="form-check-label" id="classificationCheckboxLabel" for="classificationCheck"></label>
                </div>
              </div>
              <select id="classification" class="form-control" onchange="toggleClassificationDetails()">
                <option value="metric">Metric</option>
                <option value="machine learning model">Machine Learning Model</option>
                <option value="envelope">Envelope</option>
              </select>
            </div>

            <!-- Classification Details Option Envelope -->
            <div class="form-group nodisplay" id="classificationDetailsOption">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="classificationDetailsToggle" class="info-icon" tabindex="0" data-toggle="popover"
                    data-trigger="focus" title="ClassificationDetails">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="classificationDetailsLabel" for="classificationDetails">Classification Details</label>
                </div>
                <input type="text" class="parameter-weight nodisplay" id="classificationDetailsWeight"
                  name="classificationDetailsWeight" value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="classificationDetailsCheck" data-state="0"
                    onchange="toggleTriState('classificationDetails')">
                  <label class="form-check-label" id="classificationDetailsCheckboxLabel"
                    for="classificationDetailsCheck"></label>
                </div>
              </div>
              <select id="classificationDetails" class="form-control">
                <option value="time series - cumulative">Time Series - Cumulative</option>
                <option value="time series - non-cumulative">Time Series - Non-Cumulative</option>
                <option value="set - interval">Set - Interval</option>
                <option value="set - polytope - single-time-step">Set - Polytope - Single-Time-Step</option>
                <option value="set - polytope - multi-time-step">Set - Polytope - Multi-Time-Step</option>
              </select>
            </div>

            <!-- Type -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="typeToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Type">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="typeLabel" for="type">Type</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="typeWeight" name="typeWeight" value="10" min="1"
                  max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" data-state="0" type="checkbox" id="typeCheck"
                    onchange="toggleTriState('type')">
                  <label class="form-check-label" id="typeCheckboxLabel" for="typeCheck"></label>
                </div>
              </div>
              <select id="type" class="form-control">
                <option value="deterministic">Deterministic</option>
                <option value="probabilistic">Probabilistic</option>
              </select>
            </div>

            <!-- Time -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="timeToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Time">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="timeLabel" for="time">Time</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="timeWeight" name="timeWeight" value="10" min="1"
                  max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="timeCheck" data-state="0"
                    onchange="toggleTriState('time')">
                  <label class="form-check-label" id="timeCheckboxLabel" for="timeCheck"></label>
                </div>
              </div>
              <select id="time" class="form-control">
                <option value="discrete">Discrete</option>
                <option value="continuous">Continuous</option>
              </select>
            </div>


          </div>
          <!-- 2nd column -->
          <div class="parameters-box">
            <!-- Metric -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="metricToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Metric">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="metricLabel" for="metric">Metric</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="metricWeight" name="metricWeight" value="10"
                  min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="metricCheck" data-state="0"
                    onchange="toggleTriState('metric')">
                  <label class="form-check-label" id="metricCheckboxLabel" for="metricCheck"></label>
                </div>
              </div>
              <span style="font-size:10px">(hold Ctrl/Cmd to select
                multiple)</span>
              <select id="metric" class="form-control" multiple>
                <option value="active power" selected>Active power</option>
                <option value="ramp-rate">Ramp-rate</option>
                <option value="reactive power">Reactive power</option>
                <option value="energy">Energy</option>
                <option value="voltage">Voltage</option>
                <option value="cost">Cost</option>
                <option value="time">Time</option>
                <option value="ramp duration">Ramp duration</option>

              </select>
            </div>

            <!-- Constraints -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="constraintsToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Constraints">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="constraintsLabel" for="constraints">Constraints</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="constraintsWeight" name="constraintsWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="constraintsCheck" data-state="0"
                    onchange="toggleTriState('constraints')">
                  <label class="form-check-label" id="constraintsCheckboxLabel" for="constraintsCheck"></label>
                </div>
              </div>
              <span style="font-size:10px">(hold Ctrl/Cmd to select
                multiple)</span>
              <select id="constraints" class="form-control" multiple>
                <option value="technical" selected>technical</option>
                <option value="economic">economic</option>
                <option value="service guarantees">service guarantees</option>
              </select>
            </div>

            <!-- Resolution -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="resolutionToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Resolution">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="resolutionLabel" for="resolution">Resolution</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="resolutionWeight" name="resolutionWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="resolutionCheck" data-state="0"
                    onchange="toggleTriState('resolution')">
                  <label class="form-check-label" id="resolutionCheckboxLabel" for="resolutionCheck"></label>
                </div>
              </div>
              <select id="resolution" class="form-control">
                <option value="short-term" selected>Short-term</option>
                <option value="long-term">Long-term</option>
                <option value="both">Both</option>
              </select>
            </div>


            <!-- Sector Coupling -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="sectorcouplingToggle" class="info-icon" tabindex="0" data-toggle="popover"
                    data-trigger="focus" title="Sector Coupling">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="sectorcouplingLabel" for="sectorcoupling">Sector Coupling</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="sectorcouplingWeight" name="sectorcouplingWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="sectorcouplingCheck" data-state="0"
                    onchange="toggleTriState('sectorcoupling')">
                  <label class="form-check-label" id="sectorcouplingCheckboxLabel" for="sectorcouplingCheck"></label>
                </div>
              </div>
              <select id="sectorcoupling" class="form-control">
                <option value="heat" selected>Heat</option>
                <option value="gas">Gas</option>
                <option value="both">Both</option>
              </select>
            </div>
            <!-- Multi-time-scale -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="multitimescaleToggle" class="info-icon" tabindex="0" data-toggle="popover"
                    data-trigger="focus" title="Multi-time-scale">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="multitimescaleLabel" for="multitimescale">Multi-time-scale</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="multitimescaleWeight" name="multitimescaleWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="multitimescaleCheck" data-state="0"
                    onchange="toggleTriState('multitimescale')">
                  <label class="form-check-label" id="multitimescaleCheckboxLabel" for="multitimescaleCheck"></label>
                </div>
              </div>
            </div>
            <!-- Mediator -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="mediatorToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Mediator">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="mediatorLabel" for="mediator">Mediator</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="mediatorWeight" name="mediatorWeight" value="10"
                  min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="mediatorCheck" data-state="0"
                    onchange="toggleTriState('mediator')">
                  <label class="form-check-label" id="mediatorCheckboxLabel" for="mediatorCheck"></label>
                </div>
              </div>

            </div>

            <!-- Uncertainty -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="uncertaintyToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Uncertainty">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="uncertaintyLabel" for="uncertainty">Uncertainty</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="uncertaintyWeight" name="uncertaintyWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="uncertaintyCheck" data-state="0"
                    onchange="toggleTriState('uncertainty')">
                  <label class="form-check-label" id="uncertaintyCheckboxLabel" for="uncertaintyCheck"></label>
                </div>
              </div>

            </div>


            <!-- Aggregation -->
            <div class="form-group">
              <div class="parameter-header">
                <div class="parameter-label">
                  <span id="aggregationToggle" class="info-icon" tabindex="0" data-toggle="popover" data-trigger="focus"
                    title="Aggregation">
                    <i class="bi bi-info-circle"></i></span>
                  <label id="aggregationLabel" for="aggregation">Aggregation</label>
                </div>
                <input type="text" class="parameter-weight hidden" id="aggregationWeight" name="aggregationWeight"
                  value="10" min="1" max="100" title="Weight of the parameter">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="aggregationCheck" data-state="0"
                    onchange="toggleTriState('aggregation')">
                  <label class="form-check-label" id="aggregationCheckboxLabel" for="aggregationCheck"></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="parameter-legend">
          Legend:
          <input class="form-check-input" type="checkbox">
          <label class="form-check-label checked">
            mandatory</label>
          <input class="form-check-input" type="checkbox">
          <label class="form-check-label"> desired</label>

          <input class="form-check-input" type="checkbox">
          <label class="form-check-label exclamation">
            irrelevant</label>
        </div>

        <div class="settings-container">
          <h2>Settings</h2>
          <label for="flexibility">Choose the minimum number of matches of desired parameters:</label>
          <div class="slidecontainer">
            <input type="range" min="1" max="13" value="<?= $sliderDefault ?>" class="slider" id="myRange">
            <p>Value: <span id="demo"></span></p>
          </div>
          <div class="showWeightsCheckbox" style="display:none">
            <input type="checkbox" id="toggleVisibility">
            <label for="toggleVisibility">Show Parameter Weights (uncheck for value reset)</label>
          </div>
        </div>
        <hr>
        <div>
          <div class="form-group">
            <button id="generateButton">Show Models</button>

          </div>
          <?php if (isset($_SESSION['debug']) && $_SESSION['debug']): ?>
            <div class="form-group">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#jsonModal">Show JSON
                Tree</button>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </section>
    <section class="flextree-result">
      <div id="modelsContainer"></div>
    </section>

    <section class="json-test">
      <div class="modal fade" id="jsonModal" tabindex="-1" role="dialog" aria-labelledby="jsonModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="jsonModalLabel">JSON Tree</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <pre id="jsonData"></pre>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <script>

    function toggleClassificationDetails() {
      var classification = document.getElementById('classification').value;
      var detailsOption = document.getElementById('classificationDetailsOption');

      if (classification === 'envelope') {
        detailsOption.classList.remove('nodisplay');
      } else {
        detailsOption.classList.add('nodisplay');
      }
    }

    // Toggle visibility of weight
    document.getElementById('toggleVisibility').addEventListener('change', function () {
      const elements = document.querySelectorAll('.parameter-weight');
      elements.forEach(element => {
        if (this.checked) {
          element.classList.remove('hidden');
        } else {
          element.classList.add('hidden');
          element.value = 10;
        }
      });
    });

    // Slider logic
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = this.value;
    }

    function toggleTriState(parameter) {
      const label = document.getElementById(parameter + 'CheckboxLabel');
      const checkbox = document.getElementById(parameter + 'Check');

      // Get the current state from the data attribute and convert to an integer
      let state = parseInt(checkbox.getAttribute('data-state'));

      // Remove all state classes
      label.classList.remove('checked', 'exclamation');

      // Increment state and wrap around if necessary
      state = (state + 1) % 3;

      // Apply the new state class
      if (state === 1) {
        label.classList.add('checked');
      } else if (state === 2) {
        label.classList.add('exclamation');
      }
      // Update the data-state attribute with the new state
      checkbox.setAttribute('data-state', state);

      // Call the function to handle enabling/disabling select fields
      toggleSelectFlexibility(parameter, state);
    }

    // JavaScript function to toggle the disabled property of the select field
    function toggleSelectFlexibility(parameter, state) {
      var select = document.getElementById(parameter);
      var selectWeight = document.getElementById(parameter + 'Weight');
      var selectLabel = document.getElementById(parameter + 'Label');
      var selectCheckboxLabel = document.getElementById(parameter + 'CheckboxLabel');

      if (state === 0) {
        if (select) select.disabled = false;
        selectWeight.disabled = false;
        selectLabel.style.fontWeight = "normal";
        selectCheckboxLabel.title = "Parameter is desired"
      } else if (state === 1) {
        if (select) select.disabled = false;
        selectWeight.disabled = false;
        selectLabel.style.fontWeight = "bold";
        selectCheckboxLabel.title = "Parameter is mandatory";
      } else if (state === 2) {
        if (select) select.disabled = true;
        selectWeight.disabled = true;
        selectLabel.style.fontWeight = "normal";
        selectCheckboxLabel.title = "Parameter is irrelevant"
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      try {
        // Attach to window to make it globally accessible
        window.flexmodels = <?php echo json_encode($flexmodelslist) ?: '[]'; ?>;
        console.log('Loaded models:', window.flexmodels);

        $('.btn-primary').click(function () {
          $('#jsonData').html(JSON.stringify(window.flexmodels, null, 2));  // Pretty print JSON data in modal
        });
      } catch (error) {
        console.error("Failed to parse models data: ", error);
      }
    });

  </script>

  <script src="js/script.js"></script>
  <script src="js/tooltips.js"></script>
</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>