import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BottomNavbar from './BottomNavbar'

export default function Layout() {
    const location = useLocation()
    const navigate = useNavigate()

    const current = location.pathname.split('/')[1]

    return (
        <div style={{ paddingBottom: 64 }}>
            <Outlet />

            <BottomNavbar
                active={current as any}
                onChange={(screen) => navigate(`/${screen}`)}
            />
        </div>
    )
}
