import './Navigation.css';
import '../../App.css';

const Navigation = () => {
    return (
        <nav className='zIndex' style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p className = 'f3 link dim black pa2 pointer'>Sign out</p>
        </nav>
    );
}

export default Navigation;