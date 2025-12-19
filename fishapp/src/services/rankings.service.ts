import {supabase} from "./supabaseClient.ts";

export const rankingsService = {
    async getRankings() {
        return supabase
            .from('leaderboard_view')
            .select('*')
            .order('biggest_fish', { ascending: false })
    }
}
