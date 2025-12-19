import LoginScreen from './screens/LoginScreen'
import { useAuth } from './contexts/AuthContext'

export default function App() {
    const { session, loading, user, signOut } = useAuth()

    if (loading) {
        return <div>Chargement...</div>
    }

    if (!session) {
        return <LoginScreen />
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>🎣 FishApp</h1>

            <p>Connecté en tant que : {user?.email}</p>

            {/* 🔴 Bouton de test */}
            <button
                onClick={signOut}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer'
                }}
            >
                Se déconnecter (test)
            </button>

            <hr style={{ margin: '2rem 0' }} />

            <div>APP CONNECTÉE 🎉</div>
        </div>
    )
}
