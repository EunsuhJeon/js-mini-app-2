// /js/modules/gameMain.js - VERSIÓN CORREGIDA
import { resetGame, loadRound, getGameState } from './gameState.js';
import { resetPlayerState } from './playerState.js';
import { updateGameUI } from './uiConnector.js';
import { renderCompendium, initCompendiumEvents } from './compendium.js';
import { renderCollection } from './collection.js';
import { initGame } from './modules/gameMain.js';

export function initGame() {
    console.log("Initializing game...");
    
    resetGame();
    resetPlayerState();
    
    loadRound(1);
    
    updateGameUI();
    renderCompendium();
    renderCollection();
    initCompendiumEvents();
    
    setupBasicEvents();
    
    console.log("Game ready!");
    console.log("Current state:", getGameState());
}

function setupBasicEvents() {
    document.getElementById('continue-button')?.addEventListener('click', () => {
        const state = getGameState();
        const nextRound = state.currentRound + 1;
        
        if (nextRound <= 9) { 
            loadRound(nextRound);
            showRoundTransition(nextRound);
            updateGameUI();
        } else {
            alert("You've completed all rounds! Game finished!");
        }
    });
    
    document.getElementById('list-button')?.addEventListener('click', () => {
        renderCollection();
        document.getElementById('collection-modal')?.classList.remove('hidden');
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
            document.getElementById('target-modal')?.classList.remove('hidden');
        }, 2000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

window.initGame = initGame;