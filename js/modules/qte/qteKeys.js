import { getKeySequence, checkKeySequence } from '../gameState.js';
import { markCaught } from '../collection.js';

let currentKeyIndex = 0;
let timeLeft = 6.0;
let timerInterval = null;
let isGameOver = false;
let userSequence = [];

export function initKeySequence() {
    console.log("Initializing Key Sequence phase...");
    
    const sequence = getKeySequence();
    if (!sequence || sequence.length === 0) {
        console.error("No key sequence available!");
        return;
    }
    
    resetKeySequence();
    renderKeyBoxes(sequence);
    startKeyTimer();
    setupKeyListeners();
}

function renderKeyBoxes(sequence) {
    const container = document.getElementById('key-sequence');
    if (!container) return;
    
    container.innerHTML = '';
    
    sequence.forEach((key, index) => {
        const keyBox = document.createElement('div');
        keyBox.className = 'key-box';
        keyBox.id = `key-${index}`;
        keyBox.textContent = key;
        container.appendChild(keyBox);
    });
    
    updateKeyCounter();
}

function setupKeyListeners() {
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    if (isGameOver) return;
    
    const keyPressed = event.key.toUpperCase();
    const sequence = getKeySequence();
    
    if (currentKeyIndex >= sequence.length) return;
    
    const expectedKey = sequence[currentKeyIndex];
    const keyBox = document.getElementById(`key-${currentKeyIndex}`);
    
    if (!keyBox) return;
    
    if (keyPressed === expectedKey) {
        
        keyBox.classList.add('correct');
        keyBox.classList.remove('wrong');
        userSequence.push(keyPressed);
        currentKeyIndex++;
        updateKeyCounter();
        
        if (currentKeyIndex === sequence.length) {
            handleKeySequenceSuccess();
        }
    } else {
        keyBox.classList.add('wrong');
        keyBox.classList.remove('correct');
        handleKeySequenceFailure();
    }
}

function updateKeyCounter() {
    const counter = document.getElementById('key-count');
    if (counter) {
        counter.textContent = `${currentKeyIndex} / ${getKeySequence().length}`;
    }
}

function startKeyTimer() {
    const timerFill = document.getElementById('key-timer-fill');
    const timeDisplay = document.getElementById('key-time');
    
    if (!timerFill || !timeDisplay) return;
    
    const startTime = Date.now();
    const totalTime = 6.0; 
    
    timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        timeLeft = (totalTime - elapsed).toFixed(1);
        
        const progressPercent = (elapsed / totalTime) * 100;
        timerFill.style.width = `${Math.min(progressPercent, 100)}%`;
        
        timeDisplay.textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0) {
            timeDisplay.textContent = "0.0s";
            handleKeySequenceFailure();
        }
    }, 100);
}

function handleKeySequenceSuccess() {
    clearInterval(timerInterval);
    isGameOver = true;
    
    const isCorrect = checkKeySequence(userSequence);
    
    if (isCorrect) {
        console.log("Key sequence completed successfully!");
        
        setTimeout(() => {
            document.getElementById('qte2')?.classList.add('hidden');
            showResultModal();
        }, 500);
    }
}

function handleKeySequenceFailure() {
    clearInterval(timerInterval);
    isGameOver = true;
    
    console.log("Key sequence failed!");
    
    setTimeout(() => {
        document.getElementById('qte2')?.classList.add('hidden');
        alert("Failed key sequence! Try again.");
        if (window.restartToPhase1) {
            restartToPhase1();
        }
    }, 500);
}

function showResultModal() {
    const resultModal = document.getElementById('result-modal');
    if (resultModal) {
        resultModal.classList.remove('hidden');
    }
}

function resetKeySequence() {
    currentKeyIndex = 0;
    timeLeft = 6.0;
    isGameOver = false;
    userSequence = [];
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    document.removeEventListener('keydown', handleKeyPress);
}

export function startKeySequencePhase() {
    document.getElementById('qte2')?.classList.remove('hidden');
    initKeySequence();
}