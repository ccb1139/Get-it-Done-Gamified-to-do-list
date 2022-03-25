import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.css'

const Wheelspin = () => {
  return (
    <div className='container'>
        <div id='WsMain' className='row'>
            <div id='Spinner' className='col-md-6 border'>
                <Button variant="primary">Spin!</Button>{' '}
            </div>
            <div id='Owned-Items' className='col-md-6 border'>
                <h3>Owned</h3>
            </div>
        </div>
        
    </div>
  )
}

export default Wheelspin