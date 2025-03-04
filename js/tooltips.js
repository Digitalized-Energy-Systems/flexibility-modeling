$(document).ready(function () {
  $('#flexibilityToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Flexibility', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Flexibility Potential:</strong> Represents the capability of flexibility resources (like energy storage, demand response) to adjust their power output or consumption, providing essential services like energy supply or demand balance.</li>' +
        '<li><strong>Flexibility Requirement:</strong> Refers to the overall needs of the power system for flexible resources to maintain stable operations and adapt to variability, such as that from renewable energy sources. This quantifies the adjustments necessary across the system to ensure reliability and prevent disruptions.</li>' +        '</ul>';
    }
  });

  $('#mediatorToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Flexibility Mediator', // Title of the popover
    content: function () {
      return 'Facilitates the matching of flexibility requirements with flexibility potentials within an energy system. It acts as an intermediary that helps integrate and optimize the use of available flexibility resources, ensuring that the power system can efficiently respond to fluctuations in demand and supply. Common examples of flexibility mediators include the power grid itself, which redistributes energy, and market mechanisms that allow for the trading of flexibility services to balance the system.';
    }
  });

  $('#assettypesToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Asset Types', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Energy Storage Systems</strong>: Such as batteries, pumped hydro storage, and compressed air energy storage, which can absorb excess power during low demand and release it during peak demand.</li>' +
        '<li><strong>Demand Response Programs</strong>: These involve adjusting the demand side of consumption, where consumers reduce or shift their electricity use in response to market signals or utility requests.</li>' +
        '<li><strong>Renewable Energy Sources</strong>: Like wind turbines and solar panels, which are inherently variable and require flexible solutions to integrate their output smoothly into the grid.</li>' +
        '<li><strong>Distributed Generation</strong>: Including small-scale units like diesel generators, microturbines, and combined heat and power (CHP) systems that can be controlled to help balance local demand and supply.</li>' +
        '<li><strong>Flexible Loads</strong>: Industrial processes, heating and cooling systems, and other energy-intensive operations that can be adjusted in real-time to help balance the grid.</li>' +
        '<li><strong>Grid Infrastructure</strong>: Advanced transmission technologies, including smart grids and dynamic line rating systems, that can adapt to changing conditions and manage flows more effectively.</li>' +
        '<li><strong>Electric Vehicles (EVs)</strong>: Their charging and discharging can be managed to provide flexibility, particularly as the prevalence of EVs continues to increase.</li>' +
        '<li><strong>Interconnectors</strong>: High voltage lines connecting different regions or countries, allowing for the transfer of electricity across borders, which can be used to balance regional differences in demand and supply.</li>' +
        '<li><strong>Peaking Power Plants</strong>: Typically gas turbines or hydro plants that can be ramped up quickly to meet sudden increases in electricity demand or unexpected drops in renewable generation.</li>' +
        '</ul>';
    }
  });

  $('#typeToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Flexibility Type', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Deterministic</strong>: Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.</li>' +
        '<li><strong>Probabilistic</strong>: Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.</li>' +
        '</ul>';
    }
  });

  $('#uncertaintyToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Uncertainty', // Title of the popover
    content: function () {
      return 'Refers to the unpredictability associated with various factors that affect the balance between electricity supply and demand. This includes variability in renewable energy production due to weather conditions, fluctuations in consumer demand, and potential equipment malfunctions or failures. Addressing uncertainty in flexibility models is crucial for ensuring that the power system can reliably handle unexpected changes and maintain stability under diverse operational conditions.';
    }
  });

  $('#aggregationToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Aggregation', // Title of the popover
    content: function () {
      return 'Refers to the model\'s ability to combine multiple smaller units of flexibility resources (like residential batteries, electric vehicles, or demand response participants) into a single, manageable entity. This aggregation allows for more effective coordination and utilization of distributed resources, enhancing their overall impact on grid stability and efficiency. By treating multiple small-scale assets as a unified group, operators can deploy flexibility more strategically, optimizing responses to grid demands and reducing operational complexities.';
    }
  });

  $('#timeToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Time', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Discrete</strong>: Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.</li>' +
        '<li><strong>Continuous</strong>: Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.</li>' +
        '</ul>';
    }
  });

  $('#metricToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Metric', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Active power:</strong>  The real component of power that performs actual work in an electrical system, typically measured in watts (W) or megawatts (MW).</li>' +
        '<li><strong>Ramp-Rate:</strong> The rate at which power output can be increased or decreased, usually measured in megawatts per minute (MW/min), indicating the flexibility of power generation or consumption.</li>' +
        '<li><strong>Reactive power:</strong> The imaginary component of power that does not perform work but is necessary to maintain voltage levels for the stability of the power system, usually measured in volt-amperes reactive (VAR).</li>' +
        '<li><strong>Energy:</strong> The total amount of work performed or electricity consumed over a period, typically measured in kilowatt-hours (kWh) or megawatt-hours (MWh).</li>' +
        '<li><strong>Voltage:</strong> The electric potential difference between two points in a circuit, which drives the current through the electrical system, typically measured in volts (V).</li>' +
        '</ul>';
    }
  });

  $('#multitimescaleToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Multi-time-scale', // Title of the popover
    content: function () {
      return 'If checked, it implies that the specific flexibility model under consideration ' +
        'is capable of integrating and analyzing flexibility across multiple time scales (short-term, medium-term, long-term) simultaneously or dynamically. This ' +
        'means the model can handle and optimize flexibility requirements and resources across these different scales in a cohesive manner, which is essential for ' +
        'comprehensive energy system planning and operation.';
    }
  });

  $('#constraintsToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Constraints', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Technical:</strong> Define the physical limits of power system components, such as maximum power output and ramp rates.</li>' +
        '<li><strong>Service Guarantee:</strong> Ensure that flexibility resources meet specific performance and reliability standards, such as response times and availability.</li>' +
        '<li><strong>Economic:</strong> Focus on minimizing operational costs and optimizing financial outcomes from managing flexibility resources.</li>' +
        '</ul>';
    }
  });

  $('#resolutionToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Resolution', // Title of the popover
    content: function () {
      return 'Refers to the time granularity considered for analyzing power system operations and planning.<br><br><ul>' +

        '<li><strong>Short-term:</strong> Focuses on immediate operational decisions, covering minutes to a day, essential for dispatching resources and managing real-time fluctuations in power supply.</li>' +
        '<li><strong>Long-term:</strong> Used for strategic planning over weeks to years, crucial for infrastructure development, integration of renewables, and long-term investment decisions.</li>' +
        '</ul>';
    }
  });

  $('#classificationToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Classification', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Metric: </strong> Uses predefined parameters to either deterministically quantify flexibility without considering uncertainties or Measures the likelihood of various flexibility scenarios using statistical methods.</li>' +
        '<li><strong>Machine Learning Model:</strong> Employs machine learning techniques to predict and optimize flexibility based on historical data.</li>' +
        '<li><strong>Envelope:</strong> Defines the operational boundaries or limits within which flexibility can be effectively measured or maintained. This includes the range of acceptable inputs, outputs, and constraints on flexibility metrics or predictions.</li>' +
        '</ul>';
    }
  });

  $('#classificationDetailsToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Classification', // Title of the popover
    content: function () {
      return '<ul>' +
        '<li><strong>Time Series - Cumulative:</strong> Analyzes flexibility over a period by aggregating data to show cumulative potential or requirements.</li>' +
        '<li><strong>Time Series - Non-Cumulative:</strong> Examines flexibility potentials or requirements at specific times without accumulating data over time.</li>' +
        '<li><strong>Set - Interval:</strong> Represents flexibility within set boundaries defined by minimum and maximum values at a specific time.</li>' +
        '<li><strong>Set - Polytope - Single-Time-Step:</strong> Defines flexibility as a geometric shape in a multidimensional space at a single time step, capturing constraints and capabilities.</li>' +
        '<li><strong>Set - Polytope - Multi-Time-Step:</strong> Extends the single-time-step polytope model to cover multiple time steps, providing a broader view of flexibility over time.</li>' +
        '</ul>';
    }
  });

  $('#sectorcouplingToggle').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Classification', // Title of the popover
    content: function () {
      return 'The consideration of sector coupling depends on whether the flexibility resources involve multiple energy vectors, specifically heat and gas. Sector-coupled flexibility resources can include individual units such as CHP (Combined Heat and Power) plants and electrolyzers, or entire systems like gas networks.';
    }
    
  });

  $('#toggle-authors').popover({
    html: true, // Enable HTML in the popover
    trigger: 'focus', // Trigger on focus
    title: 'Authors', // Title of the popover
    content: function () {
      return '<span></span>';
    }
  });
});