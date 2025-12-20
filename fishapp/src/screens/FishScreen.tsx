import { useFishing } from '../hooks/useFishing'
import background from '../assets/background/background.png'
import FisherCharacter from "../components/FisherCharacter.tsx";
import {useState} from "react";
import FishPopup from "../components/FishPopup.tsx";

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

    const [showPopup, setShowPopup] = useState(false)

    const handleOpenPopup = () => {
        setShowPopup(true)
    }
    const handleClosePopup = async () => {
        setShowPopup(false)
        await handleKeep();
    }

    return (
        <div style={styles.container} onClick={() => !fishOnLine && !saving && startFishing()}>
            <FisherCharacter character="marie" isFishing={isFishing} />

            <p>{message}</p>

            {fishOnLine && (
                <div style={styles.actions}>
                    <button onClick={reelInFish}>Relever la ligne</button>
                    <button onClick={handleOpenPopup} disabled={saving}>Garder</button>
                    <button onClick={handleRelease} disabled={saving}>Relâcher</button>
                </div>
            )}

            {nothingCaught && (
                <button onClick={resetFishing}>Réessayer</button>
            )}

            {fishOnLine && showPopup && (
                <FishPopup
                    size={fishOnLine.size}
                    rarity={fishOnLine.rarity}
                    model="basicFish"
                    onClose={handleClosePopup}
                />
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

