// Check if dark mode is stored in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  
  // Toggle dark mode on button click
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Store the user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.removeItem('darkMode');
    }
  });
  
  function generateModelsOld() {
    const param_assettypes = Array.from(document.getElementById('assettypes').selectedOptions).map(option => option.value);
    const param_classification = document.getElementById('classification').value;
    const param_flexibility = document.getElementById('flexibility').value;
    const param_type = document.getElementById('type').value;
    const param_metric = Array.from(document.getElementById('metric').selectedOptions).map(option => option.value);
    const param_uncertainty = document.getElementById('uncertainty').value;
    const param_aggregation = document.getElementById('aggregation').value;
    const param_time = document.getElementById('time').value;
    const param_resolution = document.getElementById('resolution').value;
    const param_multitimescale = document.getElementById('multitimescale').value;
    const param_mediator = document.getElementById('mediator').value;
    const param_constraints = Array.from(document.getElementById('constraints').selectedOptions).map(option => option.value);
    const param_sectorcoupling = document.getElementById('sectorcoupling').value;


    const userInput = {
        param_assettypes,
        param_classification,
        param_flexibility,
        param_type,
        param_metric,
        param_uncertainty,
        param_aggregation,
        param_time,
        param_resolution,
        param_multitimescale,
        param_mediator,
        param_constraints,
        param_sectorcoupling
    };

    const matchedModels = filterModels(userInput, flexmodels);

    displayModels(matchedModels, userInput);
}

function generateModels() {
    const userInput = {
        param_assettypes: {
            values: Array.from(document.getElementById('assettypes').selectedOptions).map(option => option.value),
            weight: document.getElementById('assettypesWeight').value,
            check: document.getElementById('assettypesCheck').getAttribute('data-state')
        },
        param_classification: {
            value: document.getElementById('classification').value,
            weight: document.getElementById('classificationWeight').value,
            check: document.getElementById('classificationCheck').getAttribute('data-state')
        },
        param_flexibility: {
            value: document.getElementById('flexibility').value,
            weight: document.getElementById('flexibilityWeight').value,
            check: document.getElementById('flexibilityCheck').getAttribute('data-state')
        },
        param_type: {
            value: document.getElementById('type').value,
            weight: document.getElementById('typeWeight').value,
            check: document.getElementById('typeCheck').getAttribute('data-state')
        },
        param_metric: {
            values: Array.from(document.getElementById('metric').selectedOptions).map(option => option.value),
            weight: document.getElementById('metricWeight').value,
            check: document.getElementById('metricCheck').getAttribute('data-state')
        },
        param_uncertainty: {
            value: document.getElementById('uncertaintyCheck').getAttribute('data-state'),
            weight: document.getElementById('uncertaintyWeight').value,
            check: document.getElementById('uncertaintyCheck').getAttribute('data-state')
        },
        param_aggregation: {
            value: document.getElementById('aggregationCheck').getAttribute('data-state'),
            weight: document.getElementById('aggregationWeight').value,
            check: document.getElementById('aggregationCheck').getAttribute('data-state')
        },
        param_time: {
            value: document.getElementById('time').value,
            weight: document.getElementById('timeWeight').value,
            check: document.getElementById('timeCheck').getAttribute('data-state')
        },
        param_resolution: {
            value: document.getElementById('resolution').value,
            weight: document.getElementById('resolutionWeight').value,
            check: document.getElementById('resolutionCheck').getAttribute('data-state')
        },
        param_multitimescale: {
            value: document.getElementById('multitimescaleCheck').getAttribute('data-state'),
            weight: document.getElementById('multitimescaleWeight').value,
            check: document.getElementById('multitimescaleCheck').getAttribute('data-state')
        },
        param_mediator: {
            value: document.getElementById('mediatorCheck').getAttribute('data-state'),
            weight: document.getElementById('mediatorWeight').value,
            check: document.getElementById('mediatorCheck').getAttribute('data-state')
        },
        param_constraints: {
            values: Array.from(document.getElementById('constraints').selectedOptions).map(option => option.value),
            weight: document.getElementById('constraintsWeight').value,
            check: document.getElementById('constraintsCheck').getAttribute('data-state')
        },
        param_sectorcoupling: {
            value: document.getElementById('sectorcoupling').value,
            weight: document.getElementById('sectorcouplingWeight').value,
            check: document.getElementById('sectorcouplingCheck').getAttribute('data-state')
        }
    };

    const matchedModels = filterModels(userInput, flexmodels);
    displayModels(matchedModels, userInput);
}



// Eliminate those models that have less matches than the value chose by the user
function filterModels(userInput, flexmodels) {
    let totalWeight = 0;

    const sliderValue = document.getElementById('myRange').value;
    // Iterates through all models
    return flexmodels.filter(model => {
        let matches = 0;

        // Iterate over each parameter in userInput
        for (const parameter in userInput) {
            const inputParam = userInput[parameter];
            // Check if the parameter is relevant for the user
            if (inputParam.check === '2') {
            } else {


                if (parameter === 'param_uncertainty') {
                    if (inputParam.check === '0' && model[parameter] === 'yes') {
                        matches++;
                    } else if (inputParam.check === '1') {
                        matches += model[parameter] === 'yes' ? 1 : -1000;
                    }
                }

                if (parameter === 'param_multitimescale') {
                    if (inputParam.check === '0' && model[parameter] === 'yes') {
                        matches++;
                    } else if (inputParam.check === '1') {
                        matches += model[parameter] === 'yes' ? 1 : -1000;
                    }
                }

                if (parameter === 'param_mediator') {
                    if (inputParam.check === '0' && model[parameter] === 'yes') {
                        matches++;
                    } else if (inputParam.check === '1') {
                        matches += model[parameter] === 'yes' ? 1 : -1000;
                    }
                }

                if (parameter === 'param_aggregation') {
                    if (inputParam.check === '0' && model[parameter] === 'yes') {
                        matches++;
                    } else if (inputParam.check === '1') {
                        matches += model[parameter] === 'yes' ? 1 : -1000;
                    }
                }

                if (parameter === 'param_resolution') {
                    // Check if the model parameter is 'any' or matches the input value directly
                    if (inputParam.value === model[parameter] || (model[parameter] === 'any' && (inputParam.value === 'short-term' || inputParam.value === 'long-term'))) {
                        matches++;
                    }

                    if (inputParam.check === '1') {
                        // Check for specific mismatches and deduct points accordingly
                        if ((inputParam.value === 'short-term' && model[parameter] === 'long-term') ||
                            (inputParam.value === 'long-term' && model[parameter] === 'short-term') ||
                            (inputParam.value === 'both' && (model[parameter] === 'short-term' || model[parameter] === 'long-term'))) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_flexibility') {
                    // Check if the model parameter is 'both' or matches the input value directly
                    if (inputParam.value === model[parameter] || (model[parameter] === 'both')) {
                        matches++;
                    }

                    if (inputParam.check === '1') {
                        // Check for specific mismatches and deduct points accordingly
                        if ((inputParam.value === 'potential' && model[parameter] === 'requirement') ||
                            (inputParam.value === 'requirement' && model[parameter] === 'potential') ||
                            (inputParam.value === 'both' && (model[parameter] === 'requirement' || model[parameter] === 'potential'))) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_sectorcoupling') {
                    // Check if the model parameter is 'both' or matches the input value directly
                    if (inputParam.value === model[parameter] || (model[parameter] === 'both')) {
                        matches++;
                    }

                    if (inputParam.check === '1') {
                        // Check for specific mismatches and deduct points accordingly
                        if ((inputParam.value === 'heat' && model[parameter] === 'gas') ||
                            (inputParam.value === 'gas' && model[parameter] === 'heat') ||
                            (inputParam.value === 'both' && (model[parameter] === 'heat' || model[parameter] === 'gas' || model[parameter] === 'none'))) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_classification') {
                    // Check if the model parameter matches the input value directly
                    if (inputParam.value === model[parameter]) {
                        matches++;
                    }

                    if (inputParam.check === '1') {
                        if (inputParam.value != model[parameter]) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_type') {
                    // Check if the model parameter matches the input value directly
                    if (inputParam.value === model[parameter]) {
                        matches++;
                    }

                    if (inputParam.check === '1') {
                        if (inputParam.value != model[parameter]) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_time') {
                    // Check if the model parameter matches the input value directly
                    if (inputParam.value === model[parameter]) {
                        matches++;
                    }

                    if (inputParam.check === '1') {
                        if (inputParam.value != model[parameter]) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_metric') {

                    // Check if the model parameter matches the input value directly
                    if (Array.isArray(inputParam.values)) {
                        // Ensure the model parameter exists, is not empty, and all userInput values are included in the model parameter

                        if (model[parameter] && model[parameter].length > 0 && inputParam.values.every(option => model[parameter].includes(option))) {
                            matches++;
                        }
                    }

                    if (inputParam.check === '1') {
                        if (model[parameter] && !inputParam.values.every(option => model[parameter].includes(option))) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_constraints') {

                    // Check if the model parameter matches the input value directly
                    if (Array.isArray(inputParam.values)) {
                        // Ensure the model parameter exists, is not empty, and all userInput values are included in the model parameter

                        if (model[parameter] && model[parameter].length > 0 && inputParam.values.every(option => model[parameter].includes(option))) {
                            matches++;
                        }
                    }

                    if (inputParam.check === '1') {
                        if (model[parameter] && !inputParam.values.every(option => model[parameter].includes(option))) {
                            matches -= 1000;
                        }
                    }
                }

                if (parameter === 'param_assettypes') {

                    // Check if the model parameter matches the input value directly
                    if (Array.isArray(inputParam.values)) {
                        // Ensure the model parameter exists, is not empty, and all userInput values are included in the model parameter
                        if (model[parameter] === 'universal') {
                            matches++;
                        }
                        else if (model[parameter] && model[parameter].length > 0 && inputParam.values.every(option => model[parameter].includes(option))) {
                            matches++;
                        }
                    }

                    if (inputParam.check === '1') {
                        if (model[parameter] != 'universal' && model[parameter] && !inputParam.values.every(option => model[parameter].includes(option))) {
                            matches -= 1000;
                        }
                    }
                }



                /*  totalWeight = totalWeight + parseInt(inputParam.weight, 10);
  
  
                  // Handle array parameters
                  if (Array.isArray(inputParam.values)) {
                      // Ensure the model parameter exists, is not empty, and all userInput values are included in the model parameter
                      if (model[parameter] && model[parameter].length > 0 && inputParam.values.every(option => model[parameter].includes(option))) {
                          matches++;
                      }
                  }
                  // Special conditions for non-array parameters
                  else {
                      // Handle specific cases for certain parameters
                      if (parameter === 'param_resolution' && inputParam.value === 'any') {
                          if (model[parameter] === 'short-term' || model[parameter] === 'long-term') {
                              matches++;
                          }
                      } else if (parameter === 'param_metric' && (inputParam.value === 'voltage' || inputParam.value === 'energy')) {
                          matches++;
                      } else {
                          // General case for single value parameters
                          if (inputParam.value === model[parameter]) {
                              matches++;
                          }
                      }
                  }*/
            }
        }
        model.matches = matches; // Add the number of matches to the model

        return matches >= sliderValue; // Only return models with this number of matches
    });

}


function calculateWeightCoefficient(matches) {
    const inputElement = document.getElementById('flexibilityWeight');
    const inputValue = parseFloat(inputElement.value);
    if (!isNaN(inputValue)) {
        return ((matches / 13) * 100).toFixed(2);
    }
}

function displayModels(models, userInput) {
    const modelsContainer = document.getElementById('modelsContainer');
    modelsContainer.innerHTML = ''; // Clear previous models

    models.sort((a, b) => b.matches - a.matches);

    
    const headerElement = document.createElement('h4');
    if (models.length == 1) {
        headerElement.textContent = `${models.length} model recommended`;
    } else if (models.length > 1) {
        headerElement.textContent = `${models.length} models recommended`;
    } else {
        headerElement.textContent = `Sorry, no model recommended`;
    }
    modelsContainer.appendChild(headerElement);

    models.forEach(model => {
        const modelElement = document.createElement('div');
        modelElement.className = 'model';

        const authorsElement = document.createElement('h4');
        // authorsElement.textContent = `${model.authors} (${model.year}) - ${model.matches} matches - ${calculateWeightCoefficient(model.matches)}%`;
        authorsElement.textContent = `${model.authors} (${model.year}) - ${model.matches} matches`;
        authorsElement.classList.add('collapsible'); // Add class for easy selection
        modelElement.appendChild(authorsElement);

        const divContainer = document.createElement('div');
        divContainer.classList.add('content');
        divContainer.style.maxHeight = '0';

        // Create title with link to DOI if it exists
        if (model.title.trim() !== '') {
            const titleElement = document.createElement('p');
            const titleLabel = document.createElement('span');
            titleLabel.textContent = 'Publication: ';
            titleLabel.style.fontWeight = 'bold';
            titleElement.appendChild(titleLabel);

            // Check if DOI exists and is not empty
            if (model.doi && model.doi.trim() !== '') {
                // Create an anchor element for the title if DOI is available
                const titleLink = document.createElement('a');
                titleLink.href = `https://doi.org/${encodeURIComponent(model.doi)}`; // Encode DOI to ensure URL safety
                titleLink.textContent = model.title;
                titleLink.target = '_blank'; // Opens the link in a new tab
                titleLink.rel = 'noopener noreferrer'; // Security measure for opening links in new tabs
                titleElement.appendChild(titleLink);
            } else {
                // Create a text node for the title if no DOI is available
                titleElement.append(model.title);
            }

            titleElement.classList.add('model-content');
            divContainer.appendChild(titleElement);
        }

        if (model.authors && model.authors.trim() !== '') {
            const allAuthorsElement = document.createElement('p');
            const allAuthorsLabel = document.createElement('span');
            allAuthorsLabel.textContent = 'Authors: ';
            allAuthorsLabel.style.fontWeight = 'bold';
            allAuthorsElement.appendChild(allAuthorsLabel);

            const allAuthorsText = document.createTextNode(model.authors);
            allAuthorsElement.appendChild(allAuthorsText);
            allAuthorsElement.classList.add('model-content');
            divContainer.appendChild(allAuthorsElement);
        } else {
            const usecaseElement = document.createElement('p');
            usecaseElement.classList.add('model-content');
            divContainer.appendChild(usecaseElement);
        }

        if (model.usecase && model.usecase.trim() !== '') {
            const usecaseElement = document.createElement('p');
            const usecaseLabel = document.createElement('span');
            usecaseLabel.textContent = 'Use Case: ';
            usecaseLabel.style.fontWeight = 'bold';
            usecaseElement.appendChild(usecaseLabel);

            const usecaseText = document.createTextNode(model.usecase);
            usecaseElement.appendChild(usecaseText);
            usecaseElement.classList.add('model-content');
            divContainer.appendChild(usecaseElement);
        } else {
            const usecaseElement = document.createElement('p');
            usecaseElement.classList.add('model-content');
            divContainer.appendChild(usecaseElement);
        }

        if (model.methodology && model.methodology.trim() !== '') {
            const methodologyElement = document.createElement('p');
            const methodologyLabel = document.createElement('span');
            methodologyLabel.textContent = 'Methodology: ';
            methodologyLabel.style.fontWeight = 'bold';
            methodologyElement.appendChild(methodologyLabel);

            const methodologyText = document.createTextNode(model.methodology);
            methodologyElement.appendChild(methodologyText);
            methodologyElement.classList.add('model-content');
            divContainer.appendChild(methodologyElement);
        } else {
            const methodologyElement = document.createElement('p');
            methodologyElement.classList.add('model-content');
            divContainer.appendChild(methodologyElement);
        }

        for (const key in model) {
            if (key !== 'id' &&
                key !== 'abstract' &&
                key !== 'authors' &&
                key !== 'year' &&
                key !== 'link' &&
                key !== 'title' &&
                key !== 'matches' &&
                key !== 'methodology' &&
                key !== 'usecase' &&
                key !== 'implementation' &&
                key !== 'flexblox' &&
                key !== 'doi') {
                const propertyElement = document.createElement('p');
                propertyElement.classList.add('model-content');

                let label;
                if (key === 'param_assettypes') {
                    label = 'Asset Types';
                } else if (key === 'param_mediator') {
                    label = 'Mediator';
                } else if (key === 'param_sectorcoupling') {
                    label = 'Sector Coupling';
                } else if (key === 'param_multitimescale') {
                    label = 'Multi-time-scale';
                } else if (key === 'param_metric') {
                    label = 'Metric';
                } else if (key === 'param_type') {
                    label = 'Type';
                } else if (key === 'param_aggregation') {
                    label = 'Aggregation';
                } else if (key === 'param_time') {
                    label = 'Time';
                } else if (key === 'param_resolution') {
                    label = 'Resolution';
                } else if (key === 'param_classification') {
                    label = 'Classification';
                } else if (key === 'param_constraints') {
                    label = 'Constraints';
                } else if (key === 'param_flexibility') {
                    label = 'Flexibility';
                } else if (key === 'param_uncertainty') {
                    label = 'Uncertainty';
                } else {
                    label = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
                }

                const labelElement = document.createElement('span');
                labelElement.textContent = `${label}: `;
                labelElement.style.fontWeight = 'bold';
                propertyElement.appendChild(labelElement);

                const valueElement = document.createElement('span');
                valueElement.textContent = Array.isArray(model[key]) ? model[key].join(', ') : model[key];

                // Adjust the comparison logic to account for special matching conditions
                let isMatch = false; // Default to false
                let unknown = false;
                let irrelevant = false;

                if (key === 'param_aggregation') {
                    if (userInput[key].check === '0' && model[key] === 'yes') {
                        isMatch = true;
                    } else if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }
                if (key === 'param_mediator') {
                    if (userInput[key].check === '0' && model[key] === 'yes') {
                        isMatch = true;
                    } else if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_uncertainty') {
                    if (userInput[key].check === '0' && model[key] === 'yes') {
                        isMatch = true;
                    } else if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_multitimescale') {
                    if (userInput[key].check === '0' && model[key] === 'yes') {
                        isMatch = true;
                    } else if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_metric') {

                    // Check if the model parameter matches the input value directly
                    if (Array.isArray(userInput[key].values)) {
                        // Ensure the model parameter exists, is not empty, and all userInput values are included in the model parameter

                        if (model[key] && model[key].length > 0 && userInput[key].values.every(option => model[key].includes(option))) {
                            isMatch = true;
                        }
                    }

                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_resolution') {
                    // Check if the model parameter is 'any' or matches the input value directly
                    if (userInput[key].value === model[key] || (model[key] === 'any' && (userInput[key].value === 'short-term' || userInput[key].value === 'long-term'))) {
                        isMatch = true;
                    }


                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_flexibility') {
                    // Check if the model parameter is 'both' or matches the input value directly
                    if (userInput[key].value === model[key] || (model[key] === 'both')) {
                        isMatch = true;
                    }


                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_sectorcoupling') {
                    // Check if the model parameter is 'both' or matches the input value directly
                    if (userInput[key].value === model[key] || (model[key] === 'both')) {
                        isMatch = true;
                    }

                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_classification') {
                    // Check if the model parameter matches the input value directly
                    if (userInput[key].value === model[key]) {
                        isMatch = true;
                    }


                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_type') {
                    // Check if the model parameter matches the input value directly
                    if (userInput[key].value === model[key]) {
                        isMatch = true;
                    }


                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_time') {
                    // Check if the model parameter matches the input value directly
                    if (userInput[key].value === model[key]) {
                        isMatch = true;
                    }


                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_constraints') {

                    // Check if the model parameter matches the input value directly
                    if (Array.isArray(userInput[key].values)) {
                        // Ensure the model parameter exists, is not empty, and all userInput values are included in the model parameter

                        if (model[key] && model[key].length > 0 && userInput[key].values.every(option => model[key].includes(option))) {
                            isMatch = true;
                        }
                    }

                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                if (key === 'param_assettypes') {

                    // Check if the model parameter matches the input value directly
                    if (Array.isArray(userInput[key].values)) {
                        // Ensure the model parameter exists, is not empty, and all userInput values are included in the model parameter
                        if (model[key] === 'universal') {
                            isMatch = true;
                        }
                        else if (model[key] && model[key].length > 0 && userInput[key].values.every(option => model[key].includes(option))) {
                            isMatch = true;
                        }
                    }
                    if (userInput[key].check === '2') {
                        irrelevant = true;
                    }
                }

                // Process key if it has multiple entries (asset types, metric, constraints)
                /*
                 if (Array.isArray(userInput[key])) {
                     // Check if model[key] exists and is an array before checking every element
                     isMatch = model[key] &&  userInput[key].every(option => model[key].includes(option));
                 }
                  else {
                     // Check for special case where "no" in user input and "yes" in model is considered a match
                     if (userInput[key] === "no" && model[key] === "yes") {
                         isMatch = true;
                     } else if ((userInput[key] === "potential" || userInput[key] === "requirement") && model[key] === "both") {
                         isMatch = true;
                     } else if (userInput[key] === "any"  && (model[key] === "short-term" || model[key] === "long-term")) {
                         isMatch = true;
                     } else if (userInput[key] === "none"  && (model[key] === "heat" || model[key] === "gas" || model[key] === "both")) {
                         isMatch = true;
                     } else {
                         // Regular match condition
                         isMatch = userInput[key] === model[key];
                     }
                 }
 */

                // Apply the matching or non-matching class based on the isMatch result
                if (isMatch) {
                    valueElement.classList.add('matching');
                    labelElement.classList.add('matching');

                }
                if (!isMatch) {
                    valueElement.classList.add('non-matching');
                    labelElement.classList.add('non-matching');
                }
                if (unknown) {
                    valueElement.classList.add('unknown');
                    labelElement.classList.add('unknown');
                }
                if (irrelevant) {
                    valueElement.classList.add('irrelevant');
                    labelElement.classList.add('irrelevant');
                }



                propertyElement.appendChild(valueElement);
                divContainer.appendChild(propertyElement);
            }
        }

        const abstractElement = document.createElement('p');
        const abstractLabel = document.createElement('span');
        abstractLabel.textContent = 'Abstract: ';
        abstractLabel.style.fontWeight = 'bold';
        abstractElement.appendChild(abstractLabel);
        abstractElement.innerHTML += model.abstract;
        abstractElement.classList.add('model-content');
        divContainer.appendChild(abstractElement);

        if (model.link && model.link.trim() !== '') {
            const linkElement = document.createElement('p');
            const linkLabel = document.createElement('span');
            linkLabel.textContent = 'Related Links: ';
            linkLabel.style.fontWeight = 'bold';
            linkElement.appendChild(linkLabel);

            // Create an anchor element for the link
            const linkAnchor = document.createElement('a');
            linkAnchor.href = model.link; // Set the href attribute to the model's link
            linkAnchor.textContent = model.link; // Display the link text
            linkAnchor.target = '_blank'; // Ensures the link opens in a new tab
            linkAnchor.rel = 'noopener noreferrer'; // Adds security to links opened in new tabs

            linkElement.appendChild(linkAnchor); // Append the anchor to the paragraph element
            linkElement.classList.add('model-content');
            divContainer.appendChild(linkElement);
        } else {
            // Create and append an empty div if model.link is not available or is empty
            const linkElement = document.createElement('p');
            linkElement.classList.add('model-content');
            divContainer.appendChild(linkElement);
        }



        modelElement.appendChild(divContainer);
        modelsContainer.appendChild(modelElement);

        // Add click event listener to toggle visibility
        authorsElement.addEventListener('click', function () {
            authorsElement.classList.toggle('active');
            if (divContainer.style.maxHeight === '0px' || divContainer.style.maxHeight === '') {
                divContainer.style.maxHeight = divContainer.scrollHeight + 'px';
            } else {
                divContainer.style.maxHeight = '0';
            }
        });
    });
}

// Show Models-Button 
document.getElementById('generateButton').addEventListener('click', generateModels);