import {Bars} from 'react-loader-spinner';
import './index.css'
const MyLoader = ()=> {
    return(
        <div className='loader-section'>
            <Bars type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
        
    )
}

export default MyLoader