import { useEffect, useState } from 'react'
import {FISHER_SKINS, getUserSkin} from "../game/skinsTable.ts";
import {useAuth} from "../contexts/AuthContext.tsx";

type Props = {
    character: string // ex: "marie"
    isFishing: boolean
}

export default function FisherCharacter({ character, isFishing }: Props) {
    const [frame, setFrame] = useState(0)
    const {user} = useAuth();

    useEffect(() => {
        isFishing ? setFrame(1) : setFrame(0);
    }, [isFishing])


    const frames = FISHER_SKINS[getUserSkin(user!.id)];

    return (
        <div>
            <img
                src={frame === 0 ? frames.idle : frames.fishing}
                alt={`${character} fishing`}
                style={styles.image}
                draggable={false}
            />
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    image: {
        width: 150,
        maxWidth: '80vw',
        userSelect: 'none',
        imageRendering: 'pixelated',
    }
}

