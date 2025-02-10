# Tutorial on Flexibility Modeling
Flexibility modeling in Cyber-Physical Energy Systems (CPES) is essential to address different use cases, such as dealing with uncertainty and variable generation, and is very important to maximize the performance of energy resources. It is important for a variety of use cases, each with different requirements. Therefore, in order to identify or develop a suitable flexibility model for a specific use case, it is necessary to get an overview of the existing requirements.

This tutorial deals with typical steps in flexibility modeling. Instead of describing a detailed application of a specific flexibility model, we aim to provide a tutorial that can be used for any kind of flexibility model and that will help users to find or develop a suitable model with respect to their needs. We assume that the user is trying to find a suitable model for flexibility, either by modeling his own or by using existing models.

This tutorial therefore helps to identify the most relevant parameters of a flexibility model, to specify the requirements of the flexibility model and to categorize it accordingly. Once this is done and the model can be described in detail, we provide a recommender to help find a suitable existing model. To reduce effort and increase effectiveness, it is recommended to search for existing models before implementing your own. Many models already exist. For this reason, it is better to search for an existing model and customize it than to implement your own model. However, if no suitable model exists, you are prepared to implement your own model because it is categorized accordingly.  

The tutorial is structured as follows. First, we discuss how to prepare for modeling flexibility by providing an overview of the scenario, requirements, and parameters of the flexibility model in [the first section](#first). [Section 2](#params) presents relevant parameters for flexibility models with their respective categories. Then, [section 3](#identify) discusses how to identify the appropriate flexibility model. In the last part, [section 4](#work), we discuss how to work with the respective model.
 
## <a name="first"></a> 1 Get an Overview of the Scenario, the Requirements and Parameters for the Flexibility Model
The first step in figuring out how to model flexibility and find appropriate methods and constraints is to get an overview of the scenario in which the model will be used. What are the parameters of the model? What requirements must be met? What are the constraints of the scenario or model? The first step is to gather all available information to get a concrete idea of the flexibility model. An example of a scenario could be the integration of a flexibility model for a specific asset type into a Virtual Power Plant (VPP) to improve grid stability while managing uncertainties in renewable energy generation. What asset is being considered? What are the time requirements? How is flexibility represented?

## <a name="params"></a> 2 Categorize the Flexibility Model according to its Parameters
Once you have an initial idea of the flexibility model, it is helpful to take a closer look at the parameters. By categorizing the flexibility model according to given parameters from literature and state-of-the-art, you are able to compare the requirements of the model with existing ones. This step helps to get an accurate picture of the flexibility model and to decide how to model it in detail. Are there comparable models that meet the requirements? If not, what concepts are similar and can be adopted? What parameters need to be added to existing models?

In the following, we describe various parameters for categorizing flexibility models. The parameters are taken from the work of [Lechl et al., 2023: A review of models for energy system flexibility requirements and potentials using the new FLEXBLOX taxonomy](https://doi.org/10.1016/j.rser.2023.113570). For more detailed information, have a look at the respective paper.

It is recommended to get a detailed overview of the requirements of the flexibility model by answering the questions related to the given categories. For some categories, it may not be possible to have an answer at the beginning, but it is recommended to try to fill these requirements as detailed as possible in order to find a suitable flexibility model.

### <a name="params1"></a> 2.1 Flexibility
Flexibility can be modeled as potential or as requirements.
- **Flexibility potential** represents the capability of flexibility resources (like energy storage, and demand response) to adjust their power output or
consumption, providing essential services like energy supply or demand balance.
- **Flexibility requirement** refers to the overall needs of the power system for flexible resources to maintain stable operations and adapt to variability,
such as that from renewable energy sources. This quantifies the adjustments necessary across the system to ensure reliability and prevent
disruptions.

### <a name="params2"></a> 2.2 Asset Types
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

### <a name="params3"></a> 2.3 Classification
- **Metric:** Uses predefined parameters to either deterministically quantify flexibility without considering uncertainties or measure the likelihood of various flexibility scenarios using statistical methods.
- **Machine Learning Model:** Employs machine learning techniques to predict and optimize flexibility based on historical data.
- **Envelope:** Defines the operational boundaries or limits within which flexibility can be effectively measured or maintained. This includes the range of acceptable inputs, outputs, and constraints on flexibility metrics or predictions.

Some more details for the classification types are given in the following.

- **Time Series - Cumulative:** Analyzes flexibility over a period by aggregating data to show cumulative potential or requirements.
- **Time Series - Non-Cumulative:** Examines flexibility potentials or requirements at specific times without accumulating data over time.
- **Set - Interval:** Represents flexibility within set boundaries defined by minimum and maximum values at a specific time.
- **Set - Polytope - Single-Time-Step:** Defines flexibility as a geometric shape in a multidimensional space at a single time step, capturing constraints and capabilities.
- **Set - Polytope - Multi-Time-Step:** Extends the single-time-step polytope model to cover multiple time steps, providing a broader view of flexibility over time.

### <a name="params4"></a> 2.4 Type
- **Deterministic:** Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.
- **Probabilistic:** Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.

### <a name="params5"></a> 2.5 Time
- **Discrete:** Using specific, fixed parameters and conditions to calculate flexibility needs and potentials. These models operate under the assumption that all inputs (such as demand forecasts, generation capacity, and operational constraints) are known and remain constant, leading to predictable and consistent outcomes.
- **Continuous:** Accounting for the uncertainty inherent in energy systems by using probability distributions and stochastic processes to determine flexibility requirements and resources. These models consider variations in input data like renewable energy output, consumer demand, and equipment failures, providing a range of possible outcomes rather than a single deterministic result.

### <a name="params6"></a> 2.6 Metric
- **Active power:** The real component of power that performs actual work in an electrical system, typically measured in watts (W) or megawatts (MW).
- **Ramp-Rate:** The rate at which power output can be increased or decreased, usually measured in megawatts per minute (MW/min), indicating the flexibility of power generation or consumption.
- **Reactive power:** The imaginary component of power that does not perform work but is necessary to maintain voltage levels for the stability of the power system, usually measured in volt-amperes reactive (VAR).
- **Energy:** The total amount of work performed or electricity consumed over a period, typically measured in kilowatt-hours (kWh) or megawatt-hours (MWh).
- **Voltage:** The electric potential difference between two points in a circuit, which drives the current through the electrical system, typically measured in volts (V).

### <a name="params7"></a> 2.7 Constraints
- **Technical:** Define the physical limits of power system components, such as maximum power output and ramp rates.
- **Service Guarantee:** Ensure that flexibility resources meet specific performance and reliability standards, such as response times and availability.
- **Economic:** Focus on minimizing operational costs and optimizing financial outcomes by managing flexibility resources.

### <a name="params8"></a> 2.8 Resolution
Refers to the time granularity considered for analyzing power system operations and planning.
- **Short-term:** Focuses on immediate operational decisions, covering minutes to a day, essential for dispatching resources and managing real-time fluctuations in power supply.
- **Long-term:** Used for strategic planning over weeks to years, crucial for infrastructure development, integration of renewables, and long-term investment decisions.

### <a name="params9"></a> 2.9 Sector Coupling
The consideration of sector coupling depends on whether the flexibility resources involve multiple energy vectors, specifically heat and gas. Sector-coupled flexibility resources can include individual units such as CHP (Combined Heat and Power) plants and electrolyzers, or entire systems like gas networks.

### <a name="params10"></a> 2.10 Multi-time-scale
 If checked, it implies that the specific flexibility model under consideration is capable of integrating and analyzing flexibility across multiple time scales (short-term, medium-term, long-term) simultaneously or dynamically. This means the model can handle and optimize flexibility requirements and resources across these different scales in a cohesive manner, which is essential for comprehensive energy system planning and operation.

### <a name="params11"></a> 2.11 Mediator
Facilitates the matching of flexibility requirements with flexibility potentials within an energy system. It acts as an intermediary that helps integrate and optimize the use of available flexibility resources, ensuring that the power system can efficiently respond to fluctuations in demand and supply. Common examples of flexibility mediators include the power grid itself, which redistributes energy, and market mechanisms that allow for the trading of flexibility services to balance the system.

### <a name="params12"></a> 2.12 Uncertainty
 Refers to the unpredictability associated with various factors that affect the balance between electricity supply and demand. This includes variability in renewable energy production due to weather conditions, fluctuations in consumer demand, and potential equipment malfunctions or failures. Addressing uncertainty in flexibility models is crucial for ensuring that the power system can reliably handle unexpected changes and maintain stability under diverse operational conditions.

### <a name="params13"></a> 2.13 Aggregation
Refers to the model's ability to combine multiple smaller units of flexibility resources (like residential batteries, electric vehicles, or demand response participants) into a single, manageable entity. This aggregation allows for more effective coordination and utilization of distributed resources, enhancing their overall impact on grid stability and efficiency. By treating multiple small-scale assets as a unified group, operators can deploy flexibility more strategically, optimizing responses to grid demands and reducing operational complexities.

## <a name="identify"></a> 3 Identify a suitable Flexibility Model
To find the right flexibility model, after getting an overview of the requirements of the scenario, you can use our [flexibility model recommender](https://flexibility.offis.de/recommender.php). With this recommender, it is possible to find suitable flexibility models according to the respective use cases.
For each of the requirements, it is possible to set the parameter accordingly. Each parameter can be set as mandatory, desired or irrelevant. This way it is possible to get recommendations even if not all requirements have been specified. It is also possible to specify how many parameters should be matched with the models. This makes it very easy to make user-dependent settings.
After entering the parameters, the corresponding models are displayed, and sorted by the number of matching requirements. The following is a step-by-step guide. For a more detailed guide, please refer to the [help page](https://flexibility.offis.de/help.php).

### <a name="identify1"></a> 3.1 Explore Parameter Options
In accordance with [section 2](#params), you can select the corresponding parameter in the recommender. As a first step, get an overview of the available options.

### <a name="identify2"></a> 3.2 Select Parameters for the Scenario
Now select the relevant parameters for the scenario according to your model. Decide which of the parameters are required, desired, or irrelevant. 

### <a name="identify3"></a> 3.3 Adjust Matching Requirements
After entering the parameter information, you can select the number of requirements you want to see. For example, if you want to see only the flexibility models that match in 5 or more categories, you can select 5 as the minimum number of matches. If you set the number too high and no models meet your requirements, we recommend lowering the number of matches. There may be some models that meet most of your requirements. These models can be used as a starting point and adjusted accordingly. 

### <a name="identify4"></a> 3.4 Retrieve Matching Flexibility Models
The next step is for the flexibility model recommender to list all the models in the database that meet your selections. Again, if no model is found, try adjusting some of the settings by making some parameters optional or reducing the number of required matches. Flexibility models may also be relevant if they do not fully meet the requirements, e.g. as a possible starting point. The models can be extended or concepts adopted if necessary.

## <a name="work"></a> 4 Work with the Respective Model
The recommended models can be used, adapted, and integrated depending on the specific use case. Some of the models are open source. We recommend that you use them and check whether they need to be adapted.
If adaptations or extensions are needed, we recommend contacting the authors. If in a special case no approach fits, the classification according to the previous parameters and the provided literature can help you to develop your own approach. The concepts described can be adopted, the models can be extended, e.g. to other types of assets, adapted to other time requirements, etc. It is always recommended to build on existing work rather than to develop new models. An overview of all [existing models in the database](https://flexibility.offis.de/models.php) can also be helpful for this step. 
