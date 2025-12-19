import {supabase} from "./supabaseClient.ts";

export const authService = {
    async signIn(email: string, password: string) {
        return supabase.auth.signInWithPassword({
            email,
            password
        })
    },

    async signOut() {
        return supabase.auth.signOut()
    },

    async getSession() {
        return supabase.auth.getSession()
    },

    onAuthStateChange(callback: any) {
        return supabase.auth.onAuthStateChange(callback)
    }
}
