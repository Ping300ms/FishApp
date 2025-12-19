import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'

export default function LoginScreen() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { error } = await authService.signIn(email, password)

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        // ✅ Redirection après login
        navigate('/fishing', { replace: true })
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card}>
                <h1 style={styles.title}>🎣 FishApp</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                {error && <p style={styles.error}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        ...styles.button,
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0ea5e9'
    },
    card: {
        background: '#fff',
        padding: '2rem',
        borderRadius: 12,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    title: {
        textAlign: 'center',
        marginBottom: '1rem'
    },
    input: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: 8,
        border: '1px solid #ccc'
    },
    button: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        color: '#fff',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        fontSize: '0.9rem'
    }
}
