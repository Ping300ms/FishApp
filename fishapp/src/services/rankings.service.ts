import { supabase } from './supabaseClient.ts'

export type rankingsEntry = {
    user_id: string
    username: string
    biggest_catch: number
    total_catches: number
}

export const rankingsService = {
    async getRankings(): Promise<rankingsEntry[]> {
        // On récupère les infos pour chaque user : plus grosse prise et nombre de prises
        const { data, error } = await supabase
            .from('catches')
            .select('user_id, size, profiles(username)')

        if (error) throw error

        const map: Record<string, { biggest_catch: number; total_catches: number; username: string }> = {}

        data?.forEach((row: any) => {
            const userId = row.user_id
            const username = row.profiles?.[0]?.username || 'User'

            if (!map[userId]) {
                map[userId] = { biggest_catch: row.size, total_catches: 1, username }
            } else {
                map[userId].total_catches += 1
                if (row.size > map[userId].biggest_catch) {
                    map[userId].biggest_catch = row.size
                }
            }
        })

        // Convert to array et tri par plus grosse prise
        return Object.entries(map)
            .map(([user_id, val]) => ({
                user_id,
                username: val.username,
                biggest_catch: val.biggest_catch,
                total_catches: val.total_catches
            }))
            .sort((a, b) => b.biggest_catch - a.biggest_catch)
    }
}
