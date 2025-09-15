
  let tooltipTimeout;

  function toggleTooltip(button) {
    const tooltip = button.nextElementSibling;

    // Hide other tooltips first
    document.querySelectorAll('.tooltip.show').forEach(t => {
      if (t !== tooltip) t.classList.remove('show');
    });

    // Show current tooltip
    tooltip.classList.add('show');

    // Reset timer
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
      tooltip.classList.remove('show');
    }, 10000);
  }

  // Optional: Hide tooltip on outside tap
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tooltip-trigger')) {
      document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('show'));
    }
  });
