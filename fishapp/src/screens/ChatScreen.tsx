import { useEffect, useState, useRef } from 'react'
import {type ChatMessage, chatService} from '../services/chat.service'
import { useAuth } from '../contexts/AuthContext'
import {supabase} from "../services/supabaseClient.ts";

export default function ChatScreen() {
    const { user } = useAuth()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

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

    const handleSend = async () => {
        if (!newMessage.trim() || !user) return
        await chatService.sendMessage(user.id, newMessage.trim())
        setNewMessage('')
    }

    return (
        <div style={styles.container}>
            <div style={styles.messages}>
                {messages.map(msg => (
                    <div key={msg.id} style={styles.message}>
                        {msg.content}
                    </div>
                ))}
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
