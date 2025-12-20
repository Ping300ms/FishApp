// src/screens/FishingScreen.tsx
import { useFishing } from '../hooks/useFishing'

export default function FishingScreen() {
    const {
        fishOnLine,
        message,
        nothingCaught,
        saving,
        startFishing,
        reelInFish,
        handleKeep,
        handleRelease,
        resetFishing
    } = useFishing()

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
