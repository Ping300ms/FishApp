// src/components/FishCard.tsx
import React from 'react'
import basicFish from '../assets/fish/basicFish/basicFish.gif'

type Props = {
    size: number
    rarity: number
    model?: string
}

export default function FishCard({ size, rarity, model = 'basicFish' }: Props) {

    const frames = [basicFish]
    const src = frames[0]

    return (
        <div style={styles.card}>
            <img src={src} alt={model} style={styles.image} />
            <div style={styles.info}>
                <p><strong>Taille:</strong> {size} cm</p>
                <p><strong>Rareté:</strong> {rarity}</p>
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        width: 100,
        margin: '10px',
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'contain'
    },
    info: {
        textAlign: 'center',
        color: 'black',
    }
}
