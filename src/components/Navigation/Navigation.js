import './Navigation.css';
import '../../App.css';

const Navigation = () => {
    return (
        <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black pa2 pointer b zIndex'>Sign out</p>
        </nav>
    );
}

export default Navigation;