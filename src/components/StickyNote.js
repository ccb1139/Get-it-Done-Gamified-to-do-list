import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Sticky from "../img/StickyNote.png"
import MsyBox from "../img/mysBoxPH.png"


const StickyNote = ({ id, stickyImg, color}) => {
    return (
        <img id={id} src={Sticky}
        style={{filter:'opacity(0.5) drop-shadow(0 0 0 ' + color + ' )'}}></img>
    )
}

export default StickyNote