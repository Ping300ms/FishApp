// src/services/chat.service.ts
import { supabase } from './supabaseClient.ts'
import { RealtimeChannel } from '@supabase/supabase-js'

export type ChatMessage = {
    id: string
    user_id: string
    content: string
    created_at: string
    username?: string
}

export const chatService = {
    async getMessages(): Promise<ChatMessage[]> {
        const { data, error } = await supabase
            .from('chat_messages')
            .select(`
        id,
        content,
        created_at,
        user_id,
        profiles(username)
      `)
            .order('created_at', { ascending: true })

        if (error) throw error

        // On map pour simplifier le type
        return (data || []).map(msg => ({
            id: msg.id,
            user_id: msg.user_id,
            content: msg.content,
            created_at: msg.created_at,
            username: msg.profiles?.[0]?.username
        }))
    },

    async sendMessage(userId: string, content: string) {
        const { error } = await supabase
            .from('chat_messages')
            .insert([{ user_id: userId, content }])
        if (error) throw error
    },

    subscribeToMessages(callback: (msg: ChatMessage) => void): RealtimeChannel {
        return supabase
            .channel('chat-room')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages'
                },
                (payload) => {
                    const newMsg: ChatMessage = {
                        id: payload.new.id,
                        user_id: payload.new.user_id,
                        content: payload.new.content,
                        created_at: payload.new.created_at,
                        username: payload.new.profiles?.[0]?.username
                    }
                    callback(newMsg)
                }
            )
            .subscribe()
    }
}
