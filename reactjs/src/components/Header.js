import { Link } from "react-router-dom";
import '../App.css';

function Header() {
    return (
        <div>
        <header className="App-header">
            <p className='title'>Movie Tracker App</p>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
        </header>
        </div>
    );
}

export default Header;