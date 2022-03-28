import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import SNTmp from "../img/StickyNotePlaceHolder.png"


const StickyNote = ({ image, color, id }) => {

    const onClick = () => {
        
    }


    return (
        <img id={id} src={image} tintColor="red" onClick={onClick}></img>

    )
}

StickyNote.defaultProps = {
    image: {SNTmp},
}

export default StickyNote