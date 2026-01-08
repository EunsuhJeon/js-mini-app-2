// /js/modules/collection.js
/* import { getAllFish } from './fishData.js';
import { getCaughtFish } from './playerState.js';

export function renderCollection() {
    const grid = document.getElementById('fishGrid');
    if (!grid) return;
    
    const allFish = getAllFish();
    const caughtFishIds = getCaughtFish();
    
    grid.innerHTML = '';
    
    allFish.forEach(fish => {
        const isCaught = caughtFishIds.includes(fish.id);
        const slot = document.createElement('div');
        slot.className = `fish-slot ${isCaught ? 'unlocked' : 'locked'}`;
        
        slot.innerHTML = `
            <div class="fish-icon-wrapper">
                <img src="${fish.image}" alt="${fish.name}">
            </div>
            <div class="fish-name">${isCaught ? fish.name : '???'}</div>
            <div class="fish-biome">${isCaught ? fish.biome.toUpperCase() : '???'}</div>
        `;
        
        grid.appendChild(slot);
    });
}*/