import { getAllFish, getFishByBiome } from './fishData.js';
import { getCaughtFish } from './playerState.js';

export function renderCompendium() {
    console.log("📚 Rendering compendium...");
    
    const fishListContainer = document.getElementById('fishList');
    const categoryTitle = document.getElementById('categoryTitle');
    
    if (!fishListContainer || !categoryTitle) {
        console.error("Compendium elements not found!");
        return;
    }
    
    showCategory('river');
}

export function showCategory(biome) {
    console.log(`Showing category: ${biome}`);
    
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === biome) {
            btn.classList.add('active');
        }
    });
    
    const categoryTitle = document.getElementById('categoryTitle');
    if (categoryTitle) {
        const biomeNames = {
            'river': 'RIVER FISH',
            'lake': 'LAKE FISH', 
            'sea': 'SEA FISH'
        };
        categoryTitle.textContent = biomeNames[biome] || biome.toUpperCase() + ' FISH';
    }
    
    const fishInBiome = getFishByBiome(biome);
    const caughtFishIds = getCaughtFish();
    
    renderFishList(fishInBiome, caughtFishIds);
}

function renderFishList(fishArray, caughtIds) {
    const container = document.getElementById('fishList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (fishArray.length === 0) {
        container.innerHTML = '<p>No fish found in this biome.</p>';
        return;
    }
    
    fishArray.forEach(fish => {
        const isCaught = caughtIds.includes(fish.id);
        const card = createFishCard(fish, isCaught);
        container.appendChild(card);
    });
}

function createFishCard(fish, isCaught) {
    const card = document.createElement('div');
    card.className = 'fish-card';
    
    const depthMap = {
        'shallow': 'S',
        'medium': 'M', 
        'deep': 'P'
    };
    
    card.innerHTML = `
        <div class="fish-img-box">
            <img src="../${fish.image}" alt="${fish.name}" style="${!isCaught ? 'filter: brightness(0) opacity(0.5);' : ''}">
        </div>
        <div class="fish-details">
            <strong>${isCaught ? fish.name : '???'}</strong>
            ${isCaught ? `
                DEPTH: ${depthMap[fish.depth] || fish.depth}<br>
                BAIT: ${fish.bait.toUpperCase()}<br>
                RARITY: ${fish.rarity.toUpperCase()}
            ` : 'NOT DISCOVERED YET'}
        </div>
    `;
    
    return card;
}

export function initCompendiumEvents() {
    console.log("Initializing compendium events...");
    
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const biome = btn.innerText.toLowerCase();
            showCategory(biome);
        });
    });
    
    window.showCategory = showCategory;
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initCompendiumEvents();
        renderCompendium();
    });
}