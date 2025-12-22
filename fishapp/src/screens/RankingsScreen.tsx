import { useEffect, useState } from 'react'
import {type rankingsEntry, rankingsService} from "../services/rankings.service.ts";

export default function RankingsScreen() {
    const [entries, setEntries] = useState<rankingsEntry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        rankingsService.getRankings()
            .then(setEntries)
            .finally(() => setLoading(false))
    }, [])


    if (loading) return <div>Chargement du classement...</div>

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Classement des plus grosses prises</h2>

            {entries.length === 0 && <p>Aucune prise enregistrée pour le moment.</p>}

            <ol style={styles.list}>
                {entries.map((entry, index) => (
                    <li
                        key={entry.user_id}
                        style={{
                            ...styles.item,
                            background:
                                index === 0 ? '#3b0764' :
                                    index === 1 ? '#1e3a8a' :
                                        index === 2 ? '#064e3b' :
                                            'transparent'
                        }}
                    >                        <span style={styles.rank}>{index + 1}.</span>
                        <span style={styles.username}>{entry.username}</span>
                        <span style={styles.size}>🐟 {entry.biggest_catch} cm</span>
                        <span style={styles.total}>({entry.total_catches} prises)</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '1rem',
        paddingBottom: 90,
        fontFamily: '"Press Start 2P", monospace',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#e5e7eb'
    },

    title: {
        fontSize: '1rem',
        textAlign: 'center',
        marginBottom: '1rem',
        textShadow: '2px 2px 0 #000'
    },

    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
        maxWidth: 420,
        background: '#020617',
        border: '3px solid #38bdf8',
        borderRadius: 12,
        boxShadow: '0 0 0 4px #000',
        overflow: 'hidden'
    },

    item: {
        display: 'grid',
        gridTemplateColumns: '32px 1fr auto auto',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem',
        fontSize: '0.7rem',
        borderBottom: '2px dashed #1e293b'
    },

    rank: {
        textAlign: 'center',
        color: '#facc15'
    },

    username: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    size: {
        color: '#38bdf8'
    },

    total: {
        fontSize: '0.6rem',
        color: '#94a3b8'
    }
}
