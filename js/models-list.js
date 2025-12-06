// Attach expand/collapse behavior to the models list on page load
document.addEventListener('DOMContentLoaded', function () {
    // Find all expand buttons
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // prevent any default actions
            e.preventDefault();

            // find the parent .flexmodels container
            const flexmodels = btn.closest('.flexmodels');
            if (!flexmodels) return;

            const details = flexmodels.querySelector('.model-details');
            if (!details) return;

            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                btn.textContent = '▾';
                details.style.maxHeight = '0';
            } else {
                btn.setAttribute('aria-expanded', 'true');
                btn.textContent = '▴';
                // allow the content to grow to its scrollHeight
                details.style.maxHeight = details.scrollHeight + 'px';
            }
        });

        // initialize collapsed
        const flexmodels = btn.closest('.flexmodels');
        const details = flexmodels && flexmodels.querySelector('.model-details');
        if (details) {
            details.style.maxHeight = '0';
        }
    });

    // Optional: allow clicking the row to expand too
    const mainRows = document.querySelectorAll('.row-main');
    mainRows.forEach(row => {
        row.addEventListener('click', function (e) {
            // avoid toggling when clicking the implementation link
            if (e.target.tagName === 'A' || e.target.closest('.expand-col')) return;
            const btn = row.querySelector('.expand-btn');
            if (btn) btn.click();
        });
    });
});
