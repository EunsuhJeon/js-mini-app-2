import fishData from './fish.js';
import { getCaughtFish } from './playerState.js';

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
    squenceKeys: [], // Keys to type during the typing phase
    requieredClicks: 0 // Clicks required to reel in the fish
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
        gameState.requieredClicks = rarity === 'common' ? 10 : rarity === 'rare' ? 15 : 20;
    }

    return gameState;
}