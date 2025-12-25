// src/game/fisherSkins.ts

import marie0 from '../assets/characters/marie/marie_0.png'
import marie1 from '../assets/characters/marie/marie_1.png'
import sandrine0 from '../assets/characters/sandrine/sandrine_0.png'
import sandrine1 from '../assets/characters/sandrine/sandrine_1.png'
import thierry0 from '../assets/characters/thierry/thierry_0.png'
import thierry1 from '../assets/characters/thierry/thierry_1.png'
import ghislaine0 from '../assets/characters/ghislaine/ghislaine_0.png'
import ghislaine1 from '../assets/characters/ghislaine/ghislaine_1.png'
import stephane0 from '../assets/characters/stephane/stephane_0.png'
import stephane1 from '../assets/characters/stephane/stephane_1.png'
import jean0 from '../assets/characters/jean/jean_0.gif'
import jean1 from '../assets/characters/jean/jean_1.png'



export type FisherSkinId = 'marie' | 'sandrine' | 'thierry' | 'ghislaine' | 'stephane' | 'jean'

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
    },
    ghislaine: {
        idle: ghislaine0,
        fishing: ghislaine1
    },
    stephane: {
        idle: stephane0,
        fishing: stephane1
    },
    jean: {
        idle: jean0,
        fishing: jean1
    }
}


export function getUserSkin(userId: string): FisherSkinId {
    if (userId === "a5128cbc-0c61-4dbb-b56f-5f43e18c32b1") {
        return "sandrine"
    }
    else if (userId === "99a50426-02cf-43f2-a45d-2e0c022f2d77") {
        return "thierry"
    }
    else if (userId === "321d55b3-de50-48e1-a296-c41f54ddf381")
    {
        return "ghislaine"
    }
    else if (userId === "6d472cb0-f8f8-48db-acbb-dd3a84eec4e5")
    {
        return "stephane"
    }
    else if (userId === "0035bef1-d8a7-4d00-89f6-a02754b34e7f")
    {
        return "jean"
    }
    else
        return "marie"
}
