import poissonNoir from '../assets/fish/poisson_noir.png'
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

type Props = {
    model: number
    size?: number
    rarity?: number
    discovered: boolean
}

export default function FishCard({ model, size, rarity, discovered }: Props) {
    const frames = [sprite0, sprite1, sprite2, sprite3, sprite4, sprite5, sprite6, sprite7, sprite8, sprite9]
    const src = frames[model % frames.length]

    return (
        <div
            style={{
                ...styles.card,
                opacity: discovered ? 1 : 0.35
            }}
        >
            <img
                src={discovered ? src : poissonNoir}
                alt={discovered ? `Fish ${model}` : 'Poisson inconnu'}
                style={{
                    ...styles.image,
                    filter: discovered ? 'none' : 'grayscale(100%)'
                }}
            />

            <div style={styles.info}>
                {discovered ? (
                    <>
                        <p><strong>Taille:</strong> {size} cm</p>
                        <p><strong>Rareté:</strong> {rarity}</p>
                    </>
                ) : (
                    <p style={styles.unknown}>Poisson non découvert</p>
                )}
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
    },
    image: {
        width: 80,
        height: 80,
        objectFit: 'contain',
        imageRendering: 'pixelated',
    },
    info: {
        textAlign: 'center',
        color: 'black',
        fontSize: 10,
    },
    unknown: {
        fontStyle: 'italic',
        color: '#555'
    }
}
