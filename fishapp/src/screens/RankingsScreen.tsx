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
                    <li key={entry.user_id} style={styles.item}>
                        <span style={styles.rank}>{index + 1}.</span>
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
        paddingBottom: 80, // pour bottom navbar
        fontFamily: '"Press Start 2P", monospace' // typo pixel
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid #e5e7eb',
        fontFamily: '"Press Start 2P", monospace', // typo pixel
        fontSize: "0.8rem"
    },
    title: {
        fontSize: '1rem',
        textAlign: 'center',
    },
    rank: {
        width: 30
    },
    username: {
        flex: 1
    },
    size: {
        marginRight: 10
    },
    total: {
        color: '#64748b'
    }
}
