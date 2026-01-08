const baitsData = [
    {
        id: 1,
        name: "Worm",
        image: "assets/gear/worm.png"
    },
    {
        id: 2,
        name: "Fly",
        image: "assets/gear/fly.png"
    },
    {
        id: 3,
        name: "Lure",
        image: "assets/gear/lure.png"
    },
    {
        id: 4,
        name: "Shrimp",
        image: "assets/gear/shrimp.png"
    }
];

export function getBaitByCode(code) {
    return baitsData.find(bait => bait.name.toLowerCase() === code.toLowerCase());
}
export function getAllBaits() {
    return baitsData;
}

export function getBaitById(id) {
    return baitsData.find(bait => bait.id === id);
}

export default baitsData;