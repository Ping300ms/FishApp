import { useFishing } from '../hooks/useFishing'
import background from '../assets/background/background.png'
import FisherCharacter from '../components/FisherCharacter'
import { useState, useEffect } from 'react'
import FishPopup from '../components/FishPopup'
import bubble from '../assets/bubble.png'
import {type CatchPayload, fishingService} from '../services/fishing.service'
import {useAuth} from "../contexts/AuthContext.tsx";

export default function FishingScreen() {
    const {user} = useAuth()
    const {
        fishOnLine,
        saving,
        startFishing,
        handleKeep,
        handleRelease,
        handleStop,
        isFishing,
        fishLockedRef,
        cancelBeforeBite,
        attempts
    } = useFishing()

    const [showPopup, setShowPopup] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [isRecord, setIsRecord] = useState(false)

    useEffect(() => {
        if (!fishOnLine) return

        const checkFishStatus = async () => {
            const { data: catches } = await fishingService.getBiggestFishes(user!.id) // remplacer par user.id
            const previous = catches.find((f : CatchPayload) => f.model_id === fishOnLine.modelId)

            setIsNew(!previous)
            setIsRecord(previous ? fishOnLine.size > previous.size : false)
        }

        checkFishStatus()
    }, [fishOnLine])

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
                else if (isFishing && !fishOnLine) cancelBeforeBite()
                else if (!saving) startFishing()
            }}
        >
            <div style={styles.ui}>
                <p style={styles.text}>niveau de pêche: {attempts}</p>
            </div>

            {fishOnLine && !showPopup && (
                <img src={bubble} alt="Fish bite" style={styles.bubble} />
            )}

            <div style={styles.characterWrapper}>
                <FisherCharacter character="marie" isFishing={isFishing} />
            </div>

            {fishOnLine && showPopup && (
                <FishPopup
                    size={fishOnLine.size}
                    rarity={fishOnLine.rarity}
                    model={fishOnLine.modelId}
                    isNew={isNew}
                    isRecord={isRecord}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: { position: 'relative', width: '100%', height: '100%', backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', overflow: 'hidden' },
    ui: { position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', zIndex: 10, pointerEvents: 'auto', width: '100%' },
    text: { fontFamily: '"Press Start 2P", monospace', fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '2px 2px 0 #000', maxWidth: 280, lineHeight: 1.6 },
    characterWrapper: { position: 'absolute', top: '52.5%', left: '50%', transform: 'translate(-50%, -55%)', display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none', zIndex: 10, marginBottom: "1vh" },
    bubble: { position: 'absolute', top: '45%', left: '44%', transform: 'translate(-50%, -100%)', width: 95, height: 95, imageRendering: 'pixelated', zIndex: 20, pointerEvents: 'none' },
}
