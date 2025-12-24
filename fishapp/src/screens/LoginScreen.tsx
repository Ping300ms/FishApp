import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import logo from '../assets/logo.png'

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

        navigate('/fishing', { replace: true })
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card}>

                <img src={logo} style={styles.logo} />
                <h1 style={styles.title}>FishApp</h1>

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
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Press Start 2P", monospace',
        overflow: 'hidden'
    },
    card: {
        background: '#1e293b',
        padding: '2rem',
        borderRadius: 12,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        border: '2px solid #0ea5e9'
    },
    title: {
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#fef3c7',
        textShadow: '2px 2px 0 #000'
    },
    input: {
        padding: '0.75rem',
        fontSize: '0.8rem',
        borderRadius: 6,
        border: '2px solid #0ea5e9',
        background: '#1e293b',
        color: '#fef3c7',
        fontFamily: '"Press Start 2P", monospace',
        outline: 'none',
        boxShadow: 'inset 0 0 0 1px #0ea5e9',
    },
    button: {
        padding: '0.75rem',
        fontSize: '0.8rem',
        borderRadius: 6,
        border: '2px solid #0ea5e9',
        background: '#0ea5e9',
        color: '#1e293b',
        cursor: 'pointer',
        fontFamily: '"Press Start 2P", monospace',
        textTransform: 'uppercase',
        transition: 'all 0.2s ease',
    },
    error: {
        color: '#f87171',
        fontSize: '0.7rem',
        textAlign: 'center'
    },
    logo: {
        imageRendering: "pixelated",
        width: 150,
        alignSelf: 'center'
    }
}
