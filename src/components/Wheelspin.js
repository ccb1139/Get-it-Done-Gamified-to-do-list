import Button from "react-bootstrap/Button"
import StickyNote from "./StickyNote"
import SNTmp from "../img/StickyNote.png"
import PickOne from "./PickOne"
import 'bootstrap/dist/css/bootstrap.css'
import '../css/Wheelspin.css'
import UnlockProgress from './UnlockProgress'

const Wheelspin = () => {
    return (
        <div className='container'>
            <div id='WsMain' className='row'>
                <div id='MysterySticky' className='col-md-6 d-flex align-items-center justify-content-center'>
                    <PickOne unlockAvil={true}/>
                </div>
                <div className='col-md-6'>
                    <div id='Owned-Items' className="row">
                        <div className="col-sm-12 border ACH-p1-Head">
                            <h3>Owned Cosmetics</h3>
                        </div>
                        <div className="col-sm-12 border cosHolder">
                            <StickyNote color="Blue"></StickyNote>
                            <StickyNote color="red"></StickyNote>
                            <StickyNote color="green"></StickyNote>
                            <StickyNote color="yellow"></StickyNote>
                            <StickyNote color="orange"></StickyNote>
                        </div>
                        
                    </div>
                </div>
                <UnlockProgress complete={3} total={5}></UnlockProgress>
            </div>

        </div>
    )
}

export default Wheelspin