import Image from 'react-bootstrap/Image'
import Donut from './Donut'

const Achievement = ({donut, badge, title, description}) => {
  return (
    //   Whole Card
    <div className='achv row border border-dark rounded mb-10'>
        {/* LeftSide */}
        <div className='achv-info col-lg-4 d-flex align-items-center justify-content-center border' id='achv-progress'>
            <div className='row d-flex align-items-center'>
                <div className="col-md col-lg acvh-iholder">
                    {/* <Image className='col acvh-img' id="achv-donut" src={donut} fluid/> */}
                    <Donut total={3} complete={5} size={150}></Donut>
                </div>
                <div className="col-md col-lg acvh-iholder">
                    <Image className='col acvh-img' id="achv-badge" src={badge} fluid />
                </div> 
            </div>
        </div>
        {/* Right Side */}
        <div className='achv-info col-lg-8' id='achv-achv-description'>
            <h1>{title}</h1>
            <h3>{description}</h3>
        </div>
    </div>
  )
}

export default Achievement