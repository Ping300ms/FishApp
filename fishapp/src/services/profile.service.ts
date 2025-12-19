import {supabase} from "./supabaseClient.ts";

export const profileService = {
    async getProfile(userId: string) {
        return supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
    },

    async createProfile(userId: string, username: string) {
        return supabase
            .from('profiles')
            .insert({
                id: userId,
                username
            })
    },

    async updateAvatar(userId: string, avatarUrl: string) {
        return supabase
            .from('profiles')
            .update({ avatar_url: avatarUrl })
            .eq('id', userId)
    }
}
