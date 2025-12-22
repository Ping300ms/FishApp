// src/components/FishCard.tsx
import React, {useEffect} from 'react'
import sprite0 from '../assets/fish/0.png'
import sprite1 from '../assets/fish/1.png'
import sprite2 from '../assets/fish/2.png'
import sprite3 from '../assets/fish/3.png'
import sprite4 from '../assets/fish/4.png'
import sprite5 from '../assets/fish/5.png'
import sprite6 from '../assets/fish/6.png'
import sprite7 from '../assets/fish/7.png'
import sprite8 from '../assets/fish/8.png'

type Props = {
    size: number
    rarity: number
    model: number
}

export default function FishCard({ size, rarity, model }: Props) {

    useEffect(() => {
        console.info(model)
    }, []);

    const frames = [sprite0, sprite1, sprite2, sprite3, sprite4, sprite5, sprite6, sprite7, sprite8]
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
        objectFit: 'contain',
        imageRendering: 'pixelated',
    },
    info: {
        textAlign: 'center',
        color: 'black',
        fontSize: 10,
    }
}
