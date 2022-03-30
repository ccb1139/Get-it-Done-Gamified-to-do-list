import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Image from 'react-bootstrap/Image'
import donut from '../img/DonutPlaceHolder.png'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function UnlockProgress({complete, total}) {
    const progressMsg = complete + " / " + total
    return (
        <div className='col-sm-10 fixed-bottom border' id='ACH-Unlock-Progress'>
            <div className='row d-flex align-items-center justify-content-center'>
                <div className='col-sm-10 border'>
                    <ProgressBar now={(complete/total)*100} label={progressMsg}></ProgressBar>
                </div>
                <div className='col-sm-2 border'>
                    <p style={{lineHeight:"50%", verticalAlign:"middle"}}>{total - complete} more donuts for an unlock!</p>
                </div>
                
            </div>  
        </div>
        
        
    )
}

export default UnlockProgress