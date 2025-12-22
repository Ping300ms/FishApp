export type FishDefinition = {
    id: number
    modelId: number
    rarity: 1 | 2 | 3 | 4 | 5
    baseWeight: number
}

export const FISH_TABLE: FishDefinition[] = [
    { id: 1, modelId: 0, rarity: 1, baseWeight: 100},
    { id: 2, modelId: 1, rarity: 1, baseWeight: 100},

    { id: 3, modelId: 2, rarity: 2, baseWeight: 25},
    { id: 4, modelId: 3, rarity: 2, baseWeight: 25},

    { id: 5, modelId: 4, rarity: 3, baseWeight: 10},
    { id: 6, modelId: 5, rarity: 3, baseWeight: 10},

    { id: 7, modelId: 6, rarity: 4, baseWeight: 3},
    { id: 8, modelId: 7, rarity: 4, baseWeight: 3},

    { id: 9, modelId: 8, rarity: 5, baseWeight: 1},
    // … jusqu’à 15 poissons
]

export const CAPTURE_WINDOW_BY_RARITY: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 1200, // commun → facile
    2: 1000,
    3: 800,
    4: 600,
    5: 400   // légendaire → très tendu mais faisable
}


export const TARGET_WEIGHT_BY_RARITY: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 30,
    2: 25,
    3: 20,
    4: 15,
    5: 10
}