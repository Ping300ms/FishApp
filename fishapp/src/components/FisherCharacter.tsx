import { useEffect, useState } from 'react'
import marie0 from '../assets/characters/marie/marie_0.png'
import marie1 from '../assets/characters/marie/marie_1.png'
import marie2 from '../assets/characters/marie/marie_2.png'

type Props = {
    character: string // ex: "marie"
    isFishing: boolean
}

export default function FisherCharacter({ character, isFishing }: Props) {
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        if (!isFishing) {
            setFrame(0)
            return
        }

        // animation simple en 3 étapes
        setFrame(1)
        const mid = setTimeout(() => setFrame(2), 600)

        return () => clearTimeout(mid)
    }, [isFishing])


    const frames = [marie0, marie1, marie2]
    const src = frames[frame]

    return (
        <div style={styles.wrapper}>
            <img
                src={src}
                alt={`${character} fishing`}
                style={styles.image}
                draggable={false}
            />
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
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
    },
    image: {
        width: 220,
        maxWidth: '80vw',
        userSelect: 'none',
        imageRendering: 'pixelated',
    }
}

