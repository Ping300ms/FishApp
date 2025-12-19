import {supabase} from "./supabaseClient.ts";

export const chatService = {
    async getMessages() {
        return supabase
            .from('chat_messages')
            .select(`
        id,
        content,
        created_at,
        profiles ( username )
      `)
            .order('created_at', { ascending: true })
    },

    async sendMessage(userId: string, content: string) {
        return supabase.from('chat_messages').insert({
            user_id: userId,
            content
        })
    },

    subscribeToMessages(callback: (payload: any) => void) {
        return supabase
            .channel('chat-room')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'chat_messages' },
                callback
            )
            .subscribe()
    }
}
