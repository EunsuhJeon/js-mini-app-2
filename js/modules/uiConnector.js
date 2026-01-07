// /js/modules/uiConnector.js
import { getGameState, loadRound } from './gameState.js';
import { renderCompendium } from './compendium.js';
import { renderCollection } from './collection.js';

export function updateGameUI() {
    const state = getGameState();
    
    const biomeElement = document.getElementById('header-biome');
    const targetElement = document.getElementById('header-target');
    
    if (biomeElement && state.currentFish) {
        biomeElement.textContent = state.currentFish.biome.toUpperCase();
    }
    
    if (targetElement && state.currentFish) {
        targetElement.textContent = state.currentFish.name.toUpperCase();
    }
    
    const targetModal = document.getElementById('target-modal');
    if (targetModal && state.currentFish) {
        const fishName = document.getElementById('overlay-fish-name');
        const fishImage = document.querySelector('.target-fish-image');
        
        if (fishName) fishName.textContent = state.currentFish.name.toUpperCase();
        if (fishImage) {
            fishImage.src = state.currentFish.image;
            fishImage.alt = state.currentFish.name;
        }
    }
}

export function startNewRound(roundNumber) {
    loadRound(roundNumber);
    updateGameUI();
    renderCompendium();
    renderCollection();
}