import { useEffect, useState, useRef } from 'react'
import {type ChatMessage, chatService} from '../services/chat.service'
import { useAuth } from '../contexts/AuthContext'
import {supabase} from "../services/supabaseClient.ts";
import {useProfiles} from "../contexts/UsersContext.tsx";
import Message from '../components/ChatMessage.tsx';

export default function ChatScreen() {
    const { user } = useAuth()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [profiles, setProfiles] = useState<Record<string, {
        username: string
        avatar_url?: string | null
    }>>({})

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { getProfile } = useProfiles()

    // Charger messages initiaux
    useEffect(() => {
        chatService.getMessages().then(messages => setMessages(messages))
    }, [])

    // Sub Realtime
    useEffect(() => {
        const subscription = chatService.subscribeToMessages((payload: any) => {
            console.log(payload);
            setMessages(prev => [...prev, payload])
        })

        return () => {
            supabase.removeChannel(subscription)
        }
    }, [])

    // Scroll automatique
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        const loadProfiles = async () => {
            const missingUserIds = Array.from(
                new Set(
                    messages
                        .map(m => m.user_id)
                        .filter(id => !profiles[id])
                )
            )

            if (missingUserIds.length === 0) return

            const fetchedProfiles = await Promise.all(
                missingUserIds.map(async id => {
                    const profile = await getProfile(id)
                    return profile ? [id, profile] : null
                })
            )

            setProfiles(prev => ({
                ...prev,
                ...Object.fromEntries(
                    fetchedProfiles.filter(Boolean) as any
                )
            }))
        }

        loadProfiles()
    }, [messages])

    const handleSend = async () => {
        if (!newMessage.trim() || !user) return
        await chatService.sendMessage(user.id, newMessage.trim())
        setNewMessage('')
    }

    return (
        <div style={styles.container}>
            <div style={styles.messages}>
                {messages.map(msg => {
                    const profile = profiles[msg.user_id]
                    if (!profile) return null

                    return (
                        <Message
                            key={msg.id}
                            username={profile.username}
                            avatarUrl={profile.avatar_url}
                            content={msg.content}
                            isOwnMessage={msg.user_id === user?.id}
                        />
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={newMessage}
                    placeholder="Tape ton message..."
                    onChange={e => setNewMessage(e.target.value)}
                    style={styles.input}
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleSend()
                    }}
                />
                <button onClick={handleSend} style={styles.button}>Envoyer</button>
            </div>
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '1rem',
        paddingBottom: 80 // pour bottom navbar
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '1rem'
    },
    message: {
        marginBottom: '0.5rem'
    },
    inputContainer: {
        display: 'flex',
        gap: '0.5rem'
    },
    input: {
        flex: 1,
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: '1px solid #ccc'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        color: '#fff',
        cursor: 'pointer'
    }
}
