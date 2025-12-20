import { useFishing } from '../hooks/useFishing'
import background from '../assets/background/background.png'

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
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        width: '100%',
        height: '100%',
    },
    actions: {
    },
    button: {
    }
}

