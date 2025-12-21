import {
    IoFishOutline,
    IoTrophyOutline,
    IoChatbubbleOutline,
    IoPersonOutline
} from 'react-icons/io5'

type Screen = 'fishing' | 'leaderboard' | 'chat' | 'profile'

type Props = {
    active: Screen
    onChange: (screen: Screen) => void
}

export default function BottomNavbar({ active, onChange }: Props) {
    return (
        <nav style={styles.nav}>
            <NavItem
                label="Pêche"
                icon={<IoFishOutline size={22} />}
                active={active === 'fishing'}
                onClick={() => onChange('fishing')}
            />

            <NavItem
                label="Classement"
                icon={<IoTrophyOutline size={22} />}
                active={active === 'leaderboard'}
                onClick={() => onChange('leaderboard')}
            />

            <NavItem
                label="Chat"
                icon={<IoChatbubbleOutline size={22} />}
                active={active === 'chat'}
                onClick={() => onChange('chat')}
            />

            <NavItem
                label="Profil"
                icon={<IoPersonOutline size={22} />}
                active={active === 'profile'}
                onClick={() => onChange('profile')}
            />
        </nav>
    )
}

type ItemProps = {
    label: string
    icon: React.ReactNode
    active: boolean
    onClick: () => void
}

function NavItem({ label, icon, active, onClick }: ItemProps) {
    return (
        <button
            onClick={onClick}
            style={{
                ...styles.item,
                color: active ? '#0ea5e9' : '#64748b'
            }}
        >
            <div style={styles.icon}>{icon}</div>
            <span style={styles.label}>{label}</span>
        </button>
    )
}

const styles: Record<string, React.CSSProperties> = {
    nav: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        zIndex: 100
    },
    item: {
        background: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        gap: 4
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 12,
    }
}
