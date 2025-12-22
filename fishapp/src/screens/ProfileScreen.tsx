import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { profileService } from '../services/profile.service'
import { useNavigate } from 'react-router-dom'
import FishGrid from "../components/FishGrid.tsx";
import FisherCharacter from "../components/FisherCharacter.tsx";

export default function ProfileScreen() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return
        setLoading(true)
        profileService.getProfile(user.id)
            .then(({ data, error }) => {
                if (error) throw error
                setUsername(data.username)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [user])

    const handleLogout = async () => {
        await signOut()
        navigate('/login', { replace: true })
    }

    if (loading) return <div>Chargement du profil...</div>

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Profil</h3>

            <FisherCharacter character="marie" isFishing={true} />

            <p style={styles.text}><strong>Username:</strong> {username}</p>
            <p style={styles.text}><strong>Email:</strong> {user?.email}</p>

            <button onClick={handleLogout} style={styles.logoutButton}>
                Se déconnecter
            </button>

            <div style={styles.container}>
                {/* ... infos utilisateur ... */}

                <h3 style={styles.title}>Mes poissons capturés</h3>
                {user && (
                    <div style={styles.gridWrapper}>
                        <FishGrid userId={user.id} />
                    </div>
                )}
            </div>
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    container: {
        paddingBottom: 80, // pour bottom navbar
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: "100%",
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
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        color: '#fff',
        cursor: 'pointer'
    },
    logoutButton: {
        fontFamily: '"Press Start 2P", monospace', // typo pixel
        padding: '0.75rem 1rem',
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer'
    },
    title: {
        fontSize: 15,
    },
    gridWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    text : {
        margin: 0
    }
}
