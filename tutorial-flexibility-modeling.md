# Tutorial on Flexibility Modeling
Flexibility modeling in Cyber-Physical Energy Systems (CPES) is essential to meet different use cases, such as dealing with uncertainty and variable generation, and is very important in order to utilize the power of energy resources as optimally as possible.
It is important for a variety of use cases, each bringing different requirements along. Thus, in order to identify or develop a suitable model for a specific use case,
it is necessary to get an overview of existing requirements.

This tutorial deals with typical steps to proceed when dealing with flexibility modeling. Instead of describing a detailed application of one specific flexibility model, we aim to provide a tutorial that can be used for any kind of flexibility model and that helps users find or develop a suitable model regarding their needs.
We assume that the user tries to find a suitable model for flexibility, either modeling its own or using existing models.

This tutorial therefore helps to identify the most relevant parameters of a flexibility model, to specify the requirements of the flexibility model, and to categorize it accordingly. Once this is done, and the model can be described in detail, we provide a recommender to help find a suitable existing model. To reduce effort and increase effectiveness, it is recommended to search for existing models before implementing your own. Many models already exist. For this reason, it is better to search for an existing model and make an adjustment instead of implementing your own model. However, if no suitable model exists, the user is ready to implement his own model because he has categorized it accordingly.
s
The tutorial is structured as follows. First, we discuss how to prepare for modeling flexibility by getting an overview of the scenario, the requirements and parameters of the flexibiliy model in [the first section](#first). [Section 2](#params) presents relevant parameters for flexibility models, each with their respective categories. Afterwards, in [section 3](#identify), is it discussed how the suitable flexibility model can be identified. In the last part, [section 4](#work) we discuss how to work with the respective model.

## <a name="first"></a> 1. Get an Overview of the Scenario, the Requirements and Parameters for the Flexibility Model
As a first step, in order to find out how to model the flexibility and how to find corresponding methods and fulfill constraints, it is necessary to get an overview of the respective scenario in which the model will be used. What parameters does the model contain? What requirements need to be fulfilled? What constraints does the scenario or the model have? Collect all available information as a first step in order to get a concrete idea of the flexibility model.


## <a name="params"></a> 2. Categorize the Flexibility Model according to its Parameters
In the following, we describe various parameters to categorize flexibility models.
It is recommended to get an overview of the requirements of the flexibility model by answering the questions regarding the given categories. For some categories it might not be possible to have an answer at the beginning, however, we recommend trying to fill these requirements as detailed as possible in order to find a suitable flexibility model.

### Flexibility
Flexibility can be modeled as potential or as requirements.
- **Flexibility potential** represents the capability of flexibility resources (like energy storage, and demand response) to adjust their power output or
consumption, providing essential services like energy supply or demand balance.
- **Flexibility requirement** refers to the overall needs of the power system for flexible resources to maintain stable operations and adapt to variability,
such as that from renewable energy sources. This quantifies the adjustments necessary across the system to ensure reliability and prevent
disruptions.

### Asset Types
The type(s) of the considered assets.
- **Energy Storage Systems:** Such as batteries, pumped hydro storage, and compressed air energy storage, which can absorb excess power during low demand and release it during peak demand.
- **Demand Response Programs:** These involve adjusting the demand side of consumption, where consumers reduce or shift their electricity use in response to market signals or utility requests.
- **Renewable Energy Sources:** Like wind turbines and solar panels, which are inherently variable and require flexible solutions to integrate their output smoothly into the grid.
- **Distributed Generation:** Including small-scale units like diesel generators, microturbines, and combined heat and power (CHP) systems that can be controlled to help balance local demand and supply.
- **Flexible Loads:** Industrial processes, heating and cooling systems, and other energy-intensive operations that can be adjusted in real-time to help balance the grid.
- **Grid Infrastructure:** Advanced transmission technologies, including smart grids and dynamic line rating systems, that can adapt to changing conditions and manage flows more effectively.
- **Electric Vehicles (EVs):** Their charging and discharging can be managed to provide flexibility, particularly as the prevalence of EVs continues to increase.
- **Interconnectors:** High voltage lines connecting different regions or countries, allowing for the transfer of electricity across borders, which can be used to balance regional differences in demand and supply.
- **Peaking Power Plants:** Typically gas turbines or hydro plants can be ramped up quickly to meet sudden increases in electricity demand or unexpected drops in renewable generation.

### Classification
- **Metric:** Uses predefined parameters to either deterministically quantify flexibility without considering uncertainties or measure the likelihood of various flexibility scenarios using statistical methods.
- **Machine Learning Model:** Employs machine learning techniques to predict and optimize flexibility based on historical data.
- **Envelope:** Defines the operational boundaries or limits within which flexibility can be effectively measured or maintained. This includes the range of acceptable inputs, outputs, and constraints on flexibility metrics or predictions.

Some more details for the classification types are given in the following.

- **Time Series - Cumulative:** Analyzes flexibility over a period by aggregating data to show cumulative potential or requirements.
- **Time Series - Non-Cumulative:** Examines flexibility potentials or requirements at specific times without accumulating data over time.
- **Set - Interval:** Represents flexibility within set boundaries defined by minimum and maximum values at a specific time.
- **Set - Polytope - Single-Time-Step:** Defines flexibility as a geometric shape in a multidimensional space at a single time step, capturing constraints and capabilities.
- **Set - Polytope - Multi-Time-Step:** Extends the single-time-step polytope model to cover multiple time steps, providing a broader view of flexibility over time.

### Type
- **Deterministic:** Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.
- **Probabilistic:** Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.

### Time
- **Discrete:** Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.
- **Continuous:** Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.

### Metric
- **Active power:** The real component of power that performs actual work in an electrical system, typically measured in watts (W) or megawatts (MW).
- **Ramp-Rate:** The rate at which power output can be increased or decreased, usually measured in megawatts per minute (MW/min), indicating the flexibility of power generation or consumption.
- **Reactive power:** The imaginary component of power that does not perform work but is necessary to maintain voltage levels for the stability of the power system, usually measured in volt-amperes reactive (VAR).
- **Energy:** The total amount of work performed or electricity consumed over a period, typically measured in kilowatt-hours (kWh) or megawatt-hours (MWh).
- **Voltage:** The electric potential difference between two points in a circuit, which drives the current through the electrical system, typically measured in volts (V).

### Constraints
- **Technical:** Define the physical limits of power system components, such as maximum power output and ramp rates.
- **Service Guarantee:** Ensure that flexibility resources meet specific performance and reliability standards, such as response times and availability.
- **Economic:** Focus on minimizing operational costs and optimizing financial outcomes by managing flexibility resources.

### Resolution
Refers to the time granularity considered for analyzing power system operations and planning.
- **Short-term:** Focuses on immediate operational decisions, covering minutes to a day, essential for dispatching resources and managing real-time fluctuations in power supply.
- **Long-term:** Used for strategic planning over weeks to years, crucial for infrastructure development, integration of renewables, and long-term investment decisions.

### Sector Coupling
The consideration of sector coupling depends on whether the flexibility resources involve multiple energy vectors, specifically heat and gas. Sector-coupled flexibility resources can include individual units such as CHP (Combined Heat and Power) plants and electrolyzers, or entire systems like gas networks.

### Multi-time-scale
 If checked, it implies that the specific flexibility model under consideration is capable of integrating and analyzing flexibility across multiple time scales (short-term, medium-term, long-term) simultaneously or dynamically. This means the model can handle and optimize flexibility requirements and resources across these different scales in a cohesive manner, which is essential for comprehensive energy system planning and operation.

### Mediator
Facilitates the matching of flexibility requirements with flexibility potentials within an energy system. It acts as an intermediary that helps integrate and optimize the use of available flexibility resources, ensuring that the power system can efficiently respond to fluctuations in demand and supply. Common examples of flexibility mediators include the power grid itself, which redistributes energy, and market mechanisms that allow for the trading of flexibility services to balance the system.

### Uncertainty
 Refers to the unpredictability associated with various factors that affect the balance between electricity supply and demand. This includes variability in renewable energy production due to weather conditions, fluctuations in consumer demand, and potential equipment malfunctions or failures. Addressing uncertainty in flexibility models is crucial for ensuring that the power system can reliably handle unexpected changes and maintain stability under diverse operational conditions.

### Aggregation
Refers to the model's ability to combine multiple smaller units of flexibility resources (like residential batteries, electric vehicles, or demand response participants) into a single, manageable entity. This aggregation allows for more effective coordination and utilization of distributed resources, enhancing their overall impact on grid stability and efficiency. By treating multiple small-scale assets as a unified group, operators can deploy flexibility more strategically, optimizing responses to grid demands and reducing operational complexities.

## <a name="identify"></a> 3. Identify the suitable Flexibility Model
To find the right flexibility model, after getting an overview of the requirements of the scenario, we recommend using our [flexibility recommender](https://flexibility.offis.de/recommender.php). With this recommender, it is possible to find suitable flexibility models according to the respective use cases.
For each of the requirements, it is possible to set the parameter accordingly. While doing so,
each parameter can be set as mandatory, desired, or irrelevant. In this way, it is possible
to receive recommendations, even if not all requirements are specified yet. Additionally, it can be set how many
parameters should match with the models. This makes it very easy to make user-dependent settings.
After entering the parameters, respective models are shown, sorted by the number of requirements fitting.
At the moment, x models are integrated into our database.

## <a name="work"></a> 4. Work with the Respective Model
The recommended models can be used, adapted, and integrated, depending on the actual use case. Some of the models are available open source. We recommend using these and checking for needs to adaption.
If adaptions or extensions are necessary, we recommend to get in touch with the authors. If, in a special case, no approach fits, the classification according to the previous parameters and the literature provided can help you to develop your own approach.
