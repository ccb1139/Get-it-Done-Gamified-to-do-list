import Button from "react-bootstrap/Button"
import StickyNote from "./StickyNote"
import SNTmp from "../img/StickyNotePlaceHolder.png"
import 'bootstrap/dist/css/bootstrap.css'

const Wheelspin = () => {
    return (
        <div className='container'>
            <div id='WsMain' className='row'>
                <div id='MysterySticky' className='col-md-6 border'>
                    <div id="pickUnlock" className="col-md-10 border">
                        <StickyNote image={SNTmp}></StickyNote>
                        <StickyNote image={SNTmp}></StickyNote>
                        <StickyNote image={SNTmp}></StickyNote>
                    </div>
                </div>
                <div className='col-md-6 border'>
                    <div id='Owned-Items' className="row">
                        <div className="col-sm-12 border" id="Owned-Items-Head">
                            <h3>Owned Cosmetics</h3>
                        </div>
                        <div className="col-sm-12 border">
                            <StickyNote image={SNTmp}></StickyNote>
                            <StickyNote image={SNTmp}></StickyNote>
                            <StickyNote image={SNTmp}></StickyNote>
                            <StickyNote image={SNTmp}></StickyNote>
                            <StickyNote image={SNTmp}></StickyNote>
                            <StickyNote image={SNTmp}></StickyNote>
                            <StickyNote image={SNTmp}></StickyNote>
                            <StickyNote image={SNTmp}></StickyNote>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Wheelspin