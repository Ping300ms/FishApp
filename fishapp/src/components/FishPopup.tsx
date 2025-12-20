import React from 'react'
import basicFish from '../assets/fish/basicFish/basicFish.gif'


type Props = {
    size: number
    rarity: number
    model?: string
    onClose?: () => void
}

export default function FishPopup({ size, rarity, model = 'basicFish', onClose }: Props) {

    const frames = [basicFish]
    const src = frames[0]

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.card} onClick={e => e.stopPropagation()}>
                <img src={src} alt={model} style={styles.image} />
                <p><strong>Taille:</strong> {size} cm</p>
                <p><strong>Rareté:</strong> {rarity}</p>
                {onClose && (
                    <button onClick={onClose} style={styles.button}>Fermer</button>
                )}
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    card: {
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 12,
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    },
    image: {
        width: 200,
        height: 200,
        objectFit: 'contain'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        color: '#fff',
        cursor: 'pointer'
    }
}
