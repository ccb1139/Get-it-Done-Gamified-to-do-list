import { ProgressBar } from 'react-bootstrap'
import '../css/UnlockProgress.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-circular-progressbar/dist/styles.css';

function UnlockProgress({complete, total}) {
    const progressMsg = complete + " / " + total 

    return (
        <div className='col-sm-10 fixed-bottom border' id='ACH-Unlock-Progress'>
            <div className='row d-flex align-items-center justify-content-center'>
                <div className='col-sm-10'>
                    <ProgressBar now={(complete/total)*100} label={progressMsg}></ProgressBar>
                </div>
                <div className='col-sm-2' style={{textAlign: "center"}}>
                    <p id="ACH-Unlock-Info" >{total - complete} more donuts for an unlock!</p>
                </div>
                
            </div>  
        </div>
        
        
    )
}

export default UnlockProgress