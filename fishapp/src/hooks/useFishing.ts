import { useState, useRef, useCallback, useEffect } from 'react'
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
    const [message, setMessage] = useState('Cliquez pour pêcher')
    const [attempts, setAttempts] = useState(0)
    const [saving, setSaving] = useState(false)

    const biteTimeRef = useRef<number>(0)
    const hasBiteRef = useRef(false)
    const biteWindowRef = useRef<number | null>(null)
    const fishingTimeoutRef = useRef<number | null>(null)
    const fishLockedRef = useRef(false) // bloque disparition si popup ouvert

    const generateFish = useCallback((attempt: number): Fish => {
        const size = Math.round(Math.random() * 20 + 10 + attempt * 5)
        const rarity = Math.min(1 + attempt, 5)
        const modelId = Math.floor(Math.random() * 2)
        return { id: Date.now(), size, rarity, modelId }
    }, [])

    const resetFishing = useCallback(() => {
        if (fishingTimeoutRef.current) clearTimeout(fishingTimeoutRef.current)
        if (biteWindowRef.current) clearTimeout(biteWindowRef.current)

        fishingTimeoutRef.current = null
        biteWindowRef.current = null
        fishLockedRef.current = false
        hasBiteRef.current = false

        setIsFishing(false)
        setFishOnLine(null)
        setMessage('Cliquez pour pêcher')
    }, [])


    const startFishing = useCallback(() => {
        if (isFishing || saving) return

        setIsFishing(true)
        setMessage('En attente du poisson...')
        hasBiteRef.current = false

        const fishingTime = Math.random() * 10000 + 1000

        fishingTimeoutRef.current = window.setTimeout(() => {
            const fish = generateFish(attempts)
            setFishOnLine(fish)
            setMessage('❗')
            biteTimeRef.current = Date.now()
            hasBiteRef.current = true

            const minWindow = 200
            const maxWindow = 1000
            const maxAttempts = 5

            const windowTime = Math.max(
                minWindow,
                maxWindow - ((maxWindow - minWindow) / maxAttempts) * attempts
            )

            biteWindowRef.current = window.setTimeout(() => {
                if (fishLockedRef.current) return

                setFishOnLine(null)
                setMessage("Le poisson s'est échappé...")
                setAttempts(0)
                setIsFishing(false)
                hasBiteRef.current = false
            }, windowTime)
        }, fishingTime)
    }, [isFishing, saving, attempts, generateFish])


    const cancelBeforeBite = useCallback(() => {
        if (!isFishing || hasBiteRef.current) return

        if (fishingTimeoutRef.current) {
            clearTimeout(fishingTimeoutRef.current)
            fishingTimeoutRef.current = null
        }

        setIsFishing(false)
        setMessage('Pêche annulée')
    }, [isFishing])



    const handleKeep = useCallback(async () => {
        if (!fishOnLine || !user) return
        setSaving(true)
        setMessage('Enregistrement du poisson...')

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
            setMessage('Erreur lors de l’enregistrement')
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
        setMessage('Poisson relâché, cliquez pour relancer...')
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
        setMessage('Pêche arrêtée.')
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
        message,
        saving,
        startFishing,
        handleKeep,
        handleRelease,
        handleStop,
        resetFishing,
        fishLockedRef,
        cancelBeforeBite
    }
}
