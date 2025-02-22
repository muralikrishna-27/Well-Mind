// Mood Tracker Functionality
const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
        
function updateMoodHistory() {
    const historyContainer = document.getElementById('mood-history');
    historyContainer.innerHTML = '';
    
    if (moodHistory.length === 0) {
        historyContainer.innerHTML = '<p class="empty-state">No mood entries yet.\n Start tracking your mood!</p>';
        return;
    }
    
    moodHistory.forEach(entry => {
        const moodEntry = document.createElement('div');
        moodEntry.classList.add('mood-entry');
        
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = new Date(entry.date).toLocaleDateString('en-US', dateOptions);
        const formattedTime = new Date(entry.date).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
        });
        
        moodEntry.innerHTML = `
            <span class="mood-date">${formattedDate}, ${formattedTime}</span>
            <span class="mood-value">${entry.emoji} ${entry.mood}</span>
        `;
        
        historyContainer.prepend(moodEntry);
    });
}

// Initialize mood history display
updateMoodHistory();

// Add mood tracking functionality
document.querySelectorAll('.mood-btn').forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.dataset.mood;
        let emoji;
        
        switch (mood) {
            case 'Great': emoji = '😄'; break;
            case 'Good': emoji = '🙂'; break;
            case 'Okay': emoji = '😐'; break;
            case 'Down': emoji = '😔'; break;
            case 'Stressed': emoji = '😰'; break;
            default: emoji = '😐';
        }
        
        // Add new mood entry
        moodHistory.push({
            mood,
            emoji,
            date: new Date().toISOString()
        });
        
        // Keep only last 30 entries
        if (moodHistory.length > 30) {
            moodHistory.shift();
        }
        
        // Save to localStorage
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
        
        // Update display
        updateMoodHistory();
        
        // Show confirmation
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = '';
        }, 300);
    });
});