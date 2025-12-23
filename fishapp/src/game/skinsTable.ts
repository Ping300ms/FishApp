// src/game/fisherSkins.ts

import marie0 from '../assets/characters/marie/marie_0.png'
import marie1 from '../assets/characters/marie/marie_1.png'
import sandrine0 from '../assets/characters/sandrine/sandrine_1.png'
import sandrine1 from '../assets/characters/sandrine/sandrine_0.png'
import thierry0 from '../assets/characters/thierry/thierry_1.png'
import thierry1 from '../assets/characters/thierry/thierry_0.png'



export type FisherSkinId = 'marie' | 'sandrine' | 'thierry'

export const FISHER_SKINS: Record<
    FisherSkinId,
    { idle: string; fishing: string }
> = {
    marie: {
        idle: marie0,
        fishing: marie1
    },
    sandrine: {
        idle: sandrine0,
        fishing: sandrine1
    },
    thierry: {
        idle: thierry0,
        fishing: thierry1
    }
}


export function getUserSkin(userId: string): FisherSkinId {
    if (userId === "a5128cbc-0c61-4dbb-b56f-5f43e18c32b1") {
        return "sandrine"
    }
    else if (userId === "99a50426-02cf-43f2-a45d-2e0c022f2d77") {
        return "thierry"
    }
    else
        return "marie"
}
