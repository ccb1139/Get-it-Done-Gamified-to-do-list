import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Sticky from "../img/StickyNote.png"
import MsyBox from "../img/mysBoxPH.png"


const StickyNote = ({ id, stickyImg, color }) => {
    if (color[0] != "#") {
        color = "#" + color
    }
    return (
        <div className='col' id='stickyDiv'>
            <img id={id} src={Sticky}
                style={{ filter: 'opacity(0.5) drop-shadow(0 0 0 ' + color + ' )' }}></img>
        </div>


    )
}

export default StickyNote