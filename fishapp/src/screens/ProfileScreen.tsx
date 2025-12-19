import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { profileService } from '../services/profile.service'
import { useNavigate } from 'react-router-dom'

export default function ProfileScreen() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [newAvatar, setNewAvatar] = useState<string>('')

    useEffect(() => {
        if (!user) return
        setLoading(true)
        profileService.getProfile(user.id)
            .then(({ data, error }) => {
                if (error) throw error
                setUsername(data.username)
                setAvatarUrl(data.avatar_url || null)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [user])

    const handleUpdateAvatar = async () => {
        if (!user || !newAvatar) return
        try {
            await profileService.updateAvatar(user.id, newAvatar)
            setAvatarUrl(newAvatar)
            setNewAvatar('')
        } catch (err) {
            console.error(err)
        }
    }

    const handleLogout = async () => {
        await signOut()
        navigate('/login', { replace: true })
    }

    if (loading) return <div>Chargement du profil...</div>

    return (
        <div style={styles.container}>
            <h2>👤 Profil</h2>

            {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" style={styles.avatar} />
            ) : (
                <div style={styles.avatarPlaceholder}>Aucun avatar</div>
            )}

            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {user?.email}</p>

            <div style={styles.updateContainer}>
                <input
                    type="text"
                    placeholder="URL nouvel avatar"
                    value={newAvatar}
                    onChange={e => setNewAvatar(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleUpdateAvatar} style={styles.button}>
                    Mettre à jour
                </button>
            </div>

            <button onClick={handleLogout} style={styles.logoutButton}>
                Se déconnecter (debug)
            </button>
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '1.5rem',
        paddingBottom: 80, // pour bottom navbar
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748b'
    },
    updateContainer: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem'
    },
    input: {
        flex: 1,
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: '1px solid #ccc'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        color: '#fff',
        cursor: 'pointer'
    },
    logoutButton: {
        marginTop: '2rem',
        padding: '0.75rem 1rem',
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer'
    }
}
