<?php
if (!isset($abs_path)) {
  require_once "path.php";
}

require_once $abs_path . '/php/controller/recommender-controller.php';

$pageTitle = "Recommender";
include $abs_path . '/php/include/head.php';
$_SESSION['currentpage'] = 'recommender';
$sliderDefault = 0;
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
              <select id="flexibility" onchange="updateConfigCode()" class="form-control">
                <option value="potential" selected>Potential</option>
                <option value="requirement">Requirement</option>
                <option value="both">Both</option>
              </select>
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
            <hr>
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
              <select id="assettypes" class="form-control" multiple onchange="updateConfigCode()">
                <optgroup label="Electric-Domain Assets">
                  <option value="renewable generation" selected>Renewable Generation</option>
                  <option value="conventional generation">Conventional Generation</option>
                  <option value="distributed generation">Distributed Generation</option>
                  <option value="electric vehicles">Electric Vehicles</option>
                  <option value="flexible loads">Flexible Loads</option>
                  <option value="battery storage systems">Battery Storage Systems</option>
                </optgroup>
                <optgroup label="Thermal / Multi-Energy Assets">
                  <option value="grid infrastructure">Grid Infrastructure</option>
                  <option value="multi-energy system">Multi-Energy System</option>
                  <option value="chp units">CHP Units</option>
                  <option value="heat pumps">Heat Pumps</option>
                  <option value="thermal energy storage">Thermal Energy Storage</option>
                </optgroup>
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
              <select id="classification" class="form-control">
                <option value="metric">Metric</option>
                <option value="machine learning model">Machine Learning Model</option>
                <option value="envelope">Envelope</option>
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
            <hr>
            
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

        <small class="parameter-legend">
          Legend:
          <input class="form-check-input" type="checkbox">
          <label class="form-check-label checked">
            mandatory</label>
          <input class="form-check-input" type="checkbox">
          <label class="form-check-label"> desired</label>

          <input class="form-check-input" type="checkbox">
          <label class="form-check-label exclamation">
            irrelevant</label>
            
        </small>
          <div class="standard-buttons">
            <button id="generateButton" style="margin-bottom: 15px;">🔍 Show Models</button>
            <button id="shareButton" style="margin-bottom: 15px;">🔗 Share</button>

          </div>
          <div id="shareSuccess" class="text-success" style="font-size: 0.9em; display: none; text-align:center; margin-bottom: 10px;"></div>



        <div class="settings-container">
          <h2>Settings</h2>
          <label for="flexibility">Choose the minimum number of matches of desired parameters:</label>
          <div class="slidecontainer">
            <input type="range" min="0" max="13" value="<?= $sliderDefault ?>" class="slider" id="myRange">
            <p><span id="sliderValue"></span></p>
          </div>
          <div class="showWeightsCheckbox" style="display:none">
            <input type="checkbox" id="toggleVisibility">
            <label for="toggleVisibility">Show Parameter Weights (uncheck for value reset)</label>
          </div>
        </div>
        
        <div class="configuration-container">

         <h2>Configuration Code:</h2>
          <small style="font-size: 0.8em; color: #555;">
            You can also load a configuration via <code>?config=...</code> in the URL.
          </small>
          <div class="config-wrapper" style="position: relative;">
            <input type="text" id="configCode" class="form-control" aria-label="Configuration Code">
            <span id="configCodeStatus" class="config-icon"
              style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 1.2em;"></span>
          </div>
          
          <div id="configError" class="text-danger" style="font-size: 0.9em; display: none;"></div>
          <div id="configSuccess" class="text-success" style="font-size: 0.9em; display: none;"></div>
          <div id="copySuccess" class="text-success" style="font-size: 0.9em; display: none; margin-top: 5px;"></div>
          <div class="standard-buttons">
            <button id="loadButton">🔄 Load</button>
            <button id="copyButton">📋 Copy</button>

            <button id="resetButton">↺ Reset</button>
          </div>

        </div>
        <div>
          <div class="standard-buttons">
            <button id="exportPdfButton" >📄 Export Results as PDF</button>
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

    const slider = document.getElementById("myRange");
    const sliderLabel = document.getElementById("sliderValue");

    // Initial label when page loads
    sliderLabel.textContent = `Matching Threshold: ${slider.value} of ${slider.max}`;

    // Update label when slider is moved
    slider.addEventListener("input", function () {
      sliderLabel.textContent = `Matching Threshold: ${this.value} of ${this.max}`;
    });

    document.addEventListener('DOMContentLoaded', () => {
      const inputs = [
        'param_flexibility',
        'param_assettypes'
      ];

      inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener('change', updateConfigCode);
        }
      });

      // Trigger once at start
      updateConfigCode();
    });

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
  <script src="js/configuration.js"></script>
  <script src="js/models.js"></script>

</body>
<?php include $abs_path . '/php/include/footer.php'; ?>

</html>