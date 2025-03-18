<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuration Saving</title>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const configInput = document.getElementById("configCode");
            const checkboxes = document.querySelectorAll("input[type='checkbox']");
            const dropdowns = document.querySelectorAll("select:not([multiple])");
            const multiSelects = document.querySelectorAll("select[multiple]"); // Select all multi-choice boxes

            function getConfig() {
                let configParts = [];

                // Save checkboxes (0 or 1)
                checkboxes.forEach(cb => configParts.push(cb.checked ? 1 : 0));

                // Save dropdowns (index of selected option)
                dropdowns.forEach(dd => configParts.push(dd.selectedIndex));

                // Save multiple selection boxes as summed indices (bitmask)
                multiSelects.forEach(ms => {
                    let multiSelectValue = Array.from(ms.selectedOptions).reduce((sum, opt) => sum + Math.pow(2, opt.index), 0);
                    configParts.push(multiSelectValue);
                });

                return configParts.join("-");
            }

            function setConfig(code) {
                let configParts = code.split("-").map(num => parseInt(num, 10));

                if (configParts.length !== checkboxes.length + dropdowns.length + multiSelects.length) return;

                let index = 0;

                // Restore checkboxes
                checkboxes.forEach(cb => cb.checked = configParts[index++] === 1);

                // Restore dropdowns
                dropdowns.forEach(dd => dd.selectedIndex = configParts[index++]);

                // Restore multiple selections
                multiSelects.forEach(ms => {
                    let multiSelectValue = configParts[index++];
                    Array.from(ms.options).forEach((opt, idx) => {
                        opt.selected = (multiSelectValue & Math.pow(2, idx)) !== 0;
                    });
                });
            }

            function updateConfigCode() {
                let configCode = getConfig();
                configInput.value = configCode;
                localStorage.setItem("savedConfig", configCode);
            }

            function loadConfig() {
                let configCode = configInput.value.trim();
                if (configCode) {
                    setConfig(configCode);
                    localStorage.setItem("savedConfig", configCode);
                }
            }

            function copyToClipboard() {
                configInput.select();
                document.execCommand("copy");
                alert("Configuration code copied!");
            }

            function shareConfig() {
                let configCode = configInput.value.trim();
                if (configCode) {
                    let shareURL = window.location.origin + window.location.pathname + "?config=" + encodeURIComponent(configCode);
                    navigator.clipboard.writeText(shareURL).then(() => {
                        alert("Share Link copied!");
                    });
                }
            }

            checkboxes.forEach(cb => cb.addEventListener("change", updateConfigCode));
            dropdowns.forEach(dd => dd.addEventListener("change", updateConfigCode));
            multiSelects.forEach(ms => ms.addEventListener("change", updateConfigCode));

            let savedConfig = localStorage.getItem("savedConfig");
            if (savedConfig) {
                configInput.value = savedConfig;
                setConfig(savedConfig);
            }

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has("config")) {
                let configCode = urlParams.get("config");
                setConfig(configCode);
                configInput.value = configCode;
                localStorage.setItem("savedConfig", configCode);
            }

            document.getElementById("copyButton").addEventListener("click", copyToClipboard);
            document.getElementById("loadButton").addEventListener("click", loadConfig);
            document.getElementById("shareButton").addEventListener("click", shareConfig);
        });
    </script>
</head>
<body>
    <h1>Configuration Saving</h1>

    <!-- Checkbox -->
    <div class="form-group">
        <label for="enableOptions">
            <input type="checkbox" id="enableOptions"> Multi-time scale
        </label>
    </div>

    <!-- Dropdown -->
    <div class="form-group">
        <label for="dropdown">Select an option:</label>
        <select id="dropdown">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
        </select>
    </div>

    <!-- Multiple Choice Box (Asset Types) -->
    <div class="form-group">
        <label for="multiSelect"><b>Asset Types</b></label>
        <br>
        <small>(hold Ctrl/Cmd to select multiple)</small>
        <br>
        <select id="multiSelect" multiple size="8">
            <option value="universal">Universal</option>
            <option value="storage">Energy Storage Systems</option>
            <option value="demand">Demand Response Program</option>
            <option value="renewable">Renewable Energy Sources</option>
            <option value="generation">Distributed Generation</option>
            <option value="flexible">Flexible Loads</option>
            <option value="grid">Grid Infrastructure</option>
            <option value="vehicles">Electric Vehicles</option>
        </select>
    </div>

    <!-- Multiple Choice Box (Constraints) -->
    <div class="form-group">
        <label for="constraints"><b>Constraints</b></label>
        <br>
        <small>(hold Ctrl/Cmd to select multiple)</small>
        <br>
        <select id="constraints" multiple size="3">
            <option value="technical">Technical</option>
            <option value="economic">Economic</option>
            <option value="service">Service Guarantees</option>
        </select>
    </div>

    <h2>Configuration code:</h2>
    <input type="text" id="configCode">
    <button id="copyButton">📋 Copy</button>
    <button id="loadButton">🔄 Load</button>
    <button id="shareButton">🔗 Share</button>

</body>
</html>
