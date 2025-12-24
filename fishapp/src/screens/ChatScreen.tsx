import { useAuth } from '../contexts/AuthContext'
import Message from '../components/ChatMessage.tsx'
import { useChat } from '../hooks/useChat.ts'
import ChatInput from '../components/ChatInput.tsx'
import {useEffect} from "react";
import {notificationService} from "../services/notifications.service.ts";

export default function ChatScreen() {
    const { user } = useAuth()
    const { messages, profiles, sendMessage, messagesEndRef } = useChat(user?.id)

    useEffect(() => {
        notificationService.requestPermission()
    }, [])

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

            <div style={styles.inputWrapper}>
                <ChatInput onSend={sendMessage} />
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative'
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        marginBottom: 64,
        paddingBottom: '120px'
    },
    inputWrapper: {
        position: 'fixed',
        bottom: 64,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000
    }
}
