// Account Activity Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize activity monitoring
    const activityMonitor = {
        startTime: new Date(),
        updateTimer: function() {
            const timeElement = document.querySelector('.session-time');
            if (timeElement) {
                const elapsed = Math.floor((new Date() - this.startTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                timeElement.textContent = `${minutes}m ${seconds}s`;
            }
        }
    };

    // Add session time display
    const activityDetails = document.querySelector('.activity-details');
    if (activityDetails) {
        const sessionInfo = document.createElement('p');
        sessionInfo.innerHTML = '<strong>Current Session:</strong> <span class="session-time">0m 0s</span>';
        activityDetails.appendChild(sessionInfo);
        
        // Update session time every second
        setInterval(() => activityMonitor.updateTimer(), 1000);
    }

    // Add interactive tooltips
    const detailItems = document.querySelectorAll('.activity-details p');
    detailItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove any existing tooltips
            document.querySelectorAll('.tooltip').forEach(t => t.remove());
            
            // Create and add new tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Last updated: ' + new Date().toLocaleString();
            this.appendChild(tooltip);
            
            // Remove tooltip after 2 seconds
            setTimeout(() => tooltip.remove(), 2000);
        });
    });

    // Add confirmation for account updates
    const updateButton = document.querySelector('a[href*="update"]');
    if (updateButton) {
        updateButton.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to update your account information?')) {
                e.preventDefault();
            }
        });
    }
});