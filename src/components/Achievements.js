import 'bootstrap/dist/css/bootstrap.css'
import Achievement from './Achievement'
import badgeTmp from '../img/badgePlaceHolder.png'
import donutPH from '../img/DonutPlaceHolder.png'

const Achievements = () => {
    return (
        <div className='overview col-sm-8 col-lg-8'>
            <Achievement badge={badgeTmp} donut={donutPH} title="Place Holder 1"
                description="This is an example of an achievement"/>
            <Achievement badge={badgeTmp} donut={donutPH} title="Place Holder 2"
            description="This is an example of an achievement"/>
        </div>
    );
  }
  
  export default Achievements