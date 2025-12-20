import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import ChatScreen from './screens/ChatScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from "./components/Layout.tsx";
import FishScreen from "./screens/FishScreen.tsx";
import RankingsScreen from "./screens/RankingsScreen.tsx";
import { useEffect } from 'react'

export default function App() {

    useEffect(() => {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                Notification.requestPermission()
            }
        }
    }, [])

    return (
        <BrowserRouter basename="/FishApp">
            <Routes>
                <Route path="/login" element={<LoginScreen />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/fishing" />} />
                    <Route path="fishing" element={<FishScreen />} />
                    <Route path="leaderboard" element={<RankingsScreen />} />
                    <Route path="chat" element={<ChatScreen />} />
                    <Route path="profile" element={<ProfileScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
