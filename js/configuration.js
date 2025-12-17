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
    // 2. Asset Types (DOM order!)
    // ===========================
    const assetCheck = getCheckboxState('assettypes');
    const assetSelect = document.getElementById('assettypes');
    const assetOptions = getSelectValuesInDomOrder(assetSelect); // lowercased values
    const selectedAssets = getSelectedOptions(assetSelect);      // lowercased values

    const assetBinary = assetOptions.map(v => selectedAssets.includes(v) ? '1' : '0').join('');
    const assetBase36 = parseInt(assetBinary || '0', 2).toString(36);
    codeParts.push(`${assetCheck}${assetBase36}`);

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
    // 7. Metric (DOM order!)
    // ===========================
    const metricCheck = getCheckboxState('metric');
    const metricSelect = document.getElementById('metric');
    const metricOptions = getSelectValuesInDomOrder(metricSelect);
    const selectedMetrics = getSelectedOptions(metricSelect);

    const metricBinary = metricOptions.map(v => selectedMetrics.includes(v) ? '1' : '0').join('');
    const metricBase36 = parseInt(metricBinary || '0', 2).toString(36);
    codeParts.push(`${metricCheck}${metricBase36}`);

    // ===========================
    // 8. Constraints (DOM order!)
    // ===========================
    const constraintCheck = getCheckboxState('constraints');
    const constraintSelect = document.getElementById('constraints');
    const constraintOptions = getSelectValuesInDomOrder(constraintSelect);
    const selectedConstraints = getSelectedOptions(constraintSelect);

    const constraintBinary = constraintOptions.map(v => selectedConstraints.includes(v) ? '1' : '0').join('');
    const constraintDecimal = parseInt(constraintBinary || '0', 2);
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

function getSelectValuesInDomOrder(selectElement) {
    if (!selectElement) return [];
    return Array.from(selectElement.options).map(opt => (opt.value || '').toLowerCase());
}

function loadConfigurationCode() {
    const code = document.getElementById('configCode').value.trim();
    const errorBox = document.getElementById('configError');
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    const parts = code.split('-');

    // must be exactly your 13 sections (or at least 13)
    if (parts.length < 13) {
        showConfigError("Invalid configuration code format (too short).");
        return;
    }

    // check digits
    for (let i = 0; i < parts.length; i++) {
        const checkDigit = parseInt(parts[i][0], 10);
        if (![0, 1, 2].includes(checkDigit)) {
            showConfigError(`Invalid check value in section ${i + 1} (must be 0–2).`);
            return;
        }
    }

    // 1 Flexibility
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

    // 2 Asset Types (decode using DOM order!)
    const assetCheck = parseInt(parts[1][0], 10);
    const assetBase36 = parts[1].slice(1);
    const assetDecimal = parseInt(assetBase36, 36);
    if (isNaN(assetDecimal) || assetDecimal < 0) {
        showConfigError("Invalid Asset Types value (base36).");
        return;
    }
    const assetSelect = document.getElementById('assettypes');
    if (assetSelect) {
        const assetLen = assetSelect.options.length;
        const assetBinary = assetDecimal.toString(2).padStart(assetLen, '0');

        Array.from(assetSelect.options).forEach((opt, idx) => {
            opt.selected = assetBinary[idx] === '1';
        });
    }
    setTriStateCheckbox('assettypes', assetCheck);

    // 3 Classification
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

    // 4 Type (fixed index)
    const typeCheck = parseInt(parts[3][0], 10);
    const typeCode = parts[3][1];
    if (!"01".includes(typeCode)) {
        showConfigError("Invalid Type value (must be 0 or 1).");
        return;
    }
    const typeVal = typeCode === '0' ? 'deterministic' : 'probabilistic';
    setTriStateCheckbox('type', typeCheck);
    document.getElementById('type').value = typeVal;

    // 5 Time (fixed index)
    const timeCheck = parseInt(parts[4][0], 10);
    const timeCode = parts[4][1];
    if (!"01".includes(timeCode)) {
        showConfigError("Invalid Time value (must be 0 or 1).");
        return;
    }
    const timeVal = timeCode === '0' ? 'discrete' : 'continuous';
    setTriStateCheckbox('time', timeCheck);
    document.getElementById('time').value = timeVal;

    // 6 Resolution (fixed index)
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

    // 7 Metric (FIXED: parts[6], DOM order!)
    const metricCheck = parseInt(parts[6][0], 10);
    const metricBase36 = parts[6].slice(1);
    const metricDecimal = parseInt(metricBase36, 36);
    if (isNaN(metricDecimal) || metricDecimal < 0) {
        showConfigError("Invalid Metric value (base36).");
        return;
    }
    const metricSelect = document.getElementById('metric');
    if (metricSelect) {
        const metricLen = metricSelect.options.length;
        const metricBinary = metricDecimal.toString(2).padStart(metricLen, '0');

        Array.from(metricSelect.options).forEach((opt, idx) => {
            opt.selected = metricBinary[idx] === '1';
        });
    }
    setTriStateCheckbox('metric', metricCheck);

    // 8 Constraints (fixed index, DOM order!)
    const constraintCheck = parseInt(parts[7][0], 10);
    const constraintCode = parseInt(parts[7].slice(1), 10);
    if (isNaN(constraintCode) || constraintCode < 0) {
        showConfigError("Invalid Constraints value (decimal).");
        return;
    }
    const constraintSelect = document.getElementById('constraints');
    if (constraintSelect) {
        const cLen = constraintSelect.options.length;
        const constraintBinary = constraintCode.toString(2).padStart(cLen, '0');

        Array.from(constraintSelect.options).forEach((opt, idx) => {
            opt.selected = constraintBinary[idx] === '1';
        });
    }
    setTriStateCheckbox('constraints', constraintCheck);

    // 9 Sector Coupling
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

    // 10–13 Tri-states (fixed indices)
    setTriStateCheckbox('multitimescale', parseInt(parts[9][0], 10));
    setTriStateCheckbox('mediator',      parseInt(parts[10][0], 10));
    setTriStateCheckbox('uncertainty',   parseInt(parts[11][0], 10));
    setTriStateCheckbox('aggregation',   parseInt(parts[12][0], 10));

    // IMPORTANT: after setting UI from code, regenerate canonical code
    updateConfigCode();
    showConfigSuccess();
}

// --- your existing helpers below unchanged ---
function showConfigError(message) {
    const box = document.getElementById('configError');
    const input = document.getElementById('configCode');
    const icon = document.getElementById('configCodeStatus');
    const loadBtn = document.getElementById('loadButton');

    box.textContent = message;
    box.style.display = 'block';

    input.classList.remove('valid');
    input.classList.add('invalid');
    icon.textContent = '❌';
    loadBtn.disabled = true;
}

function showConfigSuccess() {
    const successBox = document.getElementById('configSuccess');
    const errorBox = document.getElementById('configError');

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    successBox.textContent = `🔄 Configuration loaded successfully at ${timeStr}`;
    successBox.style.display = 'block';

    errorBox.style.display = 'none';
    errorBox.textContent = '';

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

    label.classList.remove('checked', 'exclamation');

    if (state === 1) label.classList.add('checked');
    else if (state === 2) label.classList.add('exclamation');

    checkbox.setAttribute('data-state', state);

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

    if (parts.length < 13) {
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

    // minimal validation (your original was fine, just ensure indices exist)
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
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        copyBox.textContent = `✔️ Code copied to clipboard at ${timeStr}`;
        copyBox.style.display = "block";

        setTimeout(() => {
            copyBox.style.display = "none";
            copyBox.textContent = "";
        }, 2000);
    }).catch(err => {
        alert("Failed to copy code.");
        console.error(err);
    });
}

function updateSliderMaximum() {
    const slider = document.getElementById('myRange');
    const sliderLabel = document.getElementById('sliderValue');

    const parameterIDs = [
        'flexibility', 'assettypes', 'classification', 'type',
        'time', 'resolution', 'metric', 'constraints',
        'sectorcoupling', 'multitimescale', 'mediator', 'uncertainty', 'aggregation'
    ];

    const activeParams = parameterIDs.filter(id => {
        const check = parseInt(document.getElementById(id + 'Check')?.dataset?.state, 10);
        return check !== 2;
    }).length;

    slider.max = activeParams;
    if (parseInt(slider.value, 10) > activeParams) slider.value = activeParams;

    sliderLabel.textContent = `Matching Threshold: ${slider.value} of ${activeParams}`;
}

function toggleSelectFlexibility(parameter, state) {
    var select = document.getElementById(parameter);
    var selectWeight = document.getElementById(parameter + 'Weight');
    var selectLabel = document.getElementById(parameter + 'Label');
    var selectCheckboxLabel = document.getElementById(parameter + 'CheckboxLabel');

    if (state === 0) {
        if (select) select.disabled = false;
        if (selectWeight) selectWeight.disabled = false;
        if (selectLabel) selectLabel.style.fontWeight = "normal";
        if (selectCheckboxLabel) selectCheckboxLabel.title = "Parameter is desired";
    } else if (state === 1) {
        if (select) select.disabled = false;
        if (selectWeight) selectWeight.disabled = false;
        if (selectLabel) selectLabel.style.fontWeight = "bold";
        if (selectCheckboxLabel) selectCheckboxLabel.title = "Parameter is mandatory";
    } else if (state === 2) {
        if (select) select.disabled = true;
        if (selectWeight) selectWeight.disabled = true;
        if (selectLabel) selectLabel.style.fontWeight = "normal";
        if (selectCheckboxLabel) selectCheckboxLabel.title = "Parameter is irrelevant";
    }
}

function toggleTriState(parameter) {
    const label = document.getElementById(parameter + 'CheckboxLabel');
    const checkbox = document.getElementById(parameter + 'Check');

    let state = parseInt(checkbox.getAttribute('data-state'), 10);

    label.classList.remove('checked', 'exclamation');

    state = (state + 1) % 3;

    if (state === 1) label.classList.add('checked');
    else if (state === 2) label.classList.add('exclamation');

    checkbox.setAttribute('data-state', state);

    toggleSelectFlexibility(parameter, state);

    updateConfigCode();
    updateSliderMaximum();
}

document.getElementById('loadButton').addEventListener('click', loadConfigurationCode);
document.getElementById('configCode').addEventListener('input', validateConfigurationCodeLive);
document.getElementById('copyButton').addEventListener('click', handleCopyButtonClick);
document.getElementById('shareButton').addEventListener('click', handleShareButtonClick);
document.getElementById('resetButton').addEventListener('click', () => {
    updateConfigCode();
    clearConfigMessages();
    validateConfigurationCodeLive();
});

window.addEventListener('DOMContentLoaded', () => {
    validateConfigurationCodeLive();

    const params = new URLSearchParams(window.location.search);
    const configCode = params.get('config');
    if (configCode) {
        document.getElementById('configCode').value = configCode;
        loadConfigurationCode();
    }

    ['flexibility', 'assettypes', 'classification', 'type', 'time', 'resolution', 'metric', 'constraints', 'sectorcoupling', 'multitimescale', 'mediator', 'uncertainty', 'aggregation']
        .forEach(id => document.getElementById(id)?.addEventListener('change', updateConfigCode));

    updateSliderMaximum();
});
