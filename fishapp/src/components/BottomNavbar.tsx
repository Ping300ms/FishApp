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
                icon="🎣"
                active={active === 'fishing'}
                onClick={() => onChange('fishing')}
            />

            <NavItem
                label="Classement"
                icon="🏆"
                active={active === 'leaderboard'}
                onClick={() => onChange('leaderboard')}
            />

            <NavItem
                label="Chat"
                icon="💬"
                active={active === 'chat'}
                onClick={() => onChange('chat')}
            />

            <NavItem
                label="Profil"
                icon="👤"
                active={active === 'profile'}
                onClick={() => onChange('profile')}
            />
        </nav>
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
        cursor: 'pointer'
    }
}


type ItemProps = {
    label: string
    icon: string
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
            <div style={{ fontSize: 20 }}>{icon}</div>
            <span style={{ fontSize: 12 }}>{label}</span>
        </button>
    )
}

