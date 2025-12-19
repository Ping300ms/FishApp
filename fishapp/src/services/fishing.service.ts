import {supabase} from "./supabaseClient.ts";

export type CatchPayload = {
    modelId: number
    size: number
    rarity: string
}

export const fishingService = {
    async catchFish(
        userId: string,
        fish: CatchPayload
    ) {
        return supabase.from('catches').insert({
            user_id: userId,
            model_id: fish.modelId,
            size: fish.size,
            rarity: fish.rarity
        })
    },

    async getUserCatches(userId: string) {
        return supabase
            .from('catches')
            .select('*')
            .eq('user_id', userId)
            .order('caught_at', { ascending: false })
    }
}
