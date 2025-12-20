import { createContext, useContext, useState } from 'react'
import { supabase } from '../services/supabaseClient'

type Profile = {
    id: string
    username: string
    avatar_url?: string | null
}

type ProfilesContextType = {
    getProfile: (userId: string) => Promise<Profile | null>
}

const ProfilesContext = createContext<ProfilesContextType | null>(null)

export function ProfilesProvider({ children }: { children: React.ReactNode }) {
    const [profiles, setProfiles] = useState<Record<string, Profile>>({})

    const getProfile = async (userId: string) => {
        if (profiles[userId]) {
            return profiles[userId]
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('id, username, avatar_url')
            .eq('id', userId)
            .single()

        if (error || !data) return null

        setProfiles(prev => ({ ...prev, [userId]: data }))
        return data
    }

    return (
        <ProfilesContext.Provider value={{ getProfile }}>
            {children}
        </ProfilesContext.Provider>
    )
}

export const useProfiles = () => {
    const ctx = useContext(ProfilesContext)
    if (!ctx) throw new Error('useProfiles must be used inside ProfilesProvider')
    return ctx
}
