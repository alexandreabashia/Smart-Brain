import './Navigation.css';
import '../../App.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa2 pointer b zIndex'>Sign out</p>
            </nav>
        );
        
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa2 pointer b zIndex'>Login</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black pa2 pointer b zIndex'>Register</p>
            </nav>

        );
    }
}

export default Navigation;