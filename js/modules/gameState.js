import { getAllFish } from './fishData.js';
import { getCaughtFish } from './playerState.js';

const fishData = getAllFish();

// =================================
// INITIAL GAME STATES
// =================================
const gameState = {
    //------------------------------
    // Info about the current round
    currentRound: 1,
    currentFish: null,
    currentBait: null,
    currentDepth: null,

    //------------------------------
    // Phase state (What is happening right now)
    currentPhase: 'idle', // 'idle', 'casting', 'biting', 'reeling', 'typing', 'result'
    isCasting: false,
    isFishHooked: false,

    //------------------------------
    // Score and stats
    score: 0,
    phaseScore: 0,

    //------------------------------
    // Time management
    reelTime: 0,
    keyTime: 0,

    //------------------------------
    // Difficulty settings
    hookZoneSize: 30,
    hookZonePosition: 50,

    //------------------------------
    // Info for every round
    targetDepth: null, // Right depth to catch the current fish
    sequenceKeys: [], // Keys to type during the typing phase
    requiredClicks: 0 // Clicks required to reel in the fish
};

// =================================
// MAIN GAME FUNCTIONS
// =================================

// ------------------------------
// Initialize a new round
export function initializeRound() {
    console.log(`Initializing round ${gameState.currentRound}...`);

    // ------------------------------
    // Restart temporal states
    gameState.currentPhase = 'idle';
    gameState.isCasting = false;
    gameState.isFishHooked = false;
    gameState.currentBait = null;
    gameState.currentDepth = null;
    gameState.phaseScore = 0;
    gameState.reelTime = 0;
    gameState.keyTime = 0;

    // ------------------------------
    // Set difficulty based on the fish rarity
    if (gameState.currentFish) {
        const rarity = gameState.currentFish.rarity;
        gameState.hookZoneSize = rarity === 'common' ? 40 : rarity === 'rare' ? 30 : 20;
        gameState.requiredClicks = rarity === 'common' ? 10 : rarity === 'rare' ? 15 : 20;
    }

    return gameState;
}

// ------------------------------
// Select fish
export function selectRandomFish() {
    console.log('Selecting a random fish for the round...');

    // Get already caught fish
    const caughtFishIds = getCaughtFish();

    // Filter fish that have not been caught yet
    const availableFish = fishData.filter(fish => !caughtFishIds.includes(fish.id));

    let selectedFish;

    if (availableFish.length > 0) {
        // If there are available fish, select one randomly
        const randomIndex = Math.floor(Math.random() * availableFish.length);
        selectedFish = availableFish[randomIndex];
        console.log(`New fish: ${selectedFish.name} {ID: ${selectedFish.id}}`);
    } else {
        // If all fish have been caught, allow repeats
        const randomIndex = Math.floor(Math.random() * fishData.length);
        selectedFish = fishData[randomIndex];
        console.log(`All fish caught! Repeating fish: ${selectedFish.name} {ID: ${selectedFish.id}}`);
    }

    // Update game state
    gameState.currentFish = selectedFish;
    gameState.targetDepth = selectedFish.depth;

    generateKeySequence();

    return selectedFish;
}

// ------------------------------
// Run requiered functions for a new round
export function loadRound(roundNumber) {
    console.log(`Loading Round ${roundNumber}`);
    
    // Update current round
    gameState.currentRound = roundNumber;
    
    // Initialize round
    initializeRound();
    
    // Select a random fish
    selectRandomFish();
    
    console.log(`🎯 Target: ${gameState.currentFish.name} in ${gameState.currentFish.biome}`);
    console.log(`🎯 Correct depth: ${gameState.targetDepth}, bait: ${gameState.currentFish.bait}`);
    
    return gameState;
}

// ------------------------------
// Check bait
export function checkBait(selectedBait) {
    if (!gameState.currentFish) {
        console.error('No target fish selected!');
        return false;
    }

    const isCorrect = gameState.currentFish.bait === selectedBait.toLowerCase();
    gameState.currentBait = selectedBait;

    console.log(`Bait check: ${selectedBait} for ${gameState.currentFish.name} - ${isCorrect ? 'Correct' : 'Incorrect'}`);

    gameState.currentPhase = isCorrect ? 'baitSelected' : 'idle';

    return isCorrect;
}

// ------------------------------
// Check depth (Phase 1)
export function checkDepth(selectedDepth) {
    if (!gameState.currentFish) {
        console.error('No target fish selected!');
        return false;
    }

    const isCorrect = gameState.currentFish.depth.toLowerCase() === selectedDepth;
    gameState.currentDepth = selectedDepth;

    console.log(`Depth check: ${selectedDepth} vs correct: ${gameState.targetDepth} - ${isCorrect ? 'CORRECT' : 'WRONG'}`);

    if (isCorrect) {
        gameState.currentPhase = 'depthSelected';
        gameState.isFishHooked = true;
        
        // Calcular puntos parciales
        gameState.phaseScore += 100;
    } else {
        gameState.currentPhase = 'idle';
    }
    
    return isCorrect;
}

// 게임 전체 초기화 (새로고침/라운드 1용)
export function resetGame() {
    // 현재 라운드 상태 초기화
    gameState.currentRound = 1;
    gameState.currentFish = null;
    gameState.currentBait = null;
    gameState.currentDepth = null;
    gameState.currentPhase = "idle";
    gameState.isCasting = false;
    gameState.isFishHooked = false;
    gameState.phaseScore = 0;
    gameState.reelTime = 0;
    gameState.keyTime = 0;
    gameState.targetDepth = null;
    gameState.squenceKeys = [];
    gameState.score = 0;  // 총점도 초기화
  
    console.log("Game fully reset!");
    return gameState;
}

export function getCurrentFish() {
    return gameState.currentFish;
}

export function getCurrentRound() {
    return gameState.currentRound;
  }
