import fishData from './fish.js';
import { getCaughtFish } from './playerState.js';

// Initial game state
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
    requieredClicks: 0, // Clicks required to reel in the fish
};

