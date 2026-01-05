const biomesData = [
    {
        id: 1,
        name: "River",
        code: "river"
    },
    {
        id: 2,
        name: "Lake",
        code: "lake"
    },
    {
        id: 3,
        name: "Sea",
        code: "sea"
    }
];



export function getBiomeByCode(code) {
    return biomesData.find(biome => biome.code === code);
}

export function getAllBiomes() {
    return biomesData;
}

export function getBiomeById(id) {
    return biomesData.find(biome => biome.id === id);
}
