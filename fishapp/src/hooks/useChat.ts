// src/hooks/useChat.ts
import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../services/supabaseClient'
import { chatService, type ChatMessage } from '../services/chat.service'
import { useProfiles } from '../contexts/UsersContext'
import { notificationService } from '../services/notifications.service'

export function useChat(userId?: string) {
    const { getProfile } = useProfiles()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [profiles, setProfiles] = useState<Record<string, {
        username: string
        avatar_url?: string | null
    }>>({})
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Scroll automatique
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Charger messages initiaux
    useEffect(() => {
        const loadMessagesAndProfiles = async () => {
            const msgs = await chatService.getMessages()
            setMessages(msgs)
            const userIds = Array.from(new Set(msgs.map(m => m.user_id)))
            const fetchedProfiles = await Promise.all(
                userIds.map(async id => {
                    const profile = await getProfile(id)
                    return profile ? [id, profile] : null
                })
            )
            setProfiles(prev => ({
                ...prev,
                ...Object.fromEntries(fetchedProfiles.filter(Boolean) as any)
            }))
        }

        loadMessagesAndProfiles()
    }, [])

    // Subscription realtime
    useEffect(() => {
        const channel = chatService.subscribeToMessages(async (msg: ChatMessage) => {
            setMessages(prev => [...prev, msg])

            if (msg.user_id === userId) return
            // Charger profil si nécessaire
            const profile = await getProfile(msg.user_id)
            if (profile) {
                setProfiles(prev => ({ ...prev, [msg.user_id]: profile }))
                // Notification
                await notificationService.notify(
                    `💬 ${profile.username}`,
                    msg.content,
                    { tag: 'chat' }
                )
            }
        })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId])

    // Envoyer un message
    const sendMessage = useCallback(async (content: string) => {
        if (!userId || !content.trim()) return
        await chatService.sendMessage(userId, content.trim())
    }, [userId])

    return {
        messages,
        profiles,
        sendMessage,
        messagesEndRef
    }
}
