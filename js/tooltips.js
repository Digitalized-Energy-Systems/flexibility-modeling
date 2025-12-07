$(document).ready(function () {

  // Helper: create and show a Bootstrap modal with given id/title/content
  function createAndShowModal(modalId, title, contentHtml) {
    if (!document.getElementById(modalId)) {
      const modalHtml = '\n<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="' + modalId + 'Label" aria-hidden="true">\n  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="' + modalId + 'Label">' + title + '</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">' + contentHtml + '</div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n';
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    $('#' + modalId).modal('show');
  }

  // Flexibility help (was popover)
  $('#flexibilityToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = '<ul>' +
      '<li><strong>Flexibility Potential:</strong> Represents the capability of flexibility resources (like energy storage, demand response) to adjust their power output or consumption, providing essential services like energy supply or demand balance.</li>' +
      '<li><strong>Flexibility Requirement:</strong> Refers to the overall needs of the power system for flexible resources to maintain stable operations and adapt to variability, such as that from renewable energy sources. This quantifies the adjustments necessary across the system to ensure reliability and prevent disruptions.</li>' +
      '</ul>';
    createAndShowModal('flexibilityModal', 'Flexibility', content);
  });

  // Flexibility mediator help (was popover)
  $('#mediatorToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = 'Facilitates the matching of flexibility requirements with flexibility potentials within an energy system. It acts as an intermediary that helps integrate and optimize the use of available flexibility resources, ensuring that the power system can efficiently respond to fluctuations in demand and supply. Common examples of flexibility mediators include the power grid itself, which redistributes energy, and market mechanisms that allow for the trading of flexibility services to balance the system.';
    createAndShowModal('mediatorModal', 'Flexibility Mediator', content);
  });

  // Replace small popover for asset types with a modal for long, structured content
  (function () {
    const modalId = 'assetTypesModal';
    if (!document.getElementById(modalId)) {
      const modalHtml = '\n<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="assetTypesModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="assetTypesModalLabel">Asset Types</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        <ul>\n          <li><strong>Renewable Generation</strong>: Electricity generated from renewable sources such as wind and solar; typically variable and often requiring flexibility resources to integrate reliably.</li>\n          <li><strong>Conventional Generation</strong>: Dispatchable thermal or fossil-based generation units that can provide firm power and reserve capacity.</li>\n          <li><strong>Grid Infrastructure</strong>: Transmission and distribution assets, grid controls and interconnectors that enable power flows and system-level flexibility.</li>\n          <li><strong>Multi-Energy System</strong>: Systems integrating multiple energy vectors (electricity, heat, gas) enabling cross-vector flexibility and sector coupling.</li>\n          <li><strong>CHP Units</strong>: Combined heat and power plants that produce electricity and useful heat, offering flexible operation opportunities through co-optimization.</li>\n          <li><strong>Heat Pumps</strong>: Electrically driven heating/cooling devices that can be operated flexibly to shift demand across time.</li>\n          <li><strong>Thermal Energy Storage</strong>: Systems that store thermal energy (e.g., hot water tanks, chilled storage) to shift heating/cooling loads and provide flexibility.</li>\n          <li><strong>Distributed Generation</strong>: Small-scale generation located close to demand (e.g., rooftop PV, small gas engines) that can be coordinated for local flexibility.</li>\n          <li><strong>Electric Vehicles</strong>: Vehicles with smart charging or vehicle-to-grid capability that can act as flexible loads or distributed storage.</li>\n          <li><strong>Flexible Loads</strong>: Demand-side resources (industrial, commercial, or residential) that can be shifted or curtailed to provide system flexibility.</li>\n          <li><strong>Battery Storage Systems</strong>: Electrochemical storage units (BESS) used to absorb, store and release electricity, providing fast and controllable flexibility.</li>\n        </ul>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n';
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Open modal on toggle click instead of showing popover
    $('#assettypesToggle').off('focus.popover click').on('click', function (e) {
      e.preventDefault();
      $('#' + modalId).modal('show');
    });
  })();

  // Flexibility Type (modal)
  $('#typeToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = '<ul>' +
      '<li><strong>Deterministic</strong>: Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.</li>' +
      '<li><strong>Probabilistic</strong>: Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.</li>' +
      '</ul>';
    createAndShowModal('typeModal', 'Flexibility Type', content);
  });

  // Uncertainty (modal)
  $('#uncertaintyToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = 'Refers to the unpredictability associated with various factors that affect the balance between electricity supply and demand. This includes variability in renewable energy production due to weather conditions, fluctuations in consumer demand, and potential equipment malfunctions or failures. Addressing uncertainty in flexibility models is crucial for ensuring that the power system can reliably handle unexpected changes and maintain stability under diverse operational conditions.';
    createAndShowModal('uncertaintyModal', 'Uncertainty', content);
  });

  // Aggregation (modal)
  $('#aggregationToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = 'Refers to the model\'s ability to combine multiple smaller units of flexibility resources (like residential batteries, electric vehicles, or demand response participants) into a single, manageable entity. This aggregation allows for more effective coordination and utilization of distributed resources, enhancing their overall impact on grid stability and efficiency. By treating multiple small-scale assets as a unified group, operators can deploy flexibility more strategically, optimizing responses to grid demands and reducing operational complexities.';
    createAndShowModal('aggregationModal', 'Aggregation', content);
  });

  // Time (modal)
  $('#timeToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = '<ul>' +
      '<li><strong>Discrete</strong>: Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.</li>' +
      '<li><strong>Continuous</strong>: Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.</li>' +
      '</ul>';
    createAndShowModal('timeModal', 'Time', content);
  });

  // Metric (modal)
  $('#metricToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = '<ul>' +
      '<li><strong>Active power:</strong>  The real component of power that performs actual work in an electrical system, typically measured in watts (W) or megawatts (MW).</li>' +
      '<li><strong>Ramp-Rate:</strong> The rate at which power output can be increased or decreased, usually measured in megawatts per minute (MW/min), indicating the flexibility of power generation or consumption.</li>' +
      '<li><strong>Reactive power:</strong> The imaginary component of power that does not perform work but is necessary to maintain voltage levels for the stability of the power system, usually measured in volt-amperes reactive (VAR).</li>' +
      '<li><strong>Energy:</strong> The total amount of work performed or electricity consumed over a period, typically measured in kilowatt-hours (kWh) or megawatt-hours (MWh).</li>' +
      '<li><strong>Voltage:</strong> The electric potential difference between two points in a circuit, which drives the current through the electrical system, typically measured in volts (V).</li>' +
      '</ul>';
    createAndShowModal('metricModal', 'Metric', content);
  });

  // Multi-time-scale (modal)
  $('#multitimescaleToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = 'If checked, it implies that the specific flexibility model under consideration ' +
      'is capable of integrating and analyzing flexibility across multiple time scales (short-term, medium-term, long-term) simultaneously or dynamically. This ' +
      'means the model can handle and optimize flexibility requirements and resources across these different scales in a cohesive manner, which is essential for ' +
      'comprehensive energy system planning and operation.';
    createAndShowModal('multitimescaleModal', 'Multi-time-scale', content);
  });

  // Constraints (modal)
  $('#constraintsToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = '<ul>' +
      '<li><strong>Technical:</strong> Define the physical limits of power system components, such as maximum power output and ramp rates.</li>' +
      '<li><strong>Service Guarantee:</strong> Ensure that flexibility resources meet specific performance and reliability standards, such as response times and availability.</li>' +
      '<li><strong>Economic:</strong> Focus on minimizing operational costs and optimizing financial outcomes from managing flexibility resources.</li>' +
      '</ul>';
    createAndShowModal('constraintsModal', 'Constraints', content);
  });

  // Resolution (modal)
  $('#resolutionToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = 'Refers to the time granularity considered for analyzing power system operations and planning.<br><br><ul>' +

      '<li><strong>Short-term:</strong> Focuses on immediate operational decisions, covering minutes to a day, essential for dispatching resources and managing real-time fluctuations in power supply.</li>' +
      '<li><strong>Long-term:</strong> Used for strategic planning over weeks to years, crucial for infrastructure development, integration of renewables, and long-term investment decisions.</li>' +
      '</ul>';
    createAndShowModal('resolutionModal', 'Resolution', content);
  });

  // Classification (modal)
  $('#classificationToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = '<ul>' +
      '<li><strong>Metric: </strong> Uses predefined parameters to either deterministically quantify flexibility without considering uncertainties or Measures the likelihood of various flexibility scenarios using statistical methods.</li>' +
      '<li><strong>Machine Learning Model:</strong> Employs machine learning techniques to predict and optimize flexibility based on historical data.</li>' +
      '<li><strong>Envelope:</strong> Defines the operational boundaries or limits within which flexibility can be effectively measured or maintained. This includes the range of acceptable inputs, outputs, and constraints on flexibility metrics or predictions.</li>' +
      '</ul>';
    createAndShowModal('classificationModal', 'Classification', content);
  });

  // Sector coupling (modal)
  $('#sectorcouplingToggle').off('click').on('click', function (e) {
    e.preventDefault();
    const content = 'The consideration of sector coupling depends on whether the flexibility resources involve multiple energy vectors, specifically heat and gas. Sector-coupled flexibility resources can include individual units such as CHP (Combined Heat and Power) plants and electrolyzers, or entire systems like gas networks.';
    createAndShowModal('sectorcouplingModal', 'Sector Coupling', content);
  });

  // Authors (modal)
  $('#toggle-authors').off('click').on('click', function (e) {
    e.preventDefault();
    const content = '<span></span>';
    createAndShowModal('authorsModal', 'Authors', content);
  });
});