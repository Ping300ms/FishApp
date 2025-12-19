import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type {JSX} from "react";

export default function ProtectedRoute({
                                           children
                                       }: {
    children: JSX.Element
}) {
    const { session, loading } = useAuth()

    if (loading) return <div>Chargement...</div>

    if (!session) {
        return <Navigate to="/login" replace />
    }

    return children
}
