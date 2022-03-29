import Button from "react-bootstrap/Button"
import StickyNote from "./StickyNote"
import SNTmp from "../img/StickyNote.png"
import PickOne from "./PickOne"
import 'bootstrap/dist/css/bootstrap.css'

const Wheelspin = () => {
    return (
        <div className='container'>
            <div id='WsMain' className='row'>
                <div id='MysterySticky' className='col-md-6 border d-flex align-items-center justify-content-center'>
                    <PickOne/>
                </div>
                <div className='col-md-6 border'>
                    <div id='Owned-Items' className="row">
                        <div className="col-sm-12 border ACH-p1-Head">
                            <h3>Owned Cosmetics</h3>
                        </div>
                        <div className="col-sm-12 border">
                            <StickyNote color="Blue"></StickyNote>
                            <StickyNote color="red"></StickyNote>
                            <StickyNote color="green"></StickyNote>
                            <StickyNote color="yellow"></StickyNote>
                            <StickyNote color="orange"></StickyNote>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Wheelspin