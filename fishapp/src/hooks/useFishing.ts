import { useState, useRef, useCallback, useEffect } from 'react'
import { fishingService, type CatchPayload } from '../services/fishing.service'
import { useAuth } from '../contexts/AuthContext'
import {FISH_TABLE, CAPTURE_WINDOW_BY_RARITY, TARGET_WEIGHT_BY_RARITY} from "../game/fishTable.ts";

export type Fish = {
    id: number
    size: number
    rarity: number
    modelId: number
}

export function useFishing() {
    const { user } = useAuth()
    const [isFishing, setIsFishing] = useState(false)
    const [fishOnLine, setFishOnLine] = useState<Fish | null>(null)
    const [attempts, setAttempts] = useState(0)
    const [saving, setSaving] = useState(false)

    const biteTimeRef = useRef<number>(0)
    const hasBiteRef = useRef(false)
    const biteWindowRef = useRef<number | null>(null)
    const fishingTimeoutRef = useRef<number | null>(null)
    const fishLockedRef = useRef(false) // bloque disparition si popup ouvert

    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t
    }

    function pickFishByLevel(level: number) {
        const progress = Math.min(level / 20, 1) // niveau 20 = cap

        const weightedPool = FISH_TABLE.map(fish => {
            const target = TARGET_WEIGHT_BY_RARITY[fish.rarity]
            const weight = lerp(fish.baseWeight, target, progress)

            return { fish, weight }
        })

        const total = weightedPool.reduce((s, f) => s + f.weight, 0)
        let roll = Math.random() * total

        for (const entry of weightedPool) {
            roll -= entry.weight
            if (roll <= 0) return entry.fish
        }

        return weightedPool[0].fish
    }


    const resetFishing = useCallback(() => {
        if (fishingTimeoutRef.current) clearTimeout(fishingTimeoutRef.current)
        if (biteWindowRef.current) clearTimeout(biteWindowRef.current)

        fishingTimeoutRef.current = null
        biteWindowRef.current = null
        fishLockedRef.current = false
        hasBiteRef.current = false

        setIsFishing(false)
        setFishOnLine(null)
    }, [])


    const startFishing = useCallback(() => {
        if (isFishing || saving) return

        setIsFishing(true)
        hasBiteRef.current = false

        const fishDef = pickFishByLevel(attempts)

        const biteDelay =
            Math.random() * 10000 + 1000

        fishingTimeoutRef.current = window.setTimeout(() => {
            const fish: Fish = {
                id: Date.now(),
                modelId: fishDef.modelId,
                rarity: fishDef.rarity,
                size: Math.round(Math.random() * 20 + 10 + attempts * 3)
            }

            setFishOnLine(fish)
            biteTimeRef.current = Date.now()
            hasBiteRef.current = true

            const windowTime = CAPTURE_WINDOW_BY_RARITY[fishDef.rarity]

            biteWindowRef.current = window.setTimeout(() => {
                if (fishLockedRef.current) return

                setFishOnLine(null)
                setAttempts(0)
                setIsFishing(false)
                hasBiteRef.current = false
            }, windowTime)
        }, biteDelay)
    }, [isFishing, saving, attempts])



    const cancelBeforeBite = useCallback(() => {
        if (!isFishing || hasBiteRef.current) return

        if (fishingTimeoutRef.current) {
            clearTimeout(fishingTimeoutRef.current)
            fishingTimeoutRef.current = null
        }

        setIsFishing(false)
    }, [isFishing])



    const handleKeep = useCallback(async () => {
        if (!fishOnLine || !user) return
        setSaving(true)

        const payload: CatchPayload = {
            model_id: fishOnLine.modelId,
            size: fishOnLine.size,
            rarity: String(fishOnLine.rarity)
        }

        try {
            const { error } = await fishingService.catchFish(user.id, payload)
            if (error) throw error
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
            resetFishing()
        }
    }, [fishOnLine, user, resetFishing])

    const handleRelease = useCallback(() => {
        if (!fishOnLine) return

        if (biteWindowRef.current !== null) {
            clearTimeout(biteWindowRef.current)
            biteWindowRef.current = null
        }

        // relâché = niveau augmente
        setAttempts(prev => prev + 1)
        setFishOnLine(null)
        setIsFishing(false)
    }, [fishOnLine])

    const handleStop = useCallback(() => {
        // Arrêter = abandon poisson, reset état mais pas le niveau
        if (biteWindowRef.current !== null) {
            clearTimeout(biteWindowRef.current)
            biteWindowRef.current = null
        }
        setFishOnLine(null)
        setIsFishing(false)
    }, [])

    useEffect(() => {
        return () => {
            if (fishingTimeoutRef.current !== null) clearTimeout(fishingTimeoutRef.current)
            if (biteWindowRef.current !== null) clearTimeout(biteWindowRef.current)
        }
    }, [])

    return {
        isFishing,
        fishOnLine,
        saving,
        startFishing,
        handleKeep,
        handleRelease,
        handleStop,
        resetFishing,
        fishLockedRef,
        cancelBeforeBite,
        attempts
    }
}
