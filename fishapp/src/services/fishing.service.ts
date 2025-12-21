import {supabase} from "./supabaseClient.ts";

export type CatchPayload = {
    model_id: number
    size: number
    rarity: string
}

export type Catch = {
    id: number
    user_id: string
    model_id: number
    size: number
    rarity: string
    caught_at: string
}

export const fishingService = {
    async catchFish(
        userId: string,
        fish: CatchPayload
    ) {
        return supabase.from('catches').insert({
            user_id: userId,
            model_id: fish.model_id,
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
    },


    async getBiggestFishes(userId: string) {
        // On appelle la fonction RPC
        console.log(userId)
        const response = await supabase
            .rpc('get_biggest_fishes_per_model', { p_user_id: userId });
        console.log(response)

        // On retourne directement response pour que le composant puisse destructurer
        return response; // { data, error }
    }
}
