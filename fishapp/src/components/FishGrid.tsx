// src/components/FishGrid.tsx
import React, { useEffect, useState } from 'react'
import FishCard from './FishCard'
import { fishingService, type CatchPayload } from '../services/fishing.service'

type Props = {
    userId: string
}

export default function FishGrid({ userId }: Props) {
    const [catches, setCatches] = useState<CatchPayload[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadCatches = async () => {
            setLoading(true)
            const { data, error } = await fishingService.getBiggestFishes(userId)

            if (error) {
                console.error(error)
            } else if (data) {
                setCatches(data)
            }
            setLoading(false)
        }
        loadCatches()
    }, [userId])

    useEffect(() => {
        console.log(catches)
    }, [catches]);

    if (loading) return <p>Chargement des poissons...</p>
    if (catches.length === 0) return <p>Aucun poisson capturé pour l'instant.</p>

    return (
        <div style={styles.grid}>
            {catches.map(fish => {
                console.log(fish)
                return  (
                    <FishCard
                        key={fish.model_id + fish.size + fish.rarity}
                        size={fish.size}
                        rarity={parseInt(fish.rarity)}
                        model={fish.model_id}
                    />
                )
            })}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    grid: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        width: '100%',

    }
}
