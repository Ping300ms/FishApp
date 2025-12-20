import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Message from '../components/ChatMessage.tsx';
import {useChat} from "../hooks/useChat.ts";

export default function ChatScreen() {
    const { user } = useAuth()
    const { messages, profiles, sendMessage, messagesEndRef } = useChat(user?.id)
    const [newMessage, setNewMessage] = useState<string>("")

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
            <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => { if(e.key === 'Enter') sendMessage(newMessage) }}
            />
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
