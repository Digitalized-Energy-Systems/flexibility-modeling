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
        },
        param_aggregation: {
            value: document.getElementById('aggregationCheck').getAttribute('data-state'),
            weight: document.getElementById('aggregationWeight').value,
            check: document.getElementById('aggregationCheck').getAttribute('data-state')
        }
    };

    const matchedModels = filterModels(userInput, flexmodels);
    window.currentModels = matchedModels;
    window.currentUserInput = userInput;
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
                if (parameter === 'param_flexibility') {
                    const user = inputParam.value;           // Value selected by user
                    const modelVal = model[parameter];       // Value from the current model
                    const check = inputParam.check;          // 0 = desirable, 1 = required, 2 = irrelevant

                    let isMatch = false;

                    // Matching logic based on dropdown semantics
                    if (user === 'both') {
                        // User expects full flexibility → model must explicitly offer 'both'
                        isMatch = modelVal === 'both';
                    } else if (user === 'potential' || user === 'requirement') {
                        // Partial match is okay if model explicitly offers it or 'both'
                        isMatch = (modelVal === user || modelVal === 'both');
                    }

                    if (isMatch) {
                        matches++; // Count as a valid match
                    } else if (check === '1') {
                        matches -= 1000; // Required but not matched → disqualify
                    }
                }

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

            const allAuthorsText = document.createTextNode(model.authors_full); // show the extended authors list
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

        const orderedKeys = [
            'param_flexibility',
            'param_assettypes',
            'param_classification',
            'param_type',
            'param_time',
            'param_resolution',
            'param_metric',
            'param_constraints',
            'param_sectorcoupling',
            'param_multitimescale',
            'param_mediator',
            'param_uncertainty',
            'param_aggregation'
        ];

        orderedKeys.forEach(key => {
            if (!(key in model)) return;

            // ab hier alles exakt wie vorher im Inneren deines for-in-Blocks
            const propertyElement = document.createElement('p');
            propertyElement.classList.add('model-content');

            const labelMap = {
                param_flexibility: 'Flexibility',
                param_assettypes: 'Asset Types',
                param_classification: 'Classification',
                param_type: 'Type',
                param_time: 'Time',
                param_resolution: 'Resolution',
                param_metric: 'Metric',
                param_constraints: 'Constraints',
                param_sectorcoupling: 'Sector Coupling',
                param_multitimescale: 'Multi-time-scale',
                param_mediator: 'Mediator',
                param_uncertainty: 'Uncertainty',
                param_aggregation: 'Aggregation'
            };

            const label = labelMap[key] ?? key.replace('param_', '').replace(/_/g, ' ');

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
        )

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

function generatePdfContent(models, userInput) {
    const now = new Date().toLocaleString();
    const configCode = document.getElementById('configCode')?.value || '';
    const configUrl = `${window.location.origin}${window.location.pathname}?code=${configCode}`;
    const baseUrl = 'https://flexibility.offis.de/recommender.php';
    const fullUrl = `${baseUrl}?c=${configCode}`;

    const content = [
        { text: 'FlexModels Recommendations', style: 'header' },
        { text: `Generated: ${now}`, style: 'subheader' },
        {
            text: [
                { text: 'Configuration: ', bold: true },
                {
                    text: fullUrl,
                    link: fullUrl,
                    color: 'blue',
                    decoration: 'underline'
                }
            ],
            margin: [0, 5, 0, 15]
        },
    ];

    models.forEach((model, index) => {
        content.push(
            { text: `${index + 1}. ${model.authors} (${model.year}) - ${model.matches} matches`, style: 'title' }
        );

        if (model.title) content.push({ text: `Publication: ${model.title}`, style: 'info' });
        if (model.authors) content.push({ text: `Authors: ${model.authors}`, style: 'info' });
        if (model.usecase) content.push({ text: `Use Case: ${model.usecase}`, style: 'info' });
        if (model.methodology) content.push({ text: `Methodology: ${model.methodology}`, style: 'info' });

        const parameters = [
            'param_flexibility', 'param_assettypes', 'param_classification', 'param_type',
            'param_time', 'param_resolution', 'param_metric', 'param_constraints',
            'param_sectorcoupling', 'param_multitimescale', 'param_mediator', 'param_uncertainty', 'param_aggregation'
        ];

        const labels = {
            param_flexibility: 'Flexibility',
            param_assettypes: 'Asset Types',
            param_classification: 'Classification',
            param_type: 'Type',
            param_time: 'Time',
            param_resolution: 'Resolution',
            param_metric: 'Metric',
            param_constraints: 'Constraints',
            param_sectorcoupling: 'Sector Coupling',
            param_multitimescale: 'Multi-time-scale',
            param_mediator: 'Mediator',
            param_uncertainty: 'Uncertainty',
            param_aggregation: 'Aggregation'
        };

        const tableBody = parameters.map(key => {
            const value = Array.isArray(model[key]) ? model[key].join(', ') : model[key];
            const input = userInput[key];
            let match = false;

            if (!input || input.check === '2') return null; // skip irrelevant

            if (key === 'param_metric' || key === 'param_constraints' || key === 'param_assettypes') {
                match = Array.isArray(input.values) && input.values.every(val => (model[key] || []).includes(val));
            } else if (input.value !== undefined) {
                match = model[key] === input.value || model[key] === 'both' || model[key] === 'universal';
            } else {
                match = model[key] === 'yes' && input.check === '0';
            }

            return [
                {
                    text: match ? '[Match]' : '[No Match]',
                    alignment: 'center',
                    color: match ? 'green' : 'red',
                    width: 40,
                    bold: true
                },
                { text: `${labels[key]}:`, bold: true },
                { text: value }
            ];
        }).filter(row => row !== null); // Remove nulls

        if (tableBody.length > 0) {
            content.push({
                table: {
                    widths: [80, 130, '*'],
                    body: tableBody
                },
                layout: 'noBorders',
                margin: [0, 5, 0, 10]
            });
        }

        if (model.abstract) {
            content.push({
                text: `Abstract:\n${model.abstract}`,
                style: 'abstract'
            });
        }

        if (model.link) {
            content.push({
                text: model.link,
                link: model.link,
                style: 'link'
            });
        }

        content.push({ text: ' ', margin: [0, 0, 0, 10] }); // Spacing
    });

    return content;
}

document.getElementById('exportPdfButton')?.addEventListener('click', () => {
    if (typeof pdfMake === 'undefined') {
        alert("pdfMake is not loaded.");
        return;
    }

    const models = window.currentModels || [];
    const userInput = window.currentUserInput || {};

    if (!models.length) {
        alert("No models to export.");
        return;
    }

    const docDefinition = {
        content: generatePdfContent(models, userInput),
        styles: {
            header: { fontSize: 16, bold: true, margin: [0, 0, 0, 5] },
            subheader: { fontSize: 10, margin: [0, 0, 0, 10] },
            title: { fontSize: 12, bold: true, margin: [0, 4, 0, 2] },
            info: { margin: [0, 2, 0, 0] },
            abstract: { margin: [0, 5, 0, 10], italics: true },
            link: { color: 'blue', decoration: 'underline', fontSize: 9 }
        },
        pageMargins: [30, 30, 30, 30],
        defaultStyle: { fontSize: 10 }
    };

    pdfMake.createPdf(docDefinition).download(`FlexModels_Results_${new Date().toISOString().slice(0, 10)}.pdf`);
});

// Show Models-Button 
document.getElementById('generateButton').addEventListener('click', generateModels);