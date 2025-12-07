function updateConfigCode() {
    const codeParts = [];

    // ===========================
    // 1. Flexibility
    // ===========================
    const flexVal = document.getElementById('flexibility')?.value ?? 'none';
    const flexCheck = getCheckboxState('flexibility');
    const flexCode = flexVal === 'potential' ? '0'
        : flexVal === 'requirement' ? '1'
            : flexVal === 'both' ? '2'
                : '9';
    codeParts.push(`${flexCheck}${flexCode}`);

    // ===========================
    // 2. Asset Types
    // ===========================
    const assetCheck = getCheckboxState('assettypes');
    const selectedAssets = getSelectedOptions(document.getElementById('assettypes'));
    const assetOptions = [
        "renewable generation",
        "conventional generation",
        "grid infrastructure",
        "multi-energy system",
        "chp units",
        "heat pumps",
        "thermal energy storage",
        "distributed generation",
        "electric vehicles",
        "flexible loads",
        "battery storage systems"
    ];
    const binary = assetOptions.map(opt =>
        selectedAssets.includes(opt.toLowerCase()) ? '1' : '0'
    ).join('');
    const base36 = parseInt(binary, 2).toString(36);
    codeParts.push(`${assetCheck}${base36}`);

    // ===========================
    // 3. Classification
    // ===========================
    const classificationVal = document.getElementById('classification')?.value ?? 'none';
    const classificationCheck = getCheckboxState('classification');
    const classificationCode = classificationVal === 'metric' ? '0'
        : classificationVal === 'machine learning model' ? '1'
            : classificationVal === 'envelope' ? '2'
                : '9';
    codeParts.push(`${classificationCheck}${classificationCode}`);

    // ===========================
    // 4. Type
    // ===========================
    const typeVal = document.getElementById('type')?.value ?? 'none';
    const typeCheck = getCheckboxState('type');
    const typeCode = typeVal === 'deterministic' ? '0'
        : typeVal === 'probabilistic' ? '1'
            : '9';
    codeParts.push(`${typeCheck}${typeCode}`);

    // ===========================
    // 5. Time
    // ===========================
    const timeVal = document.getElementById('time')?.value ?? 'none';
    const timeCheck = getCheckboxState('time');
    const timeCode = timeVal === 'discrete' ? '0'
        : timeVal === 'continuous' ? '1'
            : '9';
    codeParts.push(`${timeCheck}${timeCode}`);

    // ===========================
    // 6. Resolution
    // ===========================
    const resolutionVal = document.getElementById('resolution')?.value ?? 'none';
    const resolutionCheck = getCheckboxState('resolution');
    const resolutionCode = resolutionVal === 'short-term' ? '0'
        : resolutionVal === 'long-term' ? '1'
            : resolutionVal === 'both' ? '2'
                : '9';
    codeParts.push(`${resolutionCheck}${resolutionCode}`);

    // ===========================
    // 7. Metric
    // ===========================
    const metricCheck = getCheckboxState('metric');
    const selectedMetrics = getSelectedOptions(document.getElementById('metric'));
    const metricOptions = [
        "active power", "ramp-rate", "reactive power", "energy",
        "voltage", "cost", "time", "ramp duration"
    ];
    const metricBinary = metricOptions.map(opt =>
        selectedMetrics.includes(opt.toLowerCase()) ? '1' : '0'
    ).join('');
    const metricBase36 = parseInt(metricBinary, 2).toString(36);
    codeParts.push(`${metricCheck}${metricBase36}`);

    // ===========================
    // 8. Constraints
    // ===========================
    const constraintCheck = getCheckboxState('constraints');
    const selectedConstraints = getSelectedOptions(document.getElementById('constraints'));
    const constraintOptions = ["technical", "economic", "service guarantees"];
    const constraintBinary = constraintOptions.map(opt =>
        selectedConstraints.includes(opt.toLowerCase()) ? '1' : '0'
    ).join('');
    const constraintDecimal = parseInt(constraintBinary, 2);
    codeParts.push(`${constraintCheck}${constraintDecimal}`);

    // ===========================
    // 9. Sector Coupling
    // ===========================
    const sectorVal = document.getElementById('sectorcoupling')?.value ?? 'none';
    const sectorCheck = getCheckboxState('sectorcoupling');
    const sectorCode = sectorVal === 'heat' ? '0'
        : sectorVal === 'gas' ? '1'
            : sectorVal === 'both' ? '2'
                : '9';
    codeParts.push(`${sectorCheck}${sectorCode}`);

    // ===========================
    // 10. Multi-time-scale
    // ===========================
    const mtsCheck = getCheckboxState('multitimescale');
    codeParts.push(`${mtsCheck}0`);

    // ===========================
    // 11. Mediator
    // ===========================
    const mediatorCheck = getCheckboxState('mediator');
    codeParts.push(`${mediatorCheck}0`);

    // ===========================
    // 12. Uncertainty
    // ===========================
    const uncertaintyCheck = getCheckboxState('uncertainty');
    codeParts.push(`${uncertaintyCheck}0`);

    // ===========================
    // 13. Aggregation
    // ===========================
    const aggregationCheck = getCheckboxState('aggregation');
    codeParts.push(`${aggregationCheck}0`);

    // ===========================
    // Final write to input
    // ===========================
    document.getElementById('configCode').value = codeParts.join('-');
}


function getCheckboxState(paramName) {
    const checkbox = document.getElementById(paramName + 'Check');
    if (!checkbox) return 2;
    const raw = checkbox.dataset.state;
    return raw !== undefined ? parseInt(raw, 10) : 2;
}

function getSelectedOptions(selectElement) {
    if (!selectElement) return [];
    return Array.from(selectElement.selectedOptions).map(opt => opt.value.toLowerCase());
}

function loadConfigurationCode() {
    const code = document.getElementById('configCode').value.trim();
    const errorBox = document.getElementById('configError');
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    const parts = code.split('-');

    // --- Basic format check ---
    if (parts.length < 5) {
        showConfigError("Invalid configuration code format (too short).");
        return;
    }

    // --- General check for all check digits ---
    for (let i = 0; i < parts.length; i++) {
        const checkDigit = parseInt(parts[i][0], 10);
        if (![0, 1, 2].includes(checkDigit)) {
            showConfigError(`Invalid check value in section ${i + 1} (must be 0–2).`);
            return;
        }
    }

    // ===========================
    // 1. Flexibility
    // ===========================
    const flexCheck = parseInt(parts[0][0], 10);
    const flexValueCode = parts[0][1];
    if (!"012".includes(flexValueCode)) {
        showConfigError("Invalid Flexibility value (must be 0, 1 or 2).");
        return;
    }
    const flexValue = flexValueCode === '0' ? 'potential'
        : flexValueCode === '1' ? 'requirement'
            : 'both';
    setTriStateCheckbox('flexibility', flexCheck);
    document.getElementById('flexibility').value = flexValue;

    // ===========================
    // 2. Asset Types
    // ===========================
    const assetCheck = parseInt(parts[1][0], 10);
    const assetBase36 = parts[1].slice(1);
    const assetDecimal = parseInt(assetBase36, 36);

    if (isNaN(assetDecimal) || assetDecimal < 0 || assetDecimal > 2047) {
        showConfigError("Invalid Asset Types value (base36 must be 0–2047).");
        return;
    }
    const binary = assetDecimal.toString(2).padStart(11, '0');
    const assetOptions = [
        "renewable generation",
        "conventional generation",
        "grid infrastructure",
        "multi-energy system",
        "chp units",
        "heat pumps",
        "thermal energy storage",
        "distributed generation",
        "electric vehicles",
        "flexible loads",
        "battery storage systems"
    ];
    const assetSelect = document.getElementById('assettypes');
    if (assetSelect) {
        Array.from(assetSelect.options).forEach((opt, index) => {
            opt.selected = binary[index] === '1';
        });
    }
    setTriStateCheckbox('assettypes', assetCheck);

    // ===========================
    // 3. Classification
    // ===========================
    const classificationCheck = parseInt(parts[2][0], 10);
    const classificationCode = parts[2][1];
    if (!"012".includes(classificationCode)) {
        showConfigError("Invalid Classification value (must be 0–2).");
        return;
    }
    const classificationVal = classificationCode === '0' ? 'metric'
        : classificationCode === '1' ? 'machine learning model'
            : 'envelope';
    setTriStateCheckbox('classification', classificationCheck);
    document.getElementById('classification').value = classificationVal;

    // ===========================
    // 4. Type
    // ===========================
    const typeCheck = parseInt(parts[classificationVal === 'envelope' ? 4 : 3][0], 10);
    const typeCode = parts[classificationVal === 'envelope' ? 4 : 3][1];
    if (!"01".includes(typeCode)) {
        showConfigError("Invalid Type value (must be 0 or 1).");
        return;
    }
    const typeVal = typeCode === '0' ? 'deterministic' : 'probabilistic';
    setTriStateCheckbox('type', typeCheck);
    document.getElementById('type').value = typeVal;

    // ===========================
    // 5. Time
    // ===========================
    const timeIndex = classificationVal === 'envelope' ? 5 : 4;
    if (!parts[timeIndex]) {
        showConfigError("Missing Time section.");
        return;
    }
    const timeCheck = parseInt(parts[timeIndex][0], 10);
    const timeCode = parts[timeIndex][1];
    if (!"01".includes(timeCode)) {
        showConfigError("Invalid Time value (must be 0 or 1).");
        return;
    }
    const timeVal = timeCode === '0' ? 'discrete' : 'continuous';
    setTriStateCheckbox('time', timeCheck);
    document.getElementById('time').value = timeVal;

    // ===========================
    // 6. Resolution
    // ===========================
    if (!parts[5]) {
        showConfigError("Missing Resolution section.");
        return;
    }
    const resolutionCheck = parseInt(parts[5][0], 10);
    const resolutionCode = parts[5][1];
    if (!"012".includes(resolutionCode)) {
        showConfigError("Invalid Resolution value (must be 0–2).");
        return;
    }
    const resolutionVal = resolutionCode === '0' ? 'short-term'
        : resolutionCode === '1' ? 'long-term'
            : 'both';
    setTriStateCheckbox('resolution', resolutionCheck);
    document.getElementById('resolution').value = resolutionVal;

    // ===========================
    // 7. Metric
    // ===========================
    const metricCheck = parseInt(parts[2][0], 10);
    const metricBase36 = parts[2].slice(1);
    const metricDecimal = parseInt(metricBase36, 36);
    if (isNaN(metricDecimal) || metricDecimal < 0 || metricDecimal > 255) {
        showConfigError("Invalid Metric value (base36 must be 0–255).");
        return;
    }
    const metricBinary = metricDecimal.toString(2).padStart(8, '0');
    const metricOptions = [
        "active power",
        "ramp-rate",
        "reactive power",
        "energy",
        "voltage",
        "cost",
        "time",
        "ramp duration"
    ];
    const metricSelect = document.getElementById('metric');
    if (metricSelect) {
        Array.from(metricSelect.options).forEach((opt, index) => {
            opt.selected = metricBinary[index] === '1';
        });
    }
    setTriStateCheckbox('metric', metricCheck);

    // ===========================
    // 8. Constraints
    // ===========================
    if (!parts[7]) {
        showConfigError("Missing Constraints section.");
        return;
    }
    const constraintCheck = parseInt(parts[7][0], 10);
    const constraintCode = parseInt(parts[7].slice(1), 10);
    if (isNaN(constraintCode) || constraintCode < 0 || constraintCode > 7) {
        showConfigError("Invalid Constraints value (must be 0–7).");
        return;
    }
    const constraintBinary = constraintCode.toString(2).padStart(3, '0');
    const constraintOptions = ["technical", "economic", "service guarantees"];
    const constraintSelect = document.getElementById('constraints');
    if (constraintSelect) {
        Array.from(constraintSelect.options).forEach((opt, idx) => {
            opt.selected = constraintBinary[idx] === '1';
        });
    }
    setTriStateCheckbox('constraints', constraintCheck);

    // ===========================
    // 9. Sector Coupling
    // ===========================
    if (!parts[8]) {
        showConfigError("Missing Sector Coupling section.");
        return;
    }
    const sectorCheck = parseInt(parts[8][0], 10);
    const sectorCode = parts[8][1];
    if (!"012".includes(sectorCode)) {
        showConfigError("Invalid Sector Coupling value (must be 0–2).");
        return;
    }
    const sectorVal = sectorCode === '0' ? 'heat'
        : sectorCode === '1' ? 'gas'
            : 'both';
    setTriStateCheckbox('sectorcoupling', sectorCheck);
    document.getElementById('sectorcoupling').value = sectorVal;

    // ===========================
    // 10. Multi-time-scale
    // ===========================
    const mtsCheck = parseInt(parts[9][0], 10);
    setTriStateCheckbox('multitimescale', mtsCheck);

    // ===========================
    // 11. Mediator
    // ===========================
    const mediatorCheck = parseInt(parts[10][0], 10);
    setTriStateCheckbox('mediator', mediatorCheck);

    // ===========================
    // 12. Uncertainty
    // ===========================
    const uncertaintyCheck = parseInt(parts[11][0], 10);
    setTriStateCheckbox('uncertainty', uncertaintyCheck);

    // ===========================
    // 13. Aggregation
    // ===========================
    const aggregationCheck = parseInt(parts[12][0], 10);
    setTriStateCheckbox('aggregation', aggregationCheck);

    // Final update
    updateConfigCode();
    showConfigSuccess();
}


function showConfigError(message) {
    const box = document.getElementById('configError');
    const input = document.getElementById('configCode');
    const icon = document.getElementById('configCodeStatus');
    const loadBtn = document.getElementById('loadButton');

    box.textContent = message;
    box.style.display = 'block';

    // Visuelles Feedback zurücksetzen
    input.classList.remove('valid');
    input.classList.add('invalid');
    icon.textContent = '❌';
    loadBtn.disabled = true;
}

function showConfigSuccess() {
    const successBox = document.getElementById('configSuccess');
    const errorBox = document.getElementById('configError');

    // Uhrzeit
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    successBox.textContent = `🔄 Configuration loaded successfully at ${timeStr}`;
    successBox.style.display = 'block';

    // Eventuelle alte Fehlermeldung verstecken
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    // Nach 2 Sekunden wieder ausblenden
    setTimeout(() => {
        successBox.style.display = 'none';
        successBox.textContent = '';
    }, 4000);
}

function showShareSuccess() {
    const box = document.getElementById('shareSuccess');
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    box.textContent = `🔗 Link copied to clipboard at ${timeStr}`;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 4000);
}

function setTriStateCheckbox(paramName, state) {
    const checkbox = document.getElementById(paramName + 'Check');
    const label = document.getElementById(paramName + 'CheckboxLabel');

    if (!checkbox || !label) return;

    // Clean up old classes
    label.classList.remove('checked', 'exclamation');

    // Apply class based on new state
    if (state === 1) {
        label.classList.add('checked');
    } else if (state === 2) {
        label.classList.add('exclamation');
    }

    // Set data attribute
    checkbox.setAttribute('data-state', state);

    // ALSO UPDATE SELECT FIELD ENABLE/DISABLE
    if (typeof toggleSelectFlexibility === 'function') {
        toggleSelectFlexibility(paramName, state);
    }
}

function validateConfigurationCodeLive() {
    const input = document.getElementById('configCode');
    const icon = document.getElementById('configCodeStatus');
    const loadBtn = document.getElementById('loadButton');
    const shareBtn = document.getElementById('shareButton');
    const copyBtn = document.getElementById('copyButton');

    const value = input.value.trim();
    const parts = value.split('-');

    input.classList.remove('valid', 'invalid');
    icon.textContent = '';
    loadBtn.disabled = true;
    shareBtn.disabled = true;
    copyBtn.disabled = true;

    if (parts.length < 5) {
        input.classList.add('invalid');
        icon.textContent = '❌';
        return;
    }

    for (let i = 0; i < parts.length; i++) {
        const checkDigit = parseInt(parts[i][0], 10);
        if (![0, 1, 2].includes(checkDigit)) {
            input.classList.add('invalid');
            icon.textContent = '❌';
            return;
        }
    }

    const [
        flexCode,
        assetRaw,
        classificationCode,
        typeCode,
        timeCode,
        resolutionCode,
        metricRaw,
        constraintRaw,
        sectorCode,
        multitimescaleCode,
        mediatorCode,
        uncertaintyCode,
        aggregationCode
    ] = [
            parts[0]?.[1],           // Flexibility value code
            parts[1]?.slice(1),      // Asset Types base36
            parts[2]?.[1],           // Classification value code
            parts[3]?.[1],           // Type value code
            parts[4]?.[1],           // Time value code
            parts[5]?.[1],           // Resolution value code
            parts[6]?.slice(1),      // Metric base36
            parts[7]?.slice(1),      // Constraints decimal
            parts[8]?.[1],           // Sector Coupling value code
            parts[9]?.[0],           // MultiTimeScale tri-state code
            parts[10]?.[0],          // Mediator tri-state code
            parts[11]?.[0],          // Uncertainty tri-state code
            parts[12]?.[0]           // Aggregation tri-state code
        ];

    const assetDecimal = parseInt(assetRaw, 36);
    const metricDecimal = parseInt(metricRaw, 36);
    const constraintDecimal = parseInt(constraintRaw, 10);

    const isValid =
        "012".includes(flexCode) &&
        !isNaN(assetDecimal) && assetDecimal >= 0 && assetDecimal <= 2047 &&
        "012".includes(classificationCode) &&
        "01".includes(typeCode) &&
        "01".includes(timeCode) &&
        "012".includes(resolutionCode) &&
        !isNaN(metricDecimal) && metricDecimal >= 0 && metricDecimal <= 255 &&
        !isNaN(constraintDecimal) && constraintDecimal >= 0 && constraintDecimal <= 7 &&
        "012".includes(sectorCode) &&
        "012".includes(multitimescaleCode) &&
        "012".includes(mediatorCode) &&
        "012".includes(uncertaintyCode) &&
        "012".includes(aggregationCode);

    if (!isValid) {
        input.classList.add('invalid');
        icon.textContent = '❌';
        return;
    }

    // Alles gültig
    input.classList.add('valid');
    icon.textContent = '✔️';
    loadBtn.disabled = false;
    shareBtn.disabled = false;
    copyBtn.disabled = false;
}

function handleShareButtonClick() {
    const config = document.getElementById('configCode').value.trim();

    if (!config || document.getElementById('configCode').classList.contains('invalid')) {
        alert("Please enter a valid configuration code first.");
        return;
    }

    const baseURL = window.location.href.split('?')[0];
    const fullURL = `${baseURL}?config=${encodeURIComponent(config)}`;

    navigator.clipboard.writeText(fullURL).then(() => {
        showShareSuccess();
    }).catch(err => {
        alert("Failed to copy to clipboard.");
        console.error(err);
    });
}

function clearConfigMessages() {
    const errorBox = document.getElementById('configError');
    const successBox = document.getElementById('configSuccess');
    const input = document.getElementById('configCode');
    const icon = document.getElementById('configCodeStatus');

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    successBox.textContent = '';
    successBox.style.display = 'none';

    input.classList.remove('valid', 'invalid');
    icon.textContent = '';
}

function handleCopyButtonClick() {
    const input = document.getElementById('configCode');
    const code = input.value.trim();
    const copyBox = document.getElementById('copySuccess');

    if (!code || input.classList.contains('invalid')) {
        alert("Please enter a valid configuration code first.");
        return;
    }

    navigator.clipboard.writeText(code).then(() => {
        // Uhrzeit für Feedback
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        copyBox.textContent = `✔️ Code copied to clipboard at ${timeStr}`;
        copyBox.style.display = "block";

        // Nach 2 Sekunden ausblenden
        setTimeout(() => {
            copyBox.style.display = "none";
            copyBox.textContent = "";
        }, 2000);
    }).catch(err => {
        alert("Failed to copy code.");
        console.error(err);
    });
}

/**
 * Updates the maximum value of the match threshold slider based on the number
 * of active parameters (i.e., those not marked as "required").
 * 
 * If any parameters are set to "required" (tri-state value = 1),
 * they cannot contribute to a match and are excluded from the slider range.
 * 
 * This function:
 * - Dynamically adjusts the slider's max value to reflect active parameters.
 * - Resets the current value if it exceeds the new max.
 * - Updates the label to show "Value: X of Y".
 */
function updateSliderMaximum() {
    const slider = document.getElementById('myRange');
    const sliderLabel = document.getElementById('sliderValue');

    // All parameter IDs that contribute to matching
    const parameterIDs = [
        'flexibility', 'assettypes', 'classification', 'type',
        'time', 'resolution', 'metric', 'constraints',
        'sectorcoupling', 'multitimescale', 'mediator', 'uncertainty', 'aggregation'
    ];

    // Count parameters that are not set to "required" (state ≠ 2)
    const activeParams = parameterIDs.filter(id => {
        const check = parseInt(document.getElementById(id + 'Check')?.dataset?.state, 10);
        return check !== 2;
    }).length;

    // Adjust slider maximum and current value if necessary
    slider.max = activeParams;
    if (parseInt(slider.value, 10) > activeParams) {
        slider.value = activeParams;
    }

    // Update label to show current slider value relative to max
    sliderLabel.textContent = `Matching Threshold: ${slider.value} of ${activeParams}`;
}


/**
 * Enables or disables the <select> element associated with a parameter
 * based on the tri-state checkbox value.
 *
 * @param {string} parameter - The base ID of the parameter (e.g., 'flexibility', 'metric').
 * @param {number} state - The tri-state value: 
 *                         0 = desirable → enable select,
 *                         1 = required  → enable select,
 *                         2 = irrelevant → disable select.
 */
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

    // Update the config code
    updateConfigCode();
    updateSliderMaximum();
}

document.getElementById('loadButton').addEventListener('click', loadConfigurationCode);
document.getElementById('configCode').addEventListener('input', validateConfigurationCodeLive);
document.getElementById('copyButton').addEventListener('click', handleCopyButtonClick);
document.getElementById('shareButton').addEventListener('click', handleShareButtonClick);
document.getElementById('resetButton').addEventListener('click', () => {
    updateConfigCode();          // Schreibe aktuellen UI-Zustand ins Feld
    clearConfigMessages();       // Setze UI-Zustand zurück (Fehlermeldungen etc.)
    validateConfigurationCodeLive(); // Danach prüfen und grün/rot setzen
});

window.addEventListener('DOMContentLoaded', () => {
    validateConfigurationCodeLive();

    // URL-Parameter prüfen
    const params = new URLSearchParams(window.location.search);
    const configCode = params.get('config');
    if (configCode) {
        document.getElementById('configCode').value = configCode;
        loadConfigurationCode();
    }

    ['flexibility', 'assettypes', 'classification', 'type', 'time', 'resolution', 'metric', 'constraints', 'sectorcoupling', 'multitimescale', 'mediator', 'uncertainty', 'aggregation'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', updateConfigCode);
    });
    updateSliderMaximum(); // ensures slider is initialized correctly
});