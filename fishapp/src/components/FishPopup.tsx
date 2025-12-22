import React from 'react'
import basicFish from '../assets/fish/basicFish/basicFish.gif'
import pink from '../assets/fish/Pink/Pink.gif'

type Props = {
    size: number
    rarity: number
    model?: number
    onClose: (action: 'keep' | 'release' | 'stop') => void
}

export default function FishPopup({ size, rarity, model = 0, onClose }: Props) {
    const frames = [basicFish, pink]
    const src = frames[model % frames.length]

    return (
        <div style={styles.overlay}>
            <div style={styles.card}>
                <img src={src} alt={`Fish ${model}`} style={styles.image} />
                <p><strong>Taille:</strong> {size} cm</p>
                <p><strong>Rareté:</strong> {rarity}</p>

                <div style={styles.actions}>
                    <button style={styles.button} onClick={() => onClose('keep')}>Garder</button>
                    <button style={styles.button} onClick={() => onClose('release')}>Relâcher</button>
                    <button style={styles.button} onClick={() => onClose('stop')}>Arrêter</button>
                </div>
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
    actions: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '0.5rem'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        fontFamily: '"Press Start 2P", monospace',
        color: '#fff',
        cursor: 'pointer'
    }
}
