import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

function UnlockProgress({complete, total}) {
    return (
        <div className='col-sm-10 fixed-bottom border' id='ACH-Unlock-Progress'>
            <div className='row d-flex align-items-center justify-content-center'>
                <div className='col-sm-10 border'>
                    <ProgressBar now={(complete/total)*100}></ProgressBar>
                </div>
                <p className='col-sm-2' id='ACH-Unlock-Info'>
                    {total - complete} donuts left for an unlock!
                </p>
            </div>  
        </div>
        
        
    )
}

export default UnlockProgress