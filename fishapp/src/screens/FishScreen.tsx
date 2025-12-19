import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { fishingService, type CatchPayload } from '../services/fishing.service'

type Fish = {
    id: number
    size: number
    rarity: number
    modelId: number
}

export default function FishingScreen() {
    const { user } = useAuth()
    const [isFishing, setIsFishing] = useState(false)
    const [fishOnLine, setFishOnLine] = useState<Fish | null>(null)
    const [message, setMessage] = useState('Cliquez pour pêcher 🎣')
    const [attempts, setAttempts] = useState(0)
    const [nothingCaught, setNothingCaught] = useState(false)
    const [saving, setSaving] = useState(false)

    const timerRef = useRef<number | null>(null)

    const startFishing = () => {
        if (isFishing) return
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
    }

    const reelInFish = () => {
        if (!fishOnLine) return
        setMessage('Vous avez attrapé un poisson ! 🐟')
        setIsFishing(false)
    }

    const handleKeep = async () => {
        if (!fishOnLine || !user) return

        setSaving(true)
        setMessage(`Enregistrement du poisson... 🐟`)

        const payload: CatchPayload = {
            modelId: fishOnLine.modelId,
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
    }

    const handleRelease = () => {
        if (!fishOnLine) return
        setAttempts(prev => prev + 1)
        setMessage('Relâché et nouveau lancer...')
        setFishOnLine(null)
        setIsFishing(false)
        startFishing()
    }

    const resetFishing = () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        setFishOnLine(null)
        setIsFishing(false)
        setAttempts(0)
        setNothingCaught(false)
        setMessage('Cliquez pour pêcher 🎣')
    }

    const generateFish = (attempt: number): Fish | null => {
        const baseFailChance = 0.1
        const failChance = Math.min(baseFailChance + attempt * 0.1, 0.8)
        if (Math.random() < failChance) return null

        const size = Math.round(Math.random() * 20 + 10 + attempt * 5)
        const rarity = Math.min(1 + attempt, 5)
        const modelId = Math.floor(Math.random() * 20) + 1 // identifiant aléatoire du poisson

        return { id: Date.now(), size, rarity, modelId }
    }

    // Nettoyage au démontage
    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    return (
        <div style={styles.container} onClick={() => !fishOnLine && !saving && startFishing()}>
            <h2>🎣 Écran de pêche</h2>
            <p>{message}</p>

            {fishOnLine && (
                <div style={styles.actions}>
                    <button onClick={reelInFish} style={styles.button}>Relever la ligne</button>
                    <button onClick={handleKeep} style={styles.button} disabled={saving}>Garder</button>
                    <button onClick={handleRelease} style={styles.button} disabled={saving}>Relâcher</button>
                </div>
            )}

            {nothingCaught && (
                <button onClick={resetFishing} style={styles.button}>Réessayer</button>
            )}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        textAlign: 'center',
        background: '#0ea5e9',
        color: '#fff'
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: 'none',
        background: '#fff',
        color: '#0ea5e9',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}
