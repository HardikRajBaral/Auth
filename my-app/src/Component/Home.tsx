import { useNavigate } from 'react-router-dom'

const Home=()=>{
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('auth_token')
        navigate('/')
    }

    return(
        <main className="dashboard-page">
            <section className="dashboard-card">
                <div className="dashboard-top">
                    <div>
                        <div className="dashboard-badge">Authenticated</div>
                        <h2>You're signed in</h2>
                        <p>This is a cleaner landing state than the old empty page, with a straightforward next action.</p>
                    </div>
                    <button className="dashboard-button" onClick={handleLogout}>Log out</button>
                </div>
                <div className="dashboard-grid">
                    <div className="dashboard-tile">
                        <strong>Profile</strong>
                        <p>Your account is active and ready to use.</p>
                    </div>
                    <div className="dashboard-tile">
                        <strong>Security</strong>
                        <p>Keep credentials updated when you need to refresh access.</p>
                    </div>
                    <div className="dashboard-tile">
                        <strong>Session</strong>
                        <p>Token storage remains local until you sign out.</p>
                    </div>
                </div>
            </section>
        </main>
    )

}
export default Home