// src/hooks/useFishing.ts
import { useState, useRef, useEffect, useCallback } from 'react'
import { fishingService, type CatchPayload } from '../services/fishing.service'
import { useAuth } from '../contexts/AuthContext'

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
    const [message, setMessage] = useState('Cliquez pour pêcher 🎣')
    const [attempts, setAttempts] = useState(0)
    const [nothingCaught, setNothingCaught] = useState(false)
    const [saving, setSaving] = useState(false)

    const timerRef = useRef<number | null>(null)

    const generateFish = useCallback((attempt: number): Fish | null => {
        const baseFailChance = 0.1
        const failChance = Math.min(baseFailChance + attempt * 0.1, 0.8)
        if (Math.random() < failChance) return null

        const size = Math.round(Math.random() * 20 + 10 + attempt * 5)
        const rarity = Math.min(1 + attempt, 5)
        const modelId = Math.floor(Math.random()* 2)

        return { id: Date.now(), size, rarity, modelId }
    }, [])

    const resetFishing = useCallback(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        setFishOnLine(null)
        setIsFishing(false)
        setAttempts(0)
        setNothingCaught(false)
        setMessage('Cliquez pour pêcher 🎣')
    }, [])

    const startFishing = useCallback(() => {
        if (isFishing || saving) return
        setIsFishing(true)
        setMessage('En attente du poisson... 🐟')
        setNothingCaught(false)

        const fishingTime = Math.random() * 2000 + 1000
        timerRef.current = window.setTimeout(() => {
            const result = generateFish(attempts)
            if (result) {
                setFishOnLine(result)
                setMessage('Un poisson mord à l’hameçon ! Clique pour relever ❗')
            } else {
                setNothingCaught(true)
                setMessage('Rien n’a mordu 😢 Clique pour recommencer.')
                setIsFishing(false)
            }
        }, fishingTime)
    }, [isFishing, saving, attempts, generateFish])

    const reelInFish = useCallback(() => {
        if (!fishOnLine) return
        setMessage('Vous avez attrapé un poisson ! 🐟')
        setIsFishing(false)
    }, [fishOnLine])

    const handleKeep = useCallback(async () => {
        if (!fishOnLine || !user) return
        setSaving(true)
        setMessage(`Enregistrement du poisson... 🐟`)

        const payload: CatchPayload = {
            model_id: fishOnLine.modelId,
            size: fishOnLine.size,
            rarity: String(fishOnLine.rarity)
        }

        try {
            const { error } = await fishingService.catchFish(user.id, payload)
            if (error) throw error
            setMessage(`Poisson gardé : ${fishOnLine.size}cm (rare ${fishOnLine.rarity})`)
        } catch (err) {
            console.error(err)
            setMessage('Erreur lors de l’enregistrement 😢')
        } finally {
            setSaving(false)
            resetFishing()
        }
    }, [fishOnLine, user, resetFishing])

    const handleRelease = useCallback(() => {
        if (!fishOnLine) return
        setAttempts(prev => prev + 1)
        setMessage('Relâché et nouveau lancer...')
        setFishOnLine(null)
        setIsFishing(false)
        startFishing()
    }, [fishOnLine, startFishing])

    // Nettoyage timer
    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    return {
        isFishing,
        fishOnLine,
        message,
        nothingCaught,
        saving,
        startFishing,
        reelInFish,
        handleKeep,
        handleRelease,
        resetFishing
    }
}
