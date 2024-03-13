import { Link } from 'react-router-dom';

import '../App.css';

function Home() {
    return (
        <div className="Container">
        <h1>Movie Tracker App</h1>
        <Link to="/dashboard" className='link'>Click to enter</Link>
        </div>
    );
}

export default Home;