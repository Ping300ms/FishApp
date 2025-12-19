import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProfileScreen() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate('/login', { replace: true })
    }

    return (
        <div>
            <h2>👤 Profil</h2>

            <p>
                <strong>Email :</strong> {user?.email}
            </p>

            <button
                onClick={handleLogout}
            >
                Se déconnecter (debug)
            </button>
        </div>
    )
}
