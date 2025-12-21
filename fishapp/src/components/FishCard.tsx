// src/components/FishCard.tsx
import React, {useEffect} from 'react'
import basicFish from '../assets/fish/basicFish/basicFish.gif'
import pink from '../assets/fish/pink/pink.gif'

type Props = {
    size: number
    rarity: number
    model: number
}

export default function FishCard({ size, rarity, model }: Props) {

    useEffect(() => {
        console.info(model)
    }, []);

    const frames = [basicFish, pink]
    const src = frames[model % frames.length]

    return (
        <div style={styles.card}>
            <img src={src} alt={model?.toString()} style={styles.image} />
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
