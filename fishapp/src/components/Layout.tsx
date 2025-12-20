import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BottomNavbar from './BottomNavbar'

export default function Layout() {
    const location = useLocation()
    const navigate = useNavigate()

    const current = location.pathname.split('/')[1]

    return (
        <div style={styles.container}>
            <Outlet />

            <BottomNavbar
                active={current as any}
                onChange={(screen) => navigate(`/${screen}`)}
            />
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: '100%',
        height: '100%',
    },
}

