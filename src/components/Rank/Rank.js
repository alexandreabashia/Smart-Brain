import './rank.css';
import '../../App.css';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='b'>
                {name + ', your current rank is...'}
            </div>
            <div className='white f1'>
                {entries}
            </div>
            
        </div>
    )
}

export default Rank;