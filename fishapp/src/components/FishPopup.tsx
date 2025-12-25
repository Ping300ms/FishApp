import React from 'react'
import sprite0 from '../assets/fish/0.png'
import sprite1 from '../assets/fish/1.png'
import sprite2 from '../assets/fish/2.png'
import sprite3 from '../assets/fish/3.png'
import sprite4 from '../assets/fish/4.png'
import sprite5 from '../assets/fish/5.png'
import sprite6 from '../assets/fish/6.png'
import sprite7 from '../assets/fish/7.png'
import sprite8 from '../assets/fish/8.png'
import sprite9 from '../assets/fish/9.png'

type FishPopupProps = {
    size: number
    rarity: number
    model?: number
    isNew?: boolean      // nouveau poisson pour le joueur
    isRecord?: boolean   // plus gros poisson pour ce modèle
    onClose: (action: 'keep' | 'release' | 'stop') => void
}


export default function FishPopup({ size, rarity, model = 0, isNew, isRecord, onClose }: FishPopupProps) {
    const frames = [sprite0, sprite1, sprite2, sprite3, sprite4, sprite5, sprite6, sprite7, sprite8, sprite9]
    const src = frames[model % frames.length]

    return (
        <div style={styles.overlay}>
            <div style={styles.card}>
                <img src={src} alt={`Fish ${model}`} style={styles.image} />
                <div style={styles.info}>
                    <p><strong>Taille:</strong> {size} cm</p>
                    <p><strong>Rareté:</strong> {rarity}</p>
                    {isNew && <span style={styles.badge}>✨ Nouveau !</span>}
                    {isRecord && <span style={styles.badge}>🏆 Record !</span>}
                </div>

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
        top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 999
    },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: '1rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    image: { width: 200, height: 200, objectFit: 'contain', imageRendering: 'pixelated' },
    info: { textAlign: 'center', color: 'black', fontSize: 12 },
    badge: {
        display: 'block',
        marginTop: 4,
        fontSize: 12,
        color: '#facc15',
        fontWeight: 'bold'
    },
    actions: { display: 'flex', gap: '0.5rem', marginTop: '0.5rem' },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        color: '#fff',
        cursor: 'pointer',
        fontFamily: '"Press Start 2P", monospace', // typo pixel
        fontSize: 9,
    }
}