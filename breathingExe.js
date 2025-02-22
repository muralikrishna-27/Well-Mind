// Breathing Exercise Functionality
const breathingCircle = document.getElementById('breathing-circle');
const breathingInstruction = document.getElementById('breathing-instruction');
const breathingCount = document.getElementById('breathing-count');
const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');

let breathingInterval;
let breathingPhase = 'ready';
let breathingSecondCount = 0;

function updateBreathingUI() {
    switch (breathingPhase) {
        case 'inhale':
            breathingCircle.classList.add('inhale');
            breathingCircle.classList.remove('exhale');
            breathingInstruction.textContent = 'Breathe in...';
            break;
        case 'hold':
            breathingInstruction.textContent = 'Hold...';
            break;
        case 'exhale':
            breathingCircle.classList.remove('inhale');
            breathingCircle.classList.add('exhale');
            breathingInstruction.textContent = 'Breathe out...';
            break;
        default:
            breathingCircle.classList.remove('inhale', 'exhale');
            breathingInstruction.textContent = 'Ready to begin';
    }
}

function startBreathingExercise() {
    // Reset state
    breathingPhase = 'inhale';
    breathingSecondCount = 0;
    
    // Update UI
    startBreathingBtn.style.display = 'none';
    stopBreathingBtn.style.display = 'inline-block';
    updateBreathingUI();
    
    // Start interval
    breathingInterval = setInterval(() => {
        breathingSecondCount++;
        
        // Update count display
        breathingCount.textContent = breathingSecondCount;
        
        // Manage breathing phases
        if (breathingPhase === 'inhale' && breathingSecondCount >= 5) {
            breathingPhase = 'hold';
            breathingSecondCount = 0;
            updateBreathingUI();
        } else if (breathingPhase === 'hold' && breathingSecondCount >= 5) {
            breathingPhase = 'exhale';
            breathingSecondCount = 0;
            updateBreathingUI();
        } else if (breathingPhase === 'exhale' && breathingSecondCount >= 5) {
            breathingPhase = 'inhale';
            breathingSecondCount = 0;
            updateBreathingUI();
        }
    }, 1000);
}

function stopBreathingExercise() {
    clearInterval(breathingInterval);
    breathingPhase = 'ready';
    breathingCount.textContent = '5-5-5';
    startBreathingBtn.style.display = 'inline-block';
    stopBreathingBtn.style.display = 'none';
    updateBreathingUI();
}

startBreathingBtn.addEventListener('click', startBreathingExercise);
stopBreathingBtn.addEventListener('click', stopBreathingExercise);