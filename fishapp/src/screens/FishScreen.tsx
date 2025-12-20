import { useFishing } from '../hooks/useFishing'
import background from '../assets/background/background.png'
import FisherCharacter from "../components/FisherCharacter.tsx";

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
        resetFishing,
        isFishing
    } = useFishing()

    return (
        <div style={styles.container} onClick={() => !fishOnLine && !saving && startFishing()}>
            <FisherCharacter character="marie" isFishing={isFishing} />

            <p>{message}</p>

            {fishOnLine && (
                <div style={styles.actions}>
                    <button onClick={reelInFish}>Relever la ligne</button>
                    <button onClick={handleKeep} disabled={saving}>Garder</button>
                    <button onClick={handleRelease} disabled={saving}>Relâcher</button>
                </div>
            )}

            {nothingCaught && (
                <button onClick={resetFishing}>Réessayer</button>
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

