// /js/modules/gameMain.js
import { resetGame, loadRound } from './gameState.js';
import { resetPlayerState } from './playerState.js';
import { updateGameUI, startNewRound } from './uiConnector.js';
import { setupDepthMeter } from './phaseManager.js';
import { renderCompendium } from './compendium.js';
import { renderCollection } from './collection.js';

export function initGame() {
    console.log("🎮 Initializing game...");
    
    resetGame();
    resetPlayerState();
    
    loadRound(1);
    
    updateGameUI();
    renderCompendium();
    renderCollection();
    
    setupDepthMeter();
    
    setupBasicEvents();
    
    console.log("Game ready!");
}

function setupBasicEvents() {
    document.getElementById('continue-button')?.addEventListener('click', () => {
        const state = getGameState();
        const nextRound = state.currentRound + 1;
        startNewRound(nextRound);
        showRoundTransition(nextRound);
    });
}

function showRoundTransition(roundNumber) {
    const transition = document.getElementById('round-transition');
    const roundSpan = document.getElementById('transition-round');
    
    if (transition && roundSpan) {
        roundSpan.textContent = roundNumber;
        transition.classList.remove('hidden');
        
        setTimeout(() => {
            transition.classList.add('hidden');
            document.getElementById('target-modal').classList.remove('hidden');
        }, 2000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

window.initGame = initGame;
window.startNewRound = startNewRound;