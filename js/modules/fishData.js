const fishData = [
    // RIVER FISH (2-3 peces)
    {
        id: 1,
        name: "Trout",
        biome: "river",
        depth: "medium",  // S=shallow, M=medium, P=deep
        bait: "fly",
        rarity: "common",  // common, rare, epic
        image: "assets/fish/trout.png",
        description: "A common river fish that prefers medium depth."
    },
    {
        id: 2,
        name: "Carp",
        biome: "river",
        depth: "shallow",
        bait: "worm",
        rarity: "common",
        image: "assets/fish/carp.png",
        description: "Found in shallow waters, loves worms."
    },
    {
        id: 3,
        name: "Catfish",
        biome: "river",
        depth: "deep",
        bait: "shrimp",
        rarity: "rare",
        image: "assets/fish/catfish.png",
        description: "A nocturnal predator of the deep river."
    },
    
    // LAKE FISH (2-3 peces)
    {
        id: 4,
        name: "Perch",
        biome: "lake",
        depth: "shallow",
        bait: "worm",
        rarity: "common",
        image: "assets/fish/perch.png",
        description: "Small but aggressive lake fish."
    },
    {
        id: 5,
        name: "Pike",
        biome: "lake",
        depth: "medium",
        bait: "lure",
        rarity: "rare",
        image: "assets/fish/pike.png",
        description: "Apex predator of the lake."
    },
    {
        id: 6,
        name: "Bass",
        biome: "lake",
        depth: "deep",
        bait: "lure",
        rarity: "epic",
        image: "assets/fish/bass.png",
        description: "Legendary bass from the deepest parts."
    },
    
    // SEA FISH (2-3 peces)
    {
        id: 7,
        name: "Tuna",
        biome: "sea",
        depth: "deep",
        bait: "shrimp",
        rarity: "rare",
        image: "assets/fish/tuna.png",
        description: "Fast swimmer of the open sea."
    },
    {
        id: 8,
        name: "Squid",
        biome: "sea",
        depth: "medium",
        bait: "shrimp",
        rarity: "common",
        image: "assets/fish/squid.png",
        description: "Uses ink to escape predators."
    },
    {
        id: 9,
        name: "Pufferfish",
        biome: "sea",
        depth: "shallow",
        bait: "worm",
        rarity: "epic",
        image: "assets/fish/puffer.png",
        description: "Inflates when threatened."
    }
];

// Get a fish by its biome
export function getFishByBiome(biome) {
    return fishData.filter(fish => fish.biome === biome);
}

// Get a fish by its ID
export function getFishById(id) {
    return fishData.find(fish => fish.id === id);
}

// Get all fish
export function getAllFish() {
    return fishData;
}