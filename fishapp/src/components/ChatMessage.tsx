type ChatMessageProps = {
    content: string
    username: string
    avatarUrl?: string | null
    isOwnMessage?: boolean
}

export default function Message({
                                        content,
                                        username,
                                        avatarUrl,
                                        isOwnMessage = false
                                    }: ChatMessageProps) {
    return (
        <div
            style={{
                ...styles.container,
                justifyContent: isOwnMessage ? 'flex-end' : 'flex-start'
            }}
        >
            {!isOwnMessage && (
                avatarUrl ? (
                    <img src={avatarUrl} alt={username} style={styles.avatar} />
                ) : (
                    <div style={styles.avatarPlaceholder}>
                        {username.charAt(0).toUpperCase()}
                    </div>
                )
            )}

            <div
                style={{
                    ...styles.bubble,
                    background: isOwnMessage ? '#0ea5e9' : '#e5e7eb',
                    color: isOwnMessage ? '#fff' : '#000'
                }}
            >
                {!isOwnMessage && (
                    <div style={styles.username}>{username}</div>
                )}
                <div>{content}</div>
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.5rem',
        marginBottom: '0.75rem'
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#94a3b8',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem',
        fontWeight: 'bold'
    },
    bubble: {
        maxWidth: '70%',
        padding: '0.5rem 0.75rem',
        borderRadius: 12,
        fontSize: '0.95rem',
        lineHeight: 1.4
    },
    username: {
        fontSize: '0.75rem',
        fontWeight: 'bold',
        marginBottom: 4,
        opacity: 0.8
    }
}
