// src/components/ChatInput.tsx
import { useState } from 'react'

type Props = {
    onSend: (message: string) => void
    disabled?: boolean
    placeholder?: string
}

export default function ChatInput({ onSend, disabled = false, placeholder = "Tape ton message..." }: Props) {
    const [message, setMessage] = useState('')

    const handleSend = () => {
        if (!message.trim()) return
        onSend(message.trim())
        setMessage('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div style={styles.container}>
            <input
                type="text"
                value={message}
                placeholder={placeholder}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                style={styles.input}
            />
            <button onClick={handleSend} disabled={disabled || !message.trim()} style={styles.button}>
                Envoyer
            </button>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
        padding: '0.5rem'
    },
    input: {
        flex: 1,
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: '1px solid #ccc',
        fontSize: '1rem'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: 8,
        border: 'none',
        background: '#0ea5e9',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}
