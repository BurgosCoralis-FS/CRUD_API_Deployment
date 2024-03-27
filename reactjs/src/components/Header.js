import { Link, useNavigate } from "react-router-dom"

import authService from "../services/auth.service";

import '../App.css';

function Header() {
    const navigate = useNavigate()

    const handleLogOut = () => {
        authService.logout()
        navigate('/')
    }

    return (
        <div>
        <header className="App-header">
            <p className='title'>Movie Tracker App</p>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button className='title' onClick={handleLogOut}>Log Out</button>
        </header>
        </div>
    );
}

export default Header;