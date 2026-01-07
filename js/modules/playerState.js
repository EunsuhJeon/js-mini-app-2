let caughtFishIds = [];

export function addCaughtFish(fishId) {
    if (!caughtFishIds.includes(fishId)) {
        caughtFishIds.push(fishId);
        console.log(`Fish ${fishId} added to collection`);
        return true;
    }
    return false;
}

export function getCaughtFish() {
    return [...caughtFishIds]; 
}

export function isFishCaught(fishId) {
    return caughtFishIds.includes(fishId);
}

export function getPlayerProgress(fishData) {
    const total = fishData.length;
    const caught = caughtFishIds.length;
    return {
        caught,
        total,
        percentage: Math.round((caught / total) * 100)
    };
}

export function resetPlayerState() {
    caughtFishIds = [];
    console.log("Player collection reset");
}