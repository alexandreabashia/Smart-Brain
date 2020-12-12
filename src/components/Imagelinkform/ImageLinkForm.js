import './imagelinkform.css';
import '../../App.css';

const ImageLinkForm = ({ onInputChange }) => {
    return (
        <div className=''>
            <p className='f4 b'>
            {'This Magic Brain will detect faces in your pictures, give it a try'}
            </p>
            <div className='center zIndex'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;