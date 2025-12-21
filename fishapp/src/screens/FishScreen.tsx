import { useFishing } from '../hooks/useFishing'
import background from '../assets/background/background.png'
import FisherCharacter from '../components/FisherCharacter'
import { useState } from 'react'
import FishPopup from '../components/FishPopup'

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

    const handleClosePopup = async () => {
        setShowPopup(false)
        await handleKeep()
    }

    return (
        <div
            style={styles.container}
            onClick={() => !fishOnLine && !saving && startFishing()}
        >
            {/* UI OVERLAY */}
            <div style={styles.ui}>
                <p style={styles.text}>{message}</p>

                {fishOnLine && (
                    <div style={styles.actions}>
                        <button style={styles.button} onClick={reelInFish}>
                            Arrêter
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => setShowPopup(true)}
                            disabled={saving}
                        >
                            Garder
                        </button>
                        <button
                            style={styles.button}
                            onClick={handleRelease}
                            disabled={saving}
                        >
                            Relâcher
                        </button>
                    </div>
                )}

                {nothingCaught && (
                    <button style={styles.button} onClick={resetFishing}>
                        Réessayer
                    </button>
                )}
            </div>

            {/* PERSONNAGE */}
            <div style={styles.characterWrapper}>
                <FisherCharacter character="marie" isFishing={isFishing} />
            </div>

            {/* POPUP */}
            {fishOnLine && showPopup && (
                <FishPopup
                    size={fishOnLine.size}
                    rarity={fishOnLine.rarity}
                    model={fishOnLine.modelId}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        overflow: 'hidden',
    },

    ui: {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 10,
        pointerEvents: 'auto',
        width: '100%',
    },

    text: {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '14px',
        textAlign: 'center',
        color: '#fff',
        textShadow: '2px 2px 0 #000',
        maxWidth: 280,
        lineHeight: 1.6,
    },

    actions: {
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    button: {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '12px',
        padding: '0.75rem 1rem',
        background: '#facc15',
        color: '#000',
        border: '2px solid #000',
        borderRadius: 0,
        cursor: 'pointer',
        boxShadow: '2px 2px 0 #000',
    },
    characterWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -55%)',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        pointerEvents: 'none',
        zIndex: 10,

        marginBottom: "1vh",
    }
}
