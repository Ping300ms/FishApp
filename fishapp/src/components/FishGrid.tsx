import React, { useEffect, useState } from 'react'
import FishCard from './FishCard'
import { fishingService, type CatchPayload } from '../services/fishing.service'
import { FISH_TABLE } from '../game/fishTable'

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
            if (!error && data) setCatches(data)
            setLoading(false)
        }
        loadCatches()
    }, [userId])

    if (loading) return <p>Chargement des poissons...</p>

    // Map: modelId -> record perso
    const catchesByModel = new Map(
        catches.map(c => [c.model_id, c])
    )

    return (
        <div style={styles.grid}>
            {FISH_TABLE.map(fishDef => {
                const record = catchesByModel.get(fishDef.modelId)

                return (
                    <FishCard
                        key={fishDef.modelId}
                        model={fishDef.modelId}
                        discovered={!!record}
                        size={record?.size}
                        rarity={record ? parseInt(record.rarity) : fishDef.rarity}
                    />
                )
            })}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px',
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        justifyItems: 'center'
    }
}
