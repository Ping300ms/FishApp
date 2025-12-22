import { useFishing } from '../hooks/useFishing'
import background from '../assets/background/background.png'
import FisherCharacter from '../components/FisherCharacter'
import { useState } from 'react'
import FishPopup from '../components/FishPopup'

export default function FishingScreen() {
    const {
        fishOnLine,
        message,
        saving,
        startFishing,
        handleKeep,
        handleRelease,
        handleStop,
        isFishing,
        fishLockedRef
    } = useFishing()

    const [showPopup, setShowPopup] = useState(false)

    const handleClickFish = () => {
        if (!fishOnLine) return
        setShowPopup(true)
        fishLockedRef.current = true
    }

    const handleClosePopup = (action: 'keep' | 'release' | 'stop') => {
        setShowPopup(false)
        fishLockedRef.current = false

        if (action === 'keep') handleKeep()
        else if (action === 'release') handleRelease()
        else if (action === 'stop') handleStop()
    }

    return (
        <div
            style={styles.container}
            onClick={() => {
                if (fishOnLine && !showPopup) handleClickFish()
                else if (!fishOnLine && !saving) startFishing()
            }}
        >
            <div style={styles.ui}>
                <p style={styles.text}>{message}</p>
            </div>

            <div style={styles.characterWrapper}>
                <FisherCharacter character="marie" isFishing={isFishing} />
            </div>

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
    container: { position: 'relative', width: '100%', height: '100%', backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', overflow: 'hidden' },
    ui: { position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', zIndex: 10, pointerEvents: 'auto', width: '100%' },
    text: { fontFamily: '"Press Start 2P", monospace', fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '2px 2px 0 #000', maxWidth: 280, lineHeight: 1.6 },
    characterWrapper: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)', display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none', zIndex: 10, marginBottom: "1vh" },
}
